import React, { useEffect, useMemo, useState } from "react";
import { Trophy, Shuffle, Send, RotateCcw, Info } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import RedditVerificationModal from "./RedditVerificationModal";
import players from "../data/MM26PlayerDatabase";
import {
  clearLocalPackLeaderboard,
  fetchPackLeaderboard,
  getLeaderboardMode,
  getMonthKey,
  openSecurePack,
  submitPackScore,
} from "../services/packLeaderboard";

const rarityOrder = ["Starter", "Uncommon", "Rare", "Epic", "Iconic", "Mythic", "Marvel"];

const rarityPoints = {
  Starter: 5,
  Uncommon: 10,
  Rare: 50,
  Epic: 250,
  Iconic: 1250,
  Mythic: 3000,
  Marvel: 8200,
};

const rarityTextColors = {
  Starter: "#00bfa0",
  Uncommon: "#00c600ff",
  Rare: "#006cd1ff",
  Epic: "#6f00d6ff",
  Iconic: "#bab700ff",
  Mythic: "#797979ff",
  Marvel: "#eb0000ff",
};

const rarityStyles = {
  Starter: "border-teal-300 bg-teal-50 text-teal-800",
  Uncommon: "border-green-300 bg-green-50 text-green-800",
  Rare: "border-blue-300 bg-blue-50 text-blue-800",
  Epic: "border-purple-300 bg-purple-50 text-purple-800",
  Iconic: "border-yellow-300 bg-yellow-50 text-yellow-900",
  Mythic: "border-zinc-300 bg-zinc-100 text-zinc-800",
  Marvel: "border-red-300 bg-red-50 text-red-800",
};

const darkRarityStyles = {
  Starter: "border-teal-500 bg-teal-950 text-teal-100",
  Uncommon: "border-green-500 bg-green-950 text-green-100",
  Rare: "border-blue-500 bg-blue-950 text-blue-100",
  Epic: "border-purple-500 bg-purple-950 text-purple-100",
  Iconic: "border-yellow-500 bg-yellow-950 text-yellow-100",
  Mythic: "border-zinc-500 bg-zinc-800 text-zinc-100",
  Marvel: "border-red-500 bg-red-950 text-red-100",
};

const packOdds = {
  pro: { Starter: 10, Uncommon: 60, Rare: 15, Epic: 8, Iconic: 4, Mythic: 2, Marvel: 1 },
  "all-pro": { Starter: 10, Uncommon: 40, Rare: 20, Epic: 16, Iconic: 8, Mythic: 4, Marvel: 2 },
  madden: { Starter: 10, Uncommon: 20, Rare: 25, Epic: 24, Iconic: 12, Mythic: 6, Marvel: 3 },
};

function createPackSlots(packId) {
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
    description: "4 cards with the chance of pulling up to a Marvel Rarity Player.",
    image: "https://i.imgur.com/bvCvk5W.png",
    slots: createPackSlots("pro"),
  },
  {
    id: "all-pro",
    name: "All-Pro Pack",
    multiplier: 1.5,
    description: "4 cards with increased odds of pulling Rare+ Rarity Players.",
    image: "https://i.imgur.com/eIRkhPV.png",
    slots: createPackSlots("all-pro"),
  },
  {
    id: "madden",
    name: "Madden Pack",
    multiplier: 1,
    description: "4 cards with the highest odds of pulling Rare+ Rarity Players.",
    image: "https://i.imgur.com/p8rcT3Y.png",
    slots: createPackSlots("madden"),
  },
];

function chooseWeightedRarity(weights) {
  const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * total;

  for (const [rarity, weight] of Object.entries(weights)) {
    roll -= weight;
    if (roll <= 0) return rarity;
  }

  return Object.keys(weights)[0];
}

function scoreCard(player) {
  const rarityBonus = rarityPoints[player.rarity] ?? 0;
  const ovrScore = Number(player.ovr || 0) * 10;
  const programBonus = getProgramBonus(player);
  const boostedBonus = getBoostBonus(player);

  return ovrScore + rarityBonus + programBonus + boostedBonus;
}

function getCardScore(player) {
  return Number(player.points ?? player.score ?? scoreCard(player));
}

function getRarityBonus(player) {
  return Number(player.rarityBonus ?? rarityPoints[player.rarity] ?? 0);
}

