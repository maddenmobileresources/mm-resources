import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const rarityPoints: Record<string, number> = {
  Starter: 5,
  Uncommon: 10,
  Rare: 50,
  Epic: 250,
  Iconic: 1250,
  Mythic: 3000,
  Marvel: 8200,
};

const rarityOrder = ["Starter", "Uncommon", "Rare", "Epic", "Iconic", "Mythic", "Marvel"];

const packOdds: Record<string, Record<string, number>> = {
  pro: { Starter: 10, Uncommon: 60, Rare: 15, Epic: 8, Iconic: 4, Mythic: 2, Marvel: 1 },
  "all-pro": { Starter: 10, Uncommon: 40, Rare: 20, Epic: 16, Iconic: 8, Mythic: 4, Marvel: 2 },
  madden: { Starter: 10, Uncommon: 20, Rare: 25, Epic: 24, Iconic: 12, Mythic: 6, Marvel: 3 },
};

function createPackSlots(packId: string) {
  return Array.from({ length: 4 }, () => ({
    allowed: rarityOrder,
    weights: packOdds[packId],
  }));
}

const packs = [
  {
    id: "pro",
    name: "Pro Pack",
    multiplier: 2,
    slots: createPackSlots("pro"),
  },
  {
    id: "all-pro",
    name: "All-Pro Pack",
    multiplier: 1.5,
    slots: createPackSlots("all-pro"),
  },
  {
    id: "madden",
    name: "Madden Pack",
    multiplier: 1,
    slots: createPackSlots("madden"),
  },
];

type Card = {
  id: number;
  name: string;
  position: string | null;
  team: string | null;
  program: string | null;
  rarity: string;
  ovr: number;
  image: string | null;
  boost: string | null;
};

function getMonthKey(date = new Date()) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function chooseWeightedRarity(weights: Record<string, number>) {
  const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * total;

  for (const [rarity, weight] of Object.entries(weights)) {
    roll -= weight;
    if (roll <= 0) return rarity;
  }

  return Object.keys(weights)[0];
}

function scoreCard(card: Card) {
  const rarityBonus = rarityPoints[card.rarity] ?? 0;
  const ovrScore = Number(card.ovr || 0) * 10;
  const programBonus = card.program && card.program !== "Core" ? 50 : 0;
  const boostedBonus = countBoosts(card.boost) * 100;

  return ovrScore + rarityBonus + programBonus + boostedBonus;
}

function countBoosts(boost: string | null) {
  if (!boost) return 0;
  return boost
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean).length;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { packId, displayName } = await request.json();
    const authHeader = request.headers.get("Authorization") ?? "";
    const pack = packs.find((item) => item.id === packId);

    if (!pack) {
      return new Response(JSON.stringify({ error: "Unknown pack." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!cleanName) {
      return new Response(JSON.stringify({ error: "Display name is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);

    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Sign in with Reddit before submitting scores." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userMetadata = userData.user.user_metadata ?? {};
    const identityData = userData.user.identities?.[0]?.identity_data ?? {};
    const cleanName = String(
      displayName ||
      userMetadata.preferred_username ||
      userMetadata.user_name ||
      userMetadata.username ||
      identityData.preferred_username ||
      identityData.user_name ||
      identityData.username ||
      "Reddit User"
    ).trim().slice(0, 24);

    const openedCards: Card[] = [];

    for (const slot of pack.slots) {
      const rarity = chooseWeightedRarity(slot.weights);
      let query = supabase.from("pack_cards").select("*").eq("rarity", rarity);

      if ("program" in slot && slot.program) {
        query = query.eq("program", slot.program);
      }

      const { data, error } = await query;
      if (error) throw error;
      if (!data?.length) continue;

      openedCards.push(data[Math.floor(Math.random() * data.length)] as Card);
    }

    if (!openedCards.length) {
      return new Response(JSON.stringify({ error: "No cards are available for this pack yet." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const subtotal = openedCards.reduce((sum, card) => sum + scoreCard(card), 0);
    const score = subtotal * pack.multiplier;
    const bestCard = openedCards.reduce((best, card) => scoreCard(card) > scoreCard(best) ? card : best, openedCards[0]);
    const monthKey = getMonthKey();

    const { error: insertError } = await supabase.from("pack_scores").insert({
      display_name: cleanName,
      reddit_username: cleanName,
      user_id: userData.user.id,
      score,
      pack_id: pack.id,
      pack_name: pack.name,
      best_card_id: bestCard.id,
      best_card_name: bestCard.name,
      best_card_rarity: bestCard.rarity,
      best_card_ovr: bestCard.ovr,
      opened_cards: openedCards.map((card) => ({
        id: card.id,
        name: card.name,
        position: card.position,
        team: card.team,
        program: card.program,
        rarity: card.rarity,
        ovr: card.ovr,
        image: card.image,
        points: scoreCard(card),
      })),
      month_key: monthKey,
    });

    if (insertError) throw insertError;

    const { data: leaderboard, error: leaderboardError } = await supabase
      .from("pack_scores")
      .select("id, display_name, score, pack_name, best_card_name, best_card_rarity, best_card_ovr, created_at")
      .eq("month_key", monthKey)
      .order("score", { ascending: false })
      .limit(10);

    if (leaderboardError) throw leaderboardError;

    return new Response(JSON.stringify({
      cards: openedCards.map((card) => ({ ...card, points: scoreCard(card) })),
      leaderboard,
      month: monthKey,
      multiplier: pack.multiplier,
      score,
      subtotal,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message ?? "Unable to open pack." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
