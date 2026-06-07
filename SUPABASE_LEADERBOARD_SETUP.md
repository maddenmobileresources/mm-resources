# Shared Pack Leaderboard Setup

The Pack Opener can save scores in two modes:

- Local mode: works immediately, but only in one browser.
- Shared mode: uses Supabase so scores are shared across users and devices.

## 1. Create a Supabase project

1. Go to https://supabase.com and create a free project.
2. Open the project dashboard.
3. Go to SQL Editor.
4. Paste and run the SQL from `supabase/pack_scores.sql`.

## 2. Add your project keys

1. In Supabase, go to Project Settings, then API.
2. Copy your Project URL.
3. Copy your anon public key.
4. In this project folder, create a file named `.env`.
5. Add this:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 3. Restart the dev server

Stop the local dev server and start it again:

```bash
npm run dev
```

Then open `/packs/open`. The scoring panel should say:

```text
Leaderboard: Shared database
```

## Notes

This is a friendly community leaderboard. Because the current app opens packs in the browser, advanced users could still fake a score. The stronger production version is to generate packs and calculate scores on a server before saving them.
