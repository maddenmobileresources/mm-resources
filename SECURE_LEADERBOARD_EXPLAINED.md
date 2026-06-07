# Secure Leaderboard Explained

The current Pack Opener has two jobs happening in the browser:

1. It opens the pack.
2. It submits the score.

That is fine for a friendly leaderboard, but a browser is controlled by the person using it. A technical user can open developer tools, change JavaScript values, and send a fake score request.

A secure leaderboard changes the ownership of those jobs:

1. The browser asks the server to open a pack.
2. The server chooses the cards.
3. The server calculates the score.
4. The server saves the score.
5. The browser only displays what the server already decided.

## What Users Can And Cannot Fake

With the secure version, users cannot fake:

- Score total
- Pulled cards
- Best card
- Pack odds
- Rarity weights
- Month key

The server owns all of that.

Users could still try to:

- Open packs many times.
- Use scripts to spam attempts.
- Enter rude display names.

Those are handled with rate limiting, optional accounts, moderation, and display-name filters.

## Production Architecture

Use Supabase like this:

- `pack_scores`: public read, no public insert.
- `pack_cards`: public or server-only card pool used by the pack function.
- Supabase Edge Function: `open-pack`.

The browser calls:

```text
open-pack(packId, displayName)
```

The function:

1. Validates `packId`.
2. Cleans `displayName`.
3. Loads eligible cards from `pack_cards`.
4. Draws the pack on the server.
5. Calculates score on the server.
6. Inserts the score into `pack_scores` using the server service role.
7. Returns the opened cards and updated top 10.

## Important Truth

No public web game can stop every possible kind of abuse. But server-authoritative scoring stops the important thing: users cannot invent or edit the score that gets stored.

For an even stronger setup, add:

- Login before submitting scores.
- One leaderboard entry per account per pack attempt, or one best entry per month.
- Rate limits per user/IP.
- CAPTCHA on score submission.
- A profanity filter for display names.
