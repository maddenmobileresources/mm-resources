import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

const LOCAL_LEADERBOARD_KEY = "mmr-pack-opener-leaderboard";

export function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function getLeaderboardMode() {
  return isSupabaseConfigured ? "shared" : "local";
}

function normalizeEntry(entry) {
  return {
    id: entry.id,
    name: entry.display_name ?? entry.name,
    score: entry.score,
    packName: entry.pack_name ?? entry.packName,
    redditUsername: entry.reddit_username ?? entry.name,
    bestCard: {
      name: entry.best_card_name ?? entry.bestCard?.name,
      rarity: entry.best_card_rarity ?? entry.bestCard?.rarity,
      ovr: entry.best_card_ovr ?? entry.bestCard?.ovr,
    },
    date: entry.created_at ?? entry.date,
  };
}

function getLocalLeaderboard(month = getMonthKey()) {
  const fallback = { month, entries: [] };

  try {
    const saved = JSON.parse(localStorage.getItem(LOCAL_LEADERBOARD_KEY));
    if (!saved || saved.month !== month) return fallback;
    return { month: saved.month, entries: Array.isArray(saved.entries) ? saved.entries : [] };
  } catch {
    return fallback;
  }
}

function saveLocalLeaderboard(entries, month = getMonthKey()) {
  const next = { month, entries: entries.slice(0, 10) };
  localStorage.setItem(LOCAL_LEADERBOARD_KEY, JSON.stringify(next));
  return next.entries;
}

export async function fetchPackLeaderboard(month = getMonthKey()) {
  if (!isSupabaseConfigured) {
    return getLocalLeaderboard(month);
  }

  const { data, error } = await supabase
    .from("pack_scores")
    .select("id, display_name, reddit_username, score, pack_name, best_card_name, best_card_rarity, best_card_ovr, created_at")
    .eq("month_key", month)
    .order("score", { ascending: false })
    .limit(10);

  if (error) throw error;

  return {
    month,
    entries: (data ?? []).map(normalizeEntry),
  };
}

export async function submitPackScore(entry, month = getMonthKey()) {
  if (!isSupabaseConfigured) {
    const localEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    const current = getLocalLeaderboard(month);
    const entries = saveLocalLeaderboard(
      [...current.entries, localEntry].sort((a, b) => b.score - a.score),
      month
    );
    return { month, entries };
  }

  const { error } = await supabase.from("pack_scores").insert({
    display_name: entry.name,
    reddit_username: entry.name,
    score: entry.score,
    pack_name: entry.packName,
    best_card_name: entry.bestCard?.name,
    best_card_rarity: entry.bestCard?.rarity,
    best_card_ovr: entry.bestCard?.ovr,
    month_key: month,
  });

  if (error) throw error;

  return fetchPackLeaderboard(month);
}

export function clearLocalPackLeaderboard(month = getMonthKey()) {
  saveLocalLeaderboard([], month);
  return { month, entries: [] };
}
