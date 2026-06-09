create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  reddit_username text not null,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable"
  on public.profiles
  for select
  using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create table if not exists public.profile_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  target_type text not null check (target_type in ('player', 'play')),
  target_id text not null,
  parent_id uuid references public.profile_comments(id) on delete cascade,
  reddit_username text not null,
  body text not null check (char_length(body) between 1 and 2000),
  likes integer not null default 0,
  dislikes integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists profile_comments_target_idx
  on public.profile_comments (target_type, target_id, created_at desc);

alter table public.profile_comments enable row level security;

create or replace function public.current_reddit_username()
returns text
language sql
stable
as $$
  select coalesce(
    auth.jwt() -> 'user_metadata' ->> 'preferred_username',
    auth.jwt() -> 'user_metadata' ->> 'user_name',
    auth.jwt() -> 'user_metadata' ->> 'username',
    auth.jwt() -> 'user_metadata' ->> 'name',
    auth.jwt() -> 'app_metadata' ->> 'provider_id',
    split_part(coalesce(auth.jwt() ->> 'email', 'Reddit User'), '@', 1)
  );
$$;

create or replace function public.set_verified_comment_identity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.user_id := auth.uid();
  new.reddit_username := left(public.current_reddit_username(), 24);
  return new;
end;
$$;

drop trigger if exists set_verified_comment_identity_trigger on public.profile_comments;
create trigger set_verified_comment_identity_trigger
  before insert on public.profile_comments
  for each row
  execute function public.set_verified_comment_identity();

drop policy if exists "Anyone can read profile comments" on public.profile_comments;
create policy "Anyone can read profile comments"
  on public.profile_comments
  for select
  using (true);

drop policy if exists "Logged in users can post profile comments" on public.profile_comments;
create policy "Logged in users can post profile comments"
  on public.profile_comments
  for insert
  with check (
    auth.uid() = user_id
    and char_length(body) between 1 and 2000
  );

drop policy if exists "Logged in users can vote on comments" on public.profile_comments;

create or replace function public.vote_on_profile_comment(comment_id uuid, vote_type text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() <> 'authenticated' then
    raise exception 'Login required.';
  end if;

  if vote_type = 'like' then
    update public.profile_comments
    set likes = likes + 1
    where id = comment_id;
  elsif vote_type = 'dislike' then
    update public.profile_comments
    set dislikes = dislikes + 1
    where id = comment_id;
  else
    raise exception 'Unknown vote type.';
  end if;
end;
$$;

alter table public.pack_scores
  add column if not exists user_id uuid references auth.users(id) on delete set null default auth.uid(),
  add column if not exists reddit_username text;

update public.pack_scores
set reddit_username = coalesce(reddit_username, display_name)
where reddit_username is null;

drop policy if exists "Anyone can submit pack leaderboard scores" on public.pack_scores;
drop policy if exists "Logged in users can submit pack leaderboard scores" on public.pack_scores;

-- Do not create a browser insert policy for pack scores.
-- Scores should be generated and inserted by the Supabase open-pack Edge Function.

create or replace function public.set_verified_pack_score_identity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.user_id := auth.uid();
  new.reddit_username := left(public.current_reddit_username(), 24);
  new.display_name := new.reddit_username;
  return new;
end;
$$;

drop trigger if exists set_verified_pack_score_identity_trigger on public.pack_scores;
create trigger set_verified_pack_score_identity_trigger
  before insert on public.pack_scores
  for each row
  execute function public.set_verified_pack_score_identity();
