import React, { useMemo, useState } from "react";
import { BarChart3, RotateCcw, Search, Sparkles, Wand2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import players from "../data/MM26PlayerDatabase";
import { BOOST_DATA } from "../data/boostCostData";

const lineupSections = [
  {
    name: "Offense",
    slots: [
      ["QB", "QB"],
      ["HB", "HB"],
      ["FB", "FB"],
      ["WR1", "WR"],
      ["WR2", "WR"],
      ["WR3", "WR"],
      ["TE", "TE"],
      ["OT1", "OT"],
      ["OT2", "OT"],
      ["OG1", "OG"],
      ["OG2", "OG"],
      ["C", "C"],
    ],
  },
  {
    name: "Defense",
    slots: [
      ["DE1", "DE"],
      ["DE2", "DE"],
      ["DT1", "DT"],
      ["DT2", "DT"],
      ["LB1", "LB"],
      ["LB2", "LB"],
      ["MLB1", "MLB"],
      ["MLB2", "MLB"],
      ["CB1", "CB"],
      ["CB2", "CB"],
      ["CB3", "CB"],
      ["CB4", "CB"],
      ["S1", "S"],
      ["S2", "S"],
    ],
  },
  {
    name: "Special Teams",
    slots: [
      ["K", "K"],
      ["P", "P"],
      ["KR", "KR"],
      ["PR", "PR"],
    ],
  },
];

const allSlots = lineupSections.flatMap((section) =>
  section.slots.map(([id, position]) => ({ id, position, section: section.name, group: getBoostGroup(section.name, position) }))
);

const maxBoostLevel = 50;

const today = new Date();

const rarityRank = {
  Starter: 1,
  Uncommon: 2,
  Rare: 3,
  Epic: 4,
  Iconic: 5,
  Mythic: 6,
  Marvel: 7,
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

function sortPlayers(playerList) {
  return [...playerList].sort((a, b) => {
    if ((b.ovr ?? 0) !== (a.ovr ?? 0)) return (b.ovr ?? 0) - (a.ovr ?? 0);
    if ((rarityRank[b.rarity] ?? 0) !== (rarityRank[a.rarity] ?? 0)) {
      return (rarityRank[b.rarity] ?? 0) - (rarityRank[a.rarity] ?? 0);
    }
    return a.name.localeCompare(b.name);
  });
}

function getPlayerById(playerId) {
  return players.find((player) => String(player.id) === String(playerId));
}

function getPlayerPositions(player) {
  return String(player?.position || "")
    .split("|")
    .map((position) => position.trim())
    .filter(Boolean);
}

function playerCanPlayPosition(player, position) {
  return getPlayerPositions(player).includes(position);
}

function getEligiblePlayers(position) {
  return sortPlayers(players.filter((player) => playerCanPlayPosition(player, position) && player.name && player.ovr));
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function parseExpirationDate(text) {
  const match = String(text || "").match(/expires?\s+([A-Z][a-z]+\s+\d{1,2},\s+\d{4})/i);
  if (!match) return null;

  const date = new Date(`${match[1]} 23:59:59`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isDateExpired(expirationDate) {
  return expirationDate ? expirationDate < today : false;
}

function getPlayerNamesInBoostTarget(targetText) {
  const normalizedTarget = normalize(targetText);
  const names = new Set();

  players.forEach((player) => {
    const playerName = normalize(player.name);
    if (playerName && normalizedTarget.includes(playerName)) {
      names.add(playerName);
    }
  });

  return [...names];
}

function isBoostMentionedInExpiration(boost, expirationPart) {
  const boostText = normalize(boost.label);
  const targetText = normalize(boost.target);
  const expirationText = normalize(expirationPart);
  const targetPlayerNames = getPlayerNamesInBoostTarget(targetText);

  return (
    expirationText.includes(boostText) ||
    expirationText.includes(`${boost.amount} ovr to ${targetText}`) ||
    expirationText.includes(`ovr to ${targetText}`) ||
    expirationText.includes(targetText) ||
    targetPlayerNames.some((playerName) => expirationText.includes(playerName))
  );
}

function getBoostExpirationStatus(boost, boostExpires) {
  const expiresText = String(boostExpires || "").trim();
  if (!expiresText) return { active: true, reason: "No expiration listed" };

  const parts = expiresText
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean);

  const targetedPart = parts.find((part) => isBoostMentionedInExpiration(boost, part));
  const globalPart = parts.find((part) => /^(this|these)\s+boosts?\s+/i.test(part));
  const relevantPart = targetedPart || globalPart || (parts.length === 1 ? parts[0] : "");

  if (!relevantPart) {
    return { active: /does not expire/i.test(expiresText), reason: expiresText };
  }

  if (/does not expire/i.test(relevantPart)) {
    return { active: true, reason: relevantPart };
  }

  const expirationDate = parseExpirationDate(relevantPart);
  if (expirationDate) {
    return {
      active: !isDateExpired(expirationDate),
      reason: relevantPart,
      expirationDate,
    };
  }

  return { active: true, reason: relevantPart };
}

function parsePlayerBoosts(player) {
  if (!player?.boost) return [];

  return String(player.boost)
    .split(",")
    .map((item) => item.trim())
    .map((item) => {
      const match = item.match(/\+(\d+)\s+(.+?)\s+to\s+(.+)/i);
      if (!match) return null;

      const boost = {
        amount: Number(match[1]),
        stat: match[2].trim(),
        target: match[3].trim(),
        label: item,
        sourceName: player.name,
      };
      const expiration = getBoostExpirationStatus(boost, player.boostExpires);

      return {
        ...boost,
        active: expiration.active,
        expirationReason: expiration.reason,
      };
    })
    .filter(Boolean);
}

function parseOvrBoosts(player) {
  return parsePlayerBoosts(player).filter((boost) => normalize(boost.stat) === "ovr");
}

function parseStatBoosts(player) {
  return parsePlayerBoosts(player).filter((boost) => normalize(boost.stat) !== "ovr");
}

function boostAppliesToPlayer(boost, player) {
  if (!boost.active) return false;

  const target = normalize(boost.target);
  if (!target) return false;

  if (target.endsWith("+")) {
    const rarity = target.replace("+", "");
    return (rarityRank[player.rarity] ?? 0) >= (rarityRank[rarity] ?? 999);
  }

  const playerName = normalize(player.name);

  return (
    normalize(player.program) === target ||
    normalize(player.rarity) === target ||
    normalize(player.team) === target ||
    getPlayerPositions(player).some((position) => normalize(position) === target) ||
    playerName === target ||
    target.includes(playerName)
  );
}

function isMythicPlusOvrBoost(boost) {
  return normalize(boost.target) === "mythic+" && Number(boost.amount) > 0;
}

function getEvoFoodCandidates(player) {
  if (!player) return [];

  return sortPlayers(
    players.filter(
      (candidate) =>
        candidate.id !== player.id &&
        candidate.rarity === player.rarity &&
        Number(candidate.ovr || 0) > Number(player.ovr || 0)
    )
  );
}

function getBoostGroup(sectionName, position) {
  if (sectionName === "Offense") {
    if (position === "HB" || position === "FB") return "HB/FB";
    if (position === "C" || position === "OG" || position === "OT") return "C/OG/OT";
    return position;
  }

  if (sectionName === "Defense") {
    if (position === "LB" || position === "MLB") return "LB/MLB";
    return position;
  }

  return position;
}

function getBoostPercent(sectionName, groupName, rankLevel) {
  const sectionData = BOOST_DATA[sectionName];
  if (!sectionData) return 0;

  const groupIndex = sectionData.groups.indexOf(groupName);
  if (groupIndex === -1) return 0;

  const safeLevel = Math.max(0, Math.min(maxBoostLevel, Number(rankLevel) || 0));
  return sectionData.percentages[safeLevel]?.[groupIndex] ?? 0;
}

function getRankCost(sectionName, rankLevel) {
  const safeLevel = Math.max(0, Math.min(maxBoostLevel, Number(rankLevel) || 0));
  return BOOST_DATA[sectionName]?.costs[safeLevel] ?? 0;
}

function calculateBoostedLineup(slotSelections, rankLevels, evoSelections) {
  const selectedPlayers = Object.entries(slotSelections)
    .map(([slotId, playerId]) => {
      const player = getPlayerById(playerId);
      const slot = allSlots.find((item) => item.id === slotId);
      const evoFood = getPlayerById(evoSelections[slotId]);
      const validEvoFood =
        player &&
        evoFood &&
        evoFood.rarity === player.rarity &&
        Number(evoFood.ovr || 0) > Number(player.ovr || 0)
          ? evoFood
          : null;
      return player && slot ? { slotId, player, slot, evoFood: validEvoFood } : null;
    })
    .filter(Boolean);

  const databaseBoosts = selectedPlayers.flatMap(({ slotId, player, evoFood }) => {
    const playerBoosts = parseOvrBoosts(player);
    const foodMythicPlusBoosts = evoFood ? parseOvrBoosts(evoFood).filter(isMythicPlusOvrBoost) : [];
    const hasActiveFoodMythicPlusBoost = foodMythicPlusBoosts.some((boost) => boost.active);
    const retainedPlayerBoosts = hasActiveFoodMythicPlusBoost
      ? playerBoosts.filter((boost) => !isMythicPlusOvrBoost(boost))
      : playerBoosts;

    const retainedCardBoosts = retainedPlayerBoosts.map((boost) => ({
      ...boost,
      slotId,
      type: "database",
      evoSource: "retained-card",
    }));

    const transferredFoodBoosts = foodMythicPlusBoosts.map((boost) => ({
      ...boost,
      slotId,
      type: "database",
      sourceName: `${evoFood.name} EVO food`,
      evoSource: "evo-food",
    }));

    return [...retainedCardBoosts, ...transferredFoodBoosts];
  });

  const statBoosts = selectedPlayers.flatMap(({ slotId, player }) =>
    parseStatBoosts(player).map((boost) => ({
      ...boost,
      slotId,
      type: "stat",
    }))
  );

  const activeDatabaseBoosts = databaseBoosts.filter((boost) => boost.active);
  const expiredDatabaseBoosts = databaseBoosts.filter((boost) => !boost.active);
  const activeStatBoosts = statBoosts.filter((boost) => boost.active);
  const expiredStatBoosts = statBoosts.filter((boost) => !boost.active);
  const activeBoosts = activeDatabaseBoosts;
  const boostedBySlot = {};

  selectedPlayers.forEach(({ slotId, player, slot, evoFood }) => {
    const rankLevel = rankLevels[slot.section] ?? 0;
    const rankPercent = getBoostPercent(slot.section, slot.group, rankLevel);
    const databaseBonus = activeDatabaseBoosts
      .filter((boost) => boostAppliesToPlayer(boost, player))
      .reduce((sum, boost) => sum + boost.amount, 0);
    const baseOvr = Number(evoFood?.ovr || player.ovr || 0);
    const rankBonus = baseOvr * (rankPercent / 100);
    const boostedOvr = baseOvr + rankBonus + databaseBonus;

    boostedBySlot[slotId] = {
      baseOvr,
      originalOvr: Number(player.ovr || 0),
      evoFood,
      boostedOvr,
      rankPercent,
      rankBonus,
      databaseBonus,
      boostTotal: rankBonus + databaseBonus,
    };
  });

  return { boostedBySlot, activeBoosts, expiredDatabaseBoosts, activeStatBoosts, expiredStatBoosts };
}

function calculateTeamOvr(slotSelections, rankLevels, evoSelections) {
  const selectedSlots = Object.values(slotSelections).filter(Boolean).length;
  if (!selectedSlots) return { exact: 0, display: 0 };

  const { boostedBySlot } = calculateBoostedLineup(slotSelections, rankLevels, evoSelections);
  const total = Object.values(boostedBySlot).reduce((sum, info) => sum + info.boostedOvr, 0);

  return { exact: total, display: Math.round(total) };
}

function calculateTtpCost(rankLevels) {
  return Object.entries(rankLevels).reduce((sum, [sectionName, rankLevel]) => sum + getRankCost(sectionName, rankLevel), 0);
}

function makeAutoLineup() {
  const usedIds = new Set();

  return allSlots.reduce((lineup, slot) => {
    const player = getEligiblePlayers(slot.position).find((candidate) => !usedIds.has(candidate.id));
    if (player) {
      lineup[slot.id] = String(player.id);
      usedIds.add(player.id);
    }
    return lineup;
  }, {});
}

export default function TeamAnalyzer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [slotSelections, setSlotSelections] = useState({});
  const [evoSelections, setEvoSelections] = useState({});
  const [rankLevels, setRankLevels] = useState({ Offense: 0, Defense: 0, "Special Teams": 0 });
  const [selectedSlotId, setSelectedSlotId] = useState("QB");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedSlot = allSlots.find((slot) => slot.id === selectedSlotId) ?? allSlots[0];
  const eligiblePlayers = useMemo(() => getEligiblePlayers(selectedSlot.position), [selectedSlot.position]);
  const filteredEligiblePlayers = useMemo(() => {
    const query = normalize(searchQuery);
    if (!query) return eligiblePlayers;
    return eligiblePlayers.filter((player) =>
      [player.name, player.team, player.program, player.rarity, player.archetype]
        .map(normalize)
        .some((value) => value.includes(query))
    );
  }, [eligiblePlayers, searchQuery]);

  const { boostedBySlot, activeBoosts, expiredDatabaseBoosts, activeStatBoosts, expiredStatBoosts } = useMemo(
    () => calculateBoostedLineup(slotSelections, rankLevels, evoSelections),
    [evoSelections, rankLevels, slotSelections]
  );
  const teamOvr = useMemo(
    () => calculateTeamOvr(slotSelections, rankLevels, evoSelections),
    [evoSelections, rankLevels, slotSelections]
  );
  const ttpCost = useMemo(() => calculateTtpCost(rankLevels), [rankLevels]);
  const filledSlots = Object.values(slotSelections).filter(Boolean).length;
  const selectedPlayer = getPlayerById(slotSelections[selectedSlot.id]);
  const selectedSlotBoost = boostedBySlot[selectedSlot.id];
  const selectedEvoFood = getPlayerById(evoSelections[selectedSlot.id]);
  const evoFoodCandidates = useMemo(() => getEvoFoodCandidates(selectedPlayer), [selectedPlayer]);

  const upgradeCandidates = useMemo(() => {
    return eligiblePlayers
      .slice(0, 18)
      .map((candidate) => {
        const nextLineup = { ...slotSelections, [selectedSlot.id]: String(candidate.id) };
        const nextEvoSelections = { ...evoSelections };
        delete nextEvoSelections[selectedSlot.id];
        const nextTeamOvr = calculateTeamOvr(nextLineup, rankLevels, nextEvoSelections);
        const nextBoostedInfo = calculateBoostedLineup(nextLineup, rankLevels, nextEvoSelections).boostedBySlot[selectedSlot.id];
        return {
          player: candidate,
          boostedOvr: nextBoostedInfo?.boostedOvr ?? candidate.ovr,
          teamOvr: nextTeamOvr.display,
          change: nextTeamOvr.exact - teamOvr.exact,
        };
      })
      .filter((candidate) => !selectedPlayer || candidate.player.id !== selectedPlayer.id)
      .sort((a, b) => b.change - a.change || b.boostedOvr - a.boostedOvr)
      .slice(0, 6);
  }, [eligiblePlayers, evoSelections, rankLevels, selectedPlayer, selectedSlot.id, slotSelections, teamOvr.exact]);

  const setSlotPlayer = (slotId, playerId) => {
    setSlotSelections((current) => {
      const next = { ...current };
      if (!playerId) {
        delete next[slotId];
      } else {
        next[slotId] = playerId;
      }
      return next;
    });
    setEvoSelections((current) => {
      const next = { ...current };
      delete next[slotId];
      return next;
    });
  };

  const setSlotEvoFood = (slotId, playerId) => {
    setEvoSelections((current) => {
      const next = { ...current };
      if (!playerId) {
        delete next[slotId];
      } else {
        next[slotId] = playerId;
      }
      return next;
    });
  };

  const cardClass = isDark ? "border-slate-700 bg-zinc-800" : "border-gray-200 bg-white";
  const mutedText = isDark ? "text-gray-300" : "text-gray-600";
  const panelClass = `${cardClass} rounded-lg border shadow-sm`;

  return (
    <div className={`min-h-screen px-3 py-6 sm:px-4 ${isDark ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Team Analyzer</h1>
            <p className={`mt-2 max-w-3xl ${mutedText}`}>
              Build your lineup, view boosted player OVR, and preview how position upgrades change your team OVR.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setSlotSelections(makeAutoLineup())}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              <Wand2 size={18} />
              Auto-Fill Best
            </button>
            <button
              type="button"
              onClick={() => {
                setSlotSelections({});
                setEvoSelections({});
                setRankLevels({ Offense: 0, Defense: 0, "Special Teams": 0 });
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold ${
                isDark ? "bg-zinc-700 hover:bg-zinc-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <RotateCcw size={18} />
              Clear
            </button>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <main className="space-y-5">
            <section className={`${panelClass} p-4`}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className={`rounded-lg border p-4 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                  <p className={`text-sm ${mutedText}`}>Team OVR</p>
                  <p className="text-4xl font-black text-blue-500">{teamOvr.display.toLocaleString()}</p>
                </div>
                <div className={`rounded-lg border p-4 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                  <p className={`text-sm ${mutedText}`}>Lineup Filled</p>
                  <p className="text-4xl font-black">{filledSlots}/{allSlots.length}</p>
                </div>
                <div className={`rounded-lg border p-4 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                  <p className={`text-sm ${mutedText}`}>TTP Cost</p>
                  <p className="text-4xl font-black text-amber-400">{ttpCost.toLocaleString()}</p>
                </div>
                <div className={`rounded-lg border p-4 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                  <p className={`text-sm ${mutedText}`}>Active OVR Boosts</p>
                  <p className="text-4xl font-black">{activeBoosts.length}</p>
                </div>
              </div>
            </section>

            <section className={`${panelClass} p-4`}>
              <h2 className="mb-3 text-xl font-bold">Boost Rank Levels</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {Object.keys(BOOST_DATA).map((sectionName) => (
                  <label key={sectionName} className={`rounded-lg border p-3 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                    <span className="text-sm font-semibold">{sectionName}</span>
                    <select
                      value={rankLevels[sectionName]}
                      onChange={(event) =>
                        setRankLevels((current) => ({ ...current, [sectionName]: Number(event.target.value) }))
                      }
                      className={`mt-2 w-full rounded-md border px-3 py-2 ${
                        isDark ? "border-slate-700 bg-zinc-800 text-white" : "border-gray-300 bg-white text-gray-900"
                      }`}
                    >
                      {Array.from({ length: maxBoostLevel + 1 }, (_, level) => (
                        <option key={level} value={level}>
                          Level {level} / Cost {getRankCost(sectionName, level).toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </section>

            {lineupSections.map((section) => (
              <section key={section.name} className={`${panelClass} p-4`}>
                <h2 className="mb-3 text-xl font-bold">{section.name}</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {section.slots.map(([slotId, position]) => {
                    const player = getPlayerById(slotSelections[slotId]);
                    const boostInfo = boostedBySlot[slotId];
                    const selected = slotId === selectedSlotId;

                    return (
                      <button
                        type="button"
                        key={slotId}
                        onClick={() => {
                          setSelectedSlotId(slotId);
                          setSearchQuery("");
                        }}
                        className={`rounded-lg border p-3 text-left transition ${
                          selected
                            ? "border-blue-500 ring-2 ring-blue-500"
                            : isDark
                              ? "border-slate-700 hover:border-blue-400"
                              : "border-gray-200 hover:border-blue-400"
                        } ${isDark ? "bg-zinc-900" : "bg-gray-50"}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-bold">{slotId}</p>
                            <p className={`text-xs ${mutedText}`}>{position}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-black text-blue-500">
                              {boostInfo ? Math.round(boostInfo.boostedOvr) : "--"}
                            </p>
                            {boostInfo?.boostTotal > 0 && (
                              <p className="text-xs font-semibold text-amber-400">+{boostInfo.boostTotal.toFixed(1)}</p>
                            )}
                          </div>
                        </div>
                        <p className="mt-2 truncate text-sm font-semibold">{player?.name || "Empty"}</p>
                        {player && (
                          <>
                            <p className={`truncate text-xs ${mutedText}`}>
                              {player.rarity} / {player.program} / {allSlots.find((slot) => slot.id === slotId)?.group}
                            </p>
                            {boostInfo?.evoFood && (
                              <p className="mt-1 truncate text-xs font-semibold text-purple-400">
                                EVO to {boostInfo.baseOvr} with {boostInfo.evoFood.name}
                              </p>
                            )}
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </main>

          <aside className="space-y-5">
            <section className={`${panelClass} p-4`}>
              <h2 className="text-xl font-bold">Edit Position</h2>
              <p className={`mt-1 text-sm ${mutedText}`}>
                {selectedSlot.id} uses {selectedSlot.position} players.
              </p>

              <label className="mt-4 block text-sm font-semibold" htmlFor="team-analyzer-player">
                Selected player
              </label>
              <select
                id="team-analyzer-player"
                value={slotSelections[selectedSlot.id] || ""}
                onChange={(event) => setSlotPlayer(selectedSlot.id, event.target.value)}
                className={`mt-2 w-full rounded-md border px-3 py-2 ${
                  isDark ? "border-slate-700 bg-zinc-900 text-white" : "border-gray-300 bg-white text-gray-900"
                }`}
              >
                <option value="">Empty position</option>
                {eligiblePlayers.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.ovr} OVR - {player.name} ({player.rarity})
                  </option>
                ))}
              </select>

              {selectedPlayer && (
                <div className={`mt-4 rounded-lg border p-3 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex gap-3">
                    <img src={selectedPlayer.image} alt={selectedPlayer.name} className="h-24 w-16 shrink-0 rounded bg-black object-contain" />
                    <div className="min-w-0">
                      <p className="font-bold">{selectedPlayer.name}</p>
                      <p className={`text-sm ${mutedText}`}>
                        Base {selectedSlotBoost?.baseOvr ?? selectedPlayer.ovr} / Boosted{" "}
                        <strong>{Math.round(selectedSlotBoost?.boostedOvr ?? selectedPlayer.ovr)}</strong>
                      </p>
                      {selectedSlotBoost?.evoFood && (
                        <p className="text-xs font-semibold text-purple-400">
                          EVO food: {selectedSlotBoost.evoFood.name} ({selectedSlotBoost.evoFood.ovr} OVR)
                        </p>
                      )}
                      <p className={`text-xs ${mutedText}`}>
                        {selectedSlot.group} rank: +{selectedSlotBoost?.rankPercent ?? 0}% / Extra: +
                        {selectedSlotBoost?.databaseBonus ?? 0}
                      </p>
                      <p className="text-sm" style={{ color: rarityTextColors[selectedPlayer.rarity] }}>
                        {selectedPlayer.rarity}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <label className="mt-4 block text-sm font-semibold" htmlFor="team-analyzer-evo">
                EVO food card
              </label>
              <select
                id="team-analyzer-evo"
                value={evoSelections[selectedSlot.id] || ""}
                onChange={(event) => setSlotEvoFood(selectedSlot.id, event.target.value)}
                disabled={!selectedPlayer}
                className={`mt-2 w-full rounded-md border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                  isDark ? "border-slate-700 bg-zinc-900 text-white" : "border-gray-300 bg-white text-gray-900"
                }`}
              >
                <option value="">No EVO applied</option>
                {evoFoodCandidates.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.ovr} OVR - {player.name} ({player.rarity})
                  </option>
                ))}
              </select>
              <p className={`mt-2 text-xs ${mutedText}`}>
                EVO uses a higher-OVR card of the same rarity. The EVOed card keeps its own boosts; the food card only transfers active +OVR to Mythic+ boosts.
              </p>
            </section>

            <section className={`${panelClass} p-4`}>
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <BarChart3 size={20} />
                Upgrade Impact
              </h2>
              <div className={`mt-3 rounded-md border px-3 py-2 ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <Search size={16} className={mutedText} />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search candidates..."
                    className={`w-full bg-transparent text-sm outline-none ${isDark ? "placeholder:text-gray-400" : "placeholder:text-gray-500"}`}
                  />
                </div>
              </div>

              <div className="mt-3 max-h-[540px] space-y-2 overflow-y-auto pr-1">
                {(searchQuery ? filteredEligiblePlayers : upgradeCandidates).slice(0, searchQuery ? 25 : 6).map((item) => {
                  const candidate = item.player || item;
                  const simulatedLineup = { ...slotSelections, [selectedSlot.id]: String(candidate.id) };
                  const simulatedEvoSelections = { ...evoSelections };
                  delete simulatedEvoSelections[selectedSlot.id];
                  const candidateTeamOvr = calculateTeamOvr(simulatedLineup, rankLevels, simulatedEvoSelections);
                  const candidateBoostInfo = calculateBoostedLineup(simulatedLineup, rankLevels, simulatedEvoSelections).boostedBySlot[selectedSlot.id];
                  const change = candidateTeamOvr.exact - teamOvr.exact;

                  return (
                    <button
                      type="button"
                      key={candidate.id}
                      onClick={() => setSlotPlayer(selectedSlot.id, String(candidate.id))}
                      className={`w-full rounded-lg border p-3 text-left transition ${
                        isDark ? "border-slate-700 bg-zinc-900 hover:border-blue-400" : "border-gray-200 bg-gray-50 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{candidate.name}</p>
                          <p className={`truncate text-xs ${mutedText}`}>
                            {candidate.rarity} / {candidate.program}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-blue-500">{Math.round(candidateBoostInfo?.boostedOvr ?? candidate.ovr)}</p>
                          <p className={change > 0 ? "text-xs font-semibold text-green-400" : change < 0 ? "text-xs font-semibold text-red-400" : `text-xs ${mutedText}`}>
                            {change > 0 ? "+" : ""}
                            {Math.round(change).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className={`${panelClass} p-4`}>
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Sparkles size={20} />
                Active OVR Boosts
              </h2>
              {activeBoosts.length === 0 ? (
                <p className={`mt-3 rounded border border-dashed p-4 text-center text-sm ${isDark ? "border-slate-700 text-gray-400" : "border-gray-300 text-gray-500"}`}>
                  No active OVR boosts found in the current lineup.
                </p>
              ) : (
                <>
                  <ul className="mt-3 space-y-2">
                  {activeBoosts.map((boost, index) => (
                    <li key={`${boost.sourceSlotId}-${index}`} className={`rounded border p-3 text-sm ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                      <strong>{boost.sourceName}</strong>
                      <p className={mutedText}>
                        {boost.label}
                        {boost.type === "database" && boost.expirationReason ? ` / ${boost.expirationReason}` : ""}
                      </p>
                    </li>
                  ))}
                  </ul>
                </>
              )}
              {expiredDatabaseBoosts.length > 0 && (
                <div className={`mt-3 rounded border p-3 text-sm ${isDark ? "border-red-800 bg-red-950 text-red-100" : "border-red-200 bg-red-50 text-red-800"}`}>
                  <p className="font-semibold">Expired boosts ignored</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {expiredDatabaseBoosts.slice(0, 6).map((boost, index) => (
                      <li key={`${boost.sourceName}-${boost.label}-${index}`}>
                        {boost.sourceName}: {boost.label}
                      </li>
                    ))}
                  </ul>
                  {expiredDatabaseBoosts.length > 6 && (
                    <p className="mt-2">+{expiredDatabaseBoosts.length - 6} more expired boosts.</p>
                  )}
                </div>
              )}
            </section>

            <section className={`${panelClass} p-4`}>
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Sparkles size={20} />
                Active Stat Boosts
              </h2>
              <p className={`mt-2 text-xs ${mutedText}`}>
                These boosts are shown for awareness only. They do not change Team OVR because the hidden stat-to-OVR formula is not available.
              </p>
              {activeStatBoosts.length === 0 ? (
                <p className={`mt-3 rounded border border-dashed p-4 text-center text-sm ${isDark ? "border-slate-700 text-gray-400" : "border-gray-300 text-gray-500"}`}>
                  No active stat boosts found in the current lineup.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {activeStatBoosts.map((boost, index) => (
                    <li key={`${boost.sourceName}-${boost.label}-${index}`} className={`rounded border p-3 text-sm ${isDark ? "border-slate-700 bg-zinc-900" : "border-gray-200 bg-gray-50"}`}>
                      <strong>{boost.sourceName}</strong>
                      <p className={mutedText}>
                        {boost.label}
                        {boost.expirationReason ? ` / ${boost.expirationReason}` : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              {expiredStatBoosts.length > 0 && (
                <div className={`mt-3 rounded border p-3 text-sm ${isDark ? "border-red-800 bg-red-950 text-red-100" : "border-red-200 bg-red-50 text-red-800"}`}>
                  <p className="font-semibold">Expired stat boosts ignored</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {expiredStatBoosts.slice(0, 6).map((boost, index) => (
                      <li key={`${boost.sourceName}-${boost.label}-${index}`}>
                        {boost.sourceName}: {boost.label}
                      </li>
                    ))}
                  </ul>
                  {expiredStatBoosts.length > 6 && (
                    <p className="mt-2">+{expiredStatBoosts.length - 6} more expired stat boosts.</p>
                  )}
                </div>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
