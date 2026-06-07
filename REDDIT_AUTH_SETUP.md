# Reddit Login Setup

This project is designed so Reddit login controls:

- Player profile comments
- Play profile comments
- Pack Opener score submissions

Browsing the site stays public.

## 1. Create a Reddit OAuth app

1. Go to https://www.reddit.com/prefs/apps.
2. Create an app.
3. Choose the web app type.
4. Copy the client ID and client secret.
5. Add the callback URL from your Supabase OAuth provider settings.

## 2. Configure Supabase Auth

Reddit is treated as a custom OAuth provider in Supabase.

In Supabase, add a custom provider with:

```text
Provider name: reddit
Scopes: identity
```

Use Reddit's OAuth URLs:

```text
Authorization URL: https://www.reddit.com/api/v1/authorize
Token URL: https://www.reddit.com/api/v1/access_token
User Info URL: https://oauth.reddit.com/api/v1/me
```

Then add the Reddit client ID and secret.

## 3. Run the SQL

Run this SQL after your original leaderboard table SQL:

```text
supabase/verified_reddit_system.sql
```

This adds:

- `profiles`
- `profile_comments`
- authenticated-only leaderboard insert policy

## 4. Add environment variables

Create `.env` from `.env.example` and add:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Restart the dev server after changing `.env`.

## 5. What This Enforces

Users must be logged in with Reddit to:

- post player comments
- post play comments
- submit Pack Opener scores

The UI hides those actions when signed out, and Supabase policies reject direct database inserts from signed-out users.

For the strongest leaderboard, deploy the `supabase/functions/open-pack` Edge Function and have the app use it so the server opens packs and calculates scores.
