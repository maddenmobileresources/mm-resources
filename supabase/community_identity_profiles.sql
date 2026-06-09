create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  reddit_username text,
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists discord_user_id text,
  add column if not exists discord_username text,
  add column if not exists discord_display_name text,
  add column if not exists reddit_verified boolean not null default false,
  add column if not exists trusted boolean not null default false,
  add column if not exists trusted_note text,
  add column if not exists created_at timestamptz not null default now();

alter table public.profiles
  alter column reddit_username drop not null;

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
  with check (
    auth.uid() = id
    and reddit_username is null
    and reddit_verified = false
    and trusted = false
    and trusted_note is null
  );

drop policy if exists "Users can update their own community profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own community profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

revoke insert, update on public.profiles from authenticated;
grant insert (id, discord_user_id, discord_username, discord_display_name, updated_at)
  on public.profiles to authenticated;
grant update (discord_user_id, discord_username, discord_display_name, updated_at)
  on public.profiles to authenticated;

create table if not exists public.profile_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  target_type text not null check (target_type in ('player', 'play')),
  target_id text not null,
  parent_id uuid references public.profile_comments(id) on delete cascade,
  reddit_username text,
  body text not null check (char_length(body) between 1 and 2000),
  likes integer not null default 0,
  dislikes integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profile_comments
  add column if not exists user_id uuid references auth.users(id) on delete cascade default auth.uid();

alter table public.profile_comments
  alter column reddit_username drop not null;

create index if not exists profile_comments_target_idx
  on public.profile_comments (target_type, target_id, created_at desc);

alter table public.profile_comments enable row level security;

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

create table if not exists public.profile_comment_votes (
  comment_id uuid not null references public.profile_comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  vote_type text not null check (vote_type in ('like', 'dislike')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);

create index if not exists profile_comment_votes_user_idx
  on public.profile_comment_votes (user_id, updated_at desc);

alter table public.profile_comment_votes enable row level security;

drop policy if exists "Users can read their own comment votes" on public.profile_comment_votes;
create policy "Users can read their own comment votes"
  on public.profile_comment_votes
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can manage their own comment votes" on public.profile_comment_votes;
create policy "Users can manage their own comment votes"
  on public.profile_comment_votes
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.set_comment_community_identity()
returns trigger
language plpgsql
security definer
set search_path = public
as $comment_identity$
declare
  verified_reddit text;
  comments_last_minute integer;
  comments_last_hour integer;
begin
  new.user_id := auth.uid();

  if new.user_id is null then
    raise exception 'Login required.';
  end if;

  select count(*)
  into comments_last_minute
  from public.profile_comments
  where user_id = new.user_id
    and created_at > now() - interval '1 minute';

  if comments_last_minute >= 3 then
    raise exception 'Please slow down before posting another comment.';
  end if;

  select count(*)
  into comments_last_hour
  from public.profile_comments
  where user_id = new.user_id
    and created_at > now() - interval '1 hour';

  if comments_last_hour >= 25 then
    raise exception 'Hourly comment limit reached. Please try again later.';
  end if;

  select reddit_username
  into verified_reddit
  from public.profiles
  where id = auth.uid()
    and reddit_verified = true;

  new.reddit_username := left(verified_reddit, 24);
  return new;
end;
$comment_identity$;

drop trigger if exists set_verified_comment_identity_trigger on public.profile_comments;
drop trigger if exists set_comment_community_identity_trigger on public.profile_comments;
create trigger set_comment_community_identity_trigger
  before insert on public.profile_comments
  for each row
  execute function public.set_comment_community_identity();

create or replace function public.vote_on_profile_comment(comment_id uuid, vote_type text)
returns void
language plpgsql
security definer
set search_path = public
as $vote_comment$
declare
  current_user_id uuid := auth.uid();
  requested_comment_id uuid := comment_id;
  requested_vote text := vote_type;
  existing_vote text;
begin
  if current_user_id is null or auth.role() <> 'authenticated' then
    raise exception 'Login required.';
  end if;

  if requested_vote not in ('like', 'dislike') then
    raise exception 'Unknown vote type.';
  end if;

  if not exists (
    select 1
    from public.profile_comments
    where profile_comments.id = requested_comment_id
  ) then
    raise exception 'Comment not found.';
  end if;

  select profile_comment_votes.vote_type
  into existing_vote
  from public.profile_comment_votes
  where profile_comment_votes.comment_id = requested_comment_id
    and profile_comment_votes.user_id = current_user_id;

  if existing_vote = requested_vote then
    delete from public.profile_comment_votes
    where profile_comment_votes.comment_id = requested_comment_id
      and profile_comment_votes.user_id = current_user_id;
  else
    insert into public.profile_comment_votes (comment_id, user_id, vote_type)
    values (requested_comment_id, current_user_id, requested_vote)
    on conflict (comment_id, user_id)
    do update set
      vote_type = excluded.vote_type,
      updated_at = now();
  end if;

  update public.profile_comments
  set
    likes = (
      select count(*)::integer
      from public.profile_comment_votes
      where profile_comment_votes.comment_id = requested_comment_id
        and profile_comment_votes.vote_type = 'like'
    ),
    dislikes = (
      select count(*)::integer
      from public.profile_comment_votes
      where profile_comment_votes.comment_id = requested_comment_id
        and profile_comment_votes.vote_type = 'dislike'
    )
  where profile_comments.id = requested_comment_id;
end;
$vote_comment$;

alter table public.pack_scores
  add column if not exists user_id uuid references auth.users(id) on delete set null default auth.uid(),
  add column if not exists reddit_username text,
  add column if not exists pack_id text,
  add column if not exists best_card_id integer,
  add column if not exists opened_cards jsonb not null default '[]'::jsonb;

drop policy if exists "Anyone can submit pack leaderboard scores" on public.pack_scores;
drop policy if exists "Logged in users can submit pack leaderboard scores" on public.pack_scores;

create or replace function public.set_pack_score_community_identity()
returns trigger
language plpgsql
security definer
set search_path = public
as $pack_score_identity$
declare
  verified_reddit text;
  fallback_display_name text;
begin
  new.user_id := coalesce(new.user_id, auth.uid());

  select reddit_username
  into verified_reddit
  from public.profiles
  where id = new.user_id
    and reddit_verified = true;

  if new.display_name is null or length(trim(new.display_name)) = 0 then
    select coalesce(discord_username, discord_display_name, 'Community User')
    into fallback_display_name
    from public.profiles
    where id = new.user_id;

    new.display_name := fallback_display_name;
  end if;

  new.display_name := left(coalesce(nullif(trim(new.display_name), ''), 'Community User'), 24);
  new.reddit_username := left(verified_reddit, 24);
  return new;
end;
$pack_score_identity$;

drop trigger if exists set_verified_pack_score_identity_trigger on public.pack_scores;
drop trigger if exists set_pack_score_community_identity_trigger on public.pack_scores;
create trigger set_pack_score_community_identity_trigger
  before insert on public.pack_scores
  for each row
  execute function public.set_pack_score_community_identity();
