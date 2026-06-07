create table if not exists public.pack_scores (
  id uuid primary key default gen_random_uuid(),
  display_name text not null check (char_length(display_name) between 1 and 24),
  score integer not null check (score >= 0),
  pack_name text not null,
  best_card_name text,
  best_card_rarity text,
  best_card_ovr integer,
  month_key text not null,
  created_at timestamptz not null default now()
);

create index if not exists pack_scores_month_score_idx
  on public.pack_scores (month_key, score desc, created_at asc);

alter table public.pack_scores enable row level security;

drop policy if exists "Anyone can read pack leaderboard scores" on public.pack_scores;
create policy "Anyone can read pack leaderboard scores"
  on public.pack_scores
  for select
  using (true);

drop policy if exists "Anyone can submit pack leaderboard scores" on public.pack_scores;
create policy "Anyone can submit pack leaderboard scores"
  on public.pack_scores
  for insert
  with check (
    char_length(display_name) between 1 and 24
    and score >= 0
    and char_length(month_key) = 7
  );
