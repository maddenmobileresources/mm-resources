import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

function pickIdentity(user, provider) {
  return (user?.identities ?? []).find((identity) => identity.provider === provider) ?? null;
}

export function getDiscordIdentity(user) {
  const metadata = user?.user_metadata ?? {};
  const identityData = pickIdentity(user, "discord")?.identity_data ?? {};
  const discordUserId = identityData.sub || identityData.provider_id || metadata.provider_id || user?.id || "";
  const username =
    identityData.full_name ||
    identityData.name ||
    identityData.preferred_username ||
    identityData.user_name ||
    identityData.username ||
    metadata.full_name ||
    metadata.name ||
    metadata.preferred_username ||
    metadata.user_name ||
    metadata.username ||
    user?.email?.split("@")[0] ||
    "Community User";

  return {
    discordUserId: String(discordUserId),
    discordUsername: String(username),
    discordDisplayName: String(username),
  };
}

function normalizeProfile(row) {
  if (!row) return null;

  return {
    userId: row.id,
    discordUserId: row.discord_user_id,
    discordUsername: row.discord_username,
    discordDisplayName: row.discord_display_name,
    redditUsername: row.reddit_username,
    redditVerified: Boolean(row.reddit_verified),
    trusted: Boolean(row.trusted),
  };
}

export async function upsertOwnCommunityProfile(user) {
  if (!isSupabaseConfigured || !user?.id) return null;

  const discord = getDiscordIdentity(user);

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      discord_user_id: discord.discordUserId,
      discord_username: discord.discordUsername,
      discord_display_name: discord.discordDisplayName,
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" })
    .select("id, discord_user_id, discord_username, discord_display_name, reddit_username, reddit_verified, trusted")
    .single();

  if (error) {
    console.warn("Unable to sync community profile", error);
    return normalizeProfile({ id: user.id, ...discord });
  }

  return normalizeProfile(data);
}

export async function fetchProfilesByUserIds(userIds) {
  if (!isSupabaseConfigured) return new Map();

  const uniqueIds = [...new Set((userIds ?? []).filter(Boolean))];
  if (uniqueIds.length === 0) return new Map();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, discord_user_id, discord_username, discord_display_name, reddit_username, reddit_verified, trusted")
    .in("id", uniqueIds);

  if (error) {
    console.warn("Unable to load community profiles", error);
    return new Map();
  }

  return new Map((data ?? []).map((row) => [row.id, normalizeProfile(row)]));
}