function getProgramBonus(player) {
  if (player.programBonus !== undefined) return Number(player.programBonus);
  return player.program && player.program !== "Core" ? 50 : 0;
}

function getBoostBonus(player) {
  if (player.boostBonus !== undefined) return Number(player.boostBonus);
  return countBoosts(player.boost) * 100;
}

function countBoosts(boost) {
  if (!boost) return 0;
  if (Array.isArray(boost)) return boost.filter(Boolean).length;
  return String(boost)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean).length;
}

function drawFromSlot(slot, availablePlayers) {
  const targetRarity = chooseWeightedRarity(slot.weights);
  const candidates = availablePlayers.filter((player) => {
    const programMatches = !slot.program || player.program === slot.program;
    return programMatches && player.rarity === targetRarity;
  });

  const fallback = availablePlayers.filter((player) => {
    const programMatches = !slot.program || player.program === slot.program;
    return programMatches && slot.allowed.includes(player.rarity);
  });

  const pool = candidates.length ? candidates : fallback;
  return pool[Math.floor(Math.random() * pool.length)];
}

function formatMonth(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
}

function LoginInfoNote({ isDark }) {
  return (
    <span className="group relative inline-flex">
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${
          isDark ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"
        }`}
        aria-label="Why login is required"
        tabIndex={0}
      >
        <Info size={14} />
      </span>
      <span
        className={`pointer-events-none absolute right-0 top-8 z-50 hidden w-72 rounded border p-3 text-left text-xs leading-relaxed shadow-lg group-hover:block group-focus-within:block ${
          isDark
            ? "border-slate-700 bg-zinc-900 text-gray-200"
            : "border-gray-200 bg-white text-gray-700"
        }`}
      >
        Login is required so leaderboard scores are tied to a verified community account instead of an anonymous browser session. Your password is entered only on the provider's login page, never on this website. We only receive basic profile info, such as your username and account ID, to record your score.
      </span>
    </span>
  );
}

function getLeaderboardDisplayName(profile, fallbackDiscordName, fallbackRedditName) {
  if (profile?.redditVerified && profile?.redditUsername) {
    return `u/${profile.redditUsername}`;
  }

  return (
    profile?.discordUsername ||
    profile?.discordDisplayName ||
    fallbackDiscordName ||
    (fallbackRedditName ? `u/${fallbackRedditName}` : "Community User")
  );
}

export default function PackOpener() {
  const { theme } = useTheme();
  const { isAuthConfigured, isSignedIn, profile, discordUsername, redditUsername, signInWithDiscord } = useAuth();
  const isDark = theme === "dark";
  const [selectedPackId, setSelectedPackId] = useState("pro");
  const [openedCards, setOpenedCards] = useState([]);
  const [serverPackResult, setServerPackResult] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaderboard, setLeaderboard] = useState({ month: getMonthKey(), entries: [] });
  const [leaderboardError, setLeaderboardError] = useState("");
  const [showRedditInfo, setShowRedditInfo] = useState(false);
  const leaderboardMode = getLeaderboardMode();

  const availablePlayers = useMemo(
    () => players.filter((player) => player.name && player.rarity && player.ovr && player.image),
    []
  );
  const selectedPack = packs.find((pack) => pack.id === selectedPackId) ?? packs[0];
  const currentSubtotal = serverPackResult?.subtotal ?? openedCards.reduce((sum, player) => sum + getCardScore(player), 0);
  const currentScore = serverPackResult?.score ?? currentSubtotal * selectedPack.multiplier;

  const rarityCounts = useMemo(() => {
    return rarityOrder.reduce((counts, rarity) => {
      counts[rarity] = availablePlayers.filter((player) => player.rarity === rarity).length;
      return counts;
    }, {});
  }, [availablePlayers]);

  const loadLeaderboard = async () => {
    setIsLeaderboardLoading(true);
    setLeaderboardError("");

    try {
      setLeaderboard(await fetchPackLeaderboard());
    } catch (error) {
      setLeaderboardError(error.message || "Unable to load leaderboard.");
    } finally {
      setIsLeaderboardLoading(false);
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const openPack = async () => {
    setLeaderboardError("");

    if (isSupabaseConfigured) {
      if (!isAuthConfigured) {
        setLeaderboardError("Configure Supabase and Discord login before verified packs can be opened.");
        return;
      }

      if (!isSignedIn) {
        await signInWithDiscord();
        return;
      }

      setIsOpening(true);

      try {
        const result = await openSecurePack(selectedPack.id);
        setOpenedCards(result.cards);
        setServerPackResult(result);
        setLeaderboard(result.leaderboard);
        setHasSubmitted(true);
      } catch (error) {
        setLeaderboardError(error.message || "Unable to open pack.");
      } finally {
        setIsOpening(false);
      }

      return;
    }

    const pulledCards = selectedPack.slots
      .map((slot) => drawFromSlot(slot, availablePlayers))
      .filter(Boolean)
      .map((player) => ({ ...player, packCardId: `${player.id}-${crypto.randomUUID()}` }));

    setOpenedCards(pulledCards);
    setServerPackResult(null);
    setHasSubmitted(false);
  };

  const submitScore = async () => {
    if (!isSignedIn || !openedCards.length || isSupabaseConfigured) return;

    setIsSubmitting(true);
    setLeaderboardError("");

    const entry = {
      name: discordUsername.slice(0, 24),
      redditUsername: redditUsername ? redditUsername.slice(0, 24) : null,
      score: Math.round(currentScore),
      packName: selectedPack.name,
      bestCard: openedCards.reduce((best, player) => (getCardScore(player) > getCardScore(best) ? player : best), openedCards[0]),
    };

    try {
      setLeaderboard(await submitPackScore(entry));
      setHasSubmitted(true);
    } catch (error) {
      setLeaderboardError(error.message || "Unable to submit score.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetLocalLeaderboard = () => {
    setLeaderboard(clearLocalPackLeaderboard());
  };

  const handleSubmitScoreClick = async () => {
    if (!openedCards.length || hasSubmitted || isSubmitting) return;

    if (isSupabaseConfigured) {
      setHasSubmitted(true);
      return;
    }

    if (!isAuthConfigured) {
      setLeaderboardError("Configure Supabase and Discord login before verified scores can be submitted.");
      return;
    }

    if (!isSignedIn) {
      await signInWithDiscord();
      return;
    }

    await submitScore();
  };

  return (
    <div className={`min-h-screen px-3 py-5 sm:px-4 sm:py-6 ${isDark ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="w-full max-w-[1900px]">
        <div className="mb-6">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Pack Opener</h1>
            <p className={`mt-2 max-w-3xl ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Open simulated packs and qualify for this month's Top 10 Leaderboard.
            </p>
          </div>
        </div>

        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_560px]">
          <section className={`rounded-lg border p-3 shadow-sm sm:p-4 ${isDark ? "border-slate-700 bg-zinc-800" : "border-gray-200 bg-white"}`}>
            <div className="grid gap-3 sm:grid-cols-3">
              {packs.map((pack) => {
                const selected = pack.id === selectedPackId;
                return (
                  <button
                    type="button"
                    key={pack.id}
                    onClick={() => {
                      setSelectedPackId(pack.id);
                      setOpenedCards([]);
                      setServerPackResult(null);
                      setHasSubmitted(false);
                    }}
                    className={`rounded-lg border p-3 text-left transition ${
                      selected
                        ? "border-blue-500 ring-2 ring-blue-500"
                        : isDark
                          ? "border-slate-700 hover:border-blue-400"
                          : "border-gray-200 hover:border-blue-400"
                    } ${isDark ? "bg-zinc-900" : "bg-gray-50"}`}
                  >
                    <div className="flex gap-3 sm:flex-col lg:flex-row">
                      <img src={pack.image} alt={pack.name} className="h-24 w-16 shrink-0 rounded bg-black object-contain" />
                      <div className="min-w-0">
                        <p className="font-bold">{pack.name}</p>
                        <p className={`mt-1 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{pack.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-blue-500">Selected Pack</p>
                <h2 className="text-2xl font-bold">{selectedPack.name}</h2>
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Score multiplier: x{selectedPack.multiplier}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={openPack}
                  disabled={isOpening}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700"
                >
                  <Shuffle size={18} />
                  {isOpening ? "Opening" : "Open Pack"}
                </button>
                <button
                  type="button"
                  onClick={handleSubmitScoreClick}
                  disabled={!openedCards.length || hasSubmitted || isSubmitting || isSupabaseConfigured}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-600 px-5 py-3 font-semibold text-white shadow hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={18} />
                  {isSupabaseConfigured && hasSubmitted ? "Score Saved" : isSubmitting ? "Submitting" : "Submit Your Score"}
                </button>
              </div>
            </div>

            <div className={`mt-6 rounded-lg border p-3 sm:p-4 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold">Your Pull</h3>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-500 sm:text-3xl">{currentScore.toLocaleString()} pts</div>
                  {openedCards.length > 0 && selectedPack.multiplier > 1 && (
                    <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {currentSubtotal.toLocaleString()} x {selectedPack.multiplier}
                    </div>
                  )}
                </div>
              </div>

              {openedCards.length === 0 ? (
                <div className={`flex min-h-72 items-center justify-center rounded border border-dashed text-center ${isDark ? "border-slate-700 text-gray-400" : "border-gray-300 text-gray-500"}`}>
                  Pick a pack and open it to reveal cards.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 xl:grid-cols-4">
                  {openedCards.map((player) => (
                    <article
                      key={player.packCardId}
                      className={`rounded-lg border p-3 text-center shadow-sm sm:p-4 ${isDark ? darkRarityStyles[player.rarity] : rarityStyles[player.rarity]}`}
                    >
                      <img src={player.image} alt={player.name} className="mb-4 h-48 w-full rounded bg-black object-contain sm:h-56 xl:h-64" />
                      <ul className="pack-card-bonus-list space-y-1 text-left">
                        <li className="pack-card-bonus-row">
                          <span className="pack-card-bullet" aria-hidden="true" />
                          <span className="pack-card-text">
                            Rarity bonus = <strong>+{getRarityBonus(player).toLocaleString()}</strong>
                          </span>
                        </li>
                        <li className="pack-card-bonus-row">
                          <span className="pack-card-bullet" aria-hidden="true" />
                          <span className="pack-card-text">
                            Promo/Program bonus = <strong>+{getProgramBonus(player).toLocaleString()}</strong>
                          </span>
                        </li>
                        <li className="pack-card-bonus-row">
                          <span className="pack-card-bullet" aria-hidden="true" />
                          <span className="pack-card-text">
                            Boost bonus = <strong>+{getBoostBonus(player).toLocaleString()}</strong>
                          </span>
                        </li>
                      </ul>
                      <p className="pack-card-score-line mt-3 whitespace-nowrap text-left text-base sm:text-lg">
                        Score = <strong>{getCardScore(player).toLocaleString()} pts</strong>
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <section className={`rounded-lg border p-3 shadow-sm sm:p-4 ${isDark ? "border-slate-700 bg-zinc-800" : "border-gray-200 bg-white"}`}>
              <h2 className="mb-2 text-xl font-bold">Scoring</h2>
              <ul className={`pack-scoring-list list-disc space-y-2 pl-5 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                <li>
                  <span className="pack-scoring-line font-bold">Card score = OVR(10) + Rarity bonus + Promo/Program bonus + Boost bonus</span>
                </li>
                <li>
                  <span className="pack-scoring-line font-bold">Pack total score = (Card 1 + Card 2 + Card 3 + Card 4) x Pack multiplier</span>
                </li>
                <li>
                  Rarity bonus ={" "}
                  {rarityOrder.map((rarity, index) => (
                    <span key={rarity}>
                      <span style={{ color: rarityTextColors[rarity] }}>
                        {rarity}: +{rarityPoints[rarity].toLocaleString()}
                      </span>
                      {index < rarityOrder.length - 1 ? ", " : "."}
                    </span>
                  ))}
                </li>
                <li>
                  <span className="pack-scoring-line">Promo/Program bonus = +50 if non-Core card.</span>
                </li>
                <li>
                  <span className="pack-scoring-line">Boost bonus = +100 per Boost.</span>
                </li>
                <li>
                  <span className="pack-scoring-line">Pack multiplier = Pro: x2, All-Pro: x1.5, Madden: x1.</span>
                </li>
              </ul>
            </section>

            <section className={`rounded-lg border p-3 shadow-sm sm:p-4 ${isDark ? "border-slate-700 bg-zinc-800" : "border-gray-200 bg-white"}`}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-bold sm:text-xl">
                    <Trophy size={20} />
                    Top 10 Leaderboard ({formatMonth(leaderboard.month)})
                  </h2>
                </div>
                {leaderboardMode === "local" && (
                  <button
                    type="button"
                    onClick={resetLocalLeaderboard}
                    className={`inline-flex items-center gap-1 rounded px-2 py-1 text-sm ${isDark ? "bg-zinc-700 hover:bg-zinc-600" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>
                )}
              </div>

              {leaderboardMode === "local" && (
                <p className={`mb-3 rounded border px-3 py-2 text-sm ${isDark ? "border-amber-700 bg-amber-950 text-amber-100" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
                  Add your Supabase keys to switch this leaderboard from local-only to shared across users.
                </p>
              )}

              {leaderboardError && (
                <p className={`mb-3 rounded border px-3 py-2 text-sm ${isDark ? "border-red-700 bg-red-950 text-red-100" : "border-red-200 bg-red-50 text-red-800"}`}>
                  {leaderboardError}
                </p>
              )}

              <div className="mb-4">
                {!isAuthConfigured ? (
                  <p className={`rounded border px-3 py-2 text-sm ${isDark ? "border-amber-700 bg-amber-950 text-amber-100" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
                    Configure Supabase and Discord login before verified scores can be submitted.
                  </p>
                ) : !isSignedIn ? (
                  <div className={`rounded border p-3 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                    <p className={`mb-3 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Sign in with Discord to submit your score. Reddit verification is optional, but required for Reddit MM Points rewards.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                          type="button"
                          onClick={signInWithDiscord}
                          className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                          Sign in with Discord
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowRedditInfo(true)}
                          className="rounded bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                        >
                          Sign in with Reddit
                        </button>
                      </div>
                      <LoginInfoNote isDark={isDark} />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      Submitting as <strong>{getLeaderboardDisplayName(profile, discordUsername, redditUsername)}</strong>
                      {!redditUsername && (
                        <span className="block text-xs">
                          Reddit verification is required to qualify for Reddit MM Points rewards.
                        </span>
                      )}
                      {isSupabaseConfigured && openedCards.length > 0 && (
                        <span className="block text-xs">
                          This score was generated and saved by the server when the pack opened.
                        </span>
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={submitScore}
                      disabled={!openedCards.length || hasSubmitted || isSubmitting || isSupabaseConfigured}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-3 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send size={16} />
                      {isSupabaseConfigured && hasSubmitted ? "Score Saved" : isSubmitting ? "Saving" : "Submit Score"}
                    </button>
                  </div>
                )}
              </div>

              {isLeaderboardLoading ? (
                <p className={`rounded border border-dashed p-4 text-center text-sm ${isDark ? "border-slate-700 text-gray-400" : "border-gray-300 text-gray-500"}`}>
                  Loading leaderboard...
                </p>
              ) : leaderboard.entries.length === 0 ? (
                <p className={`rounded border border-dashed p-4 text-center text-sm ${isDark ? "border-slate-700 text-gray-400" : "border-gray-300 text-gray-500"}`}>
                  No scores yet this month.
                </p>
              ) : (
                <ol className="space-y-2">
                  {leaderboard.entries.map((entry, index) => (
                    <li
                      key={entry.id}
                      className={`rounded border p-3 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="flex flex-wrap items-center gap-2 font-bold">
                            <span>#{index + 1}</span>
                            <span>{getLeaderboardDisplayName(entry.profile, entry.name, entry.redditUsername)}</span>
                          </p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {entry.packName} / Best: {entry.bestCard?.name}
                          </p>
                        </div>
                        <strong className="text-blue-500">{entry.score.toLocaleString()}</strong>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <section className={`rounded-lg border p-3 shadow-sm sm:p-4 ${isDark ? "border-slate-700 bg-zinc-800" : "border-gray-200 bg-white"}`}>
              <h2 className="mb-3 text-xl font-bold">Database Pool</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {rarityOrder.map((rarity) => (
                  <div key={rarity} className={`rounded border px-3 py-2 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                    <div className="font-semibold">{rarity}</div>
                    <div className={isDark ? "text-gray-300" : "text-gray-600"}>{rarityCounts[rarity]} cards</div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
      <RedditVerificationModal
        isOpen={showRedditInfo}
        onClose={() => setShowRedditInfo(false)}
        isDark={isDark}
      />
    </div>
  );
}
