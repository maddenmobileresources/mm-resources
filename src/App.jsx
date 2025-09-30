import React from "react";
import { useState, useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./AppRoutes";
import { Routes, Route, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import players from "./data/players";
import PlayerProfile from "./PlayerProfile";

const rarityColors = {
  "Starter": "bg-[#c2fff5] border-[#c2fff5]",
  "Uncommon": "bg-[#b1ffb1] border-[#b1ffb1]",
  "Rare": "bg-[#a4d3ff] border-[#a4d3ff]", 
  "Epic": "bg-[#d8adff] border-[#d8adff]",
  "Iconic": "bg-[#cfcea0] border-[#cfcea0]",
  "Mythic": "bg-[#e4e4e4] border-[#e4e4e4]",
  "Marvel": "bg-[#ff8484] border-[#ff8484]"
};

const STAT_GROUPS = [
  {
    title: "Quickness",
    stats: ["Speed", "Acceleration"].sort(),
  },
  {
    title: "Physical",
    stats: ["Strength", "Agility", "Jump", "Elusiveness"].sort(),
  },
  {
    title: "Mental",
    stats: ["Awareness", "Ball Carrier Vision", "Play Recognition"].sort(),
  },
  {
    title: "Passing",
    stats: ["Play Action", "Throw on Run", "Throw Power", "Throw Acc Short", "Throw Acc Mid", "Throw Acc Deep"].sort(),
  },
  {
    title: "Receiving",
    stats: ["Release", "Route Running", "Catch", "Catch In Traffic", "Spectacular Catch"].sort(),
  },
  {
    title: "Rushing",
    stats: ["Carry", "Trucking", "Spin Move", "Juke Move", "Stiff Arm"].sort(),
  },
  {
    title: "Blocking",
    stats: ["Impact Block", "Run Block", "Pass Block"].sort(),
  },
  {
    title: "Coverage",
    stats: ["Press", "Man Coverage", "Zone Coverage"].sort(),
  },
  {
    title: "Pass Rush",
    stats: ["Block Shedding", "Finesse Moves", "Power Moves"].sort(),
  },
  {
    title: "Run Stop",
    stats: ["Tackle", "Hit Power", "Pursuit"].sort(),
  },
  {
    title: "Kicking",
    stats: ["Kick Power", "Kick Accuracy"].sort(),
  },
  {
    title: "Returning",
    stats: ["Kick Return"].sort(),
  },
];

// Highlight all 5 players: Best = Green, Middle = Yellow, Worst = Red
const getHighlightClass = (statKey, value, selectedPlayers, label = null) => {
  if (!Array.isArray(selectedPlayers)) return "";

// Don't highlight if only one player is selected
  if (selectedPlayers.length <= 1) return "";

  if (label === "Height") {
  return (() => {
    const values = selectedPlayers.map((p) => parseHeight(formatHeight(p.height)));
    const valueInInches = parseHeight(value);

    const sortedUnique = [...new Set(values)].sort((a, b) => b - a);

    if (valueInInches === sortedUnique[0]) return "bg-green-200";
    if (valueInInches === sortedUnique[sortedUnique.length - 1]) return "bg-red-200";
    return "bg-yellow-200";
  })();
}

if (label === "Weight (lbs.)") {
  return (() => {
    const values = selectedPlayers.map((p) => parseWeight(p.weight));
    const valueInLbs = parseWeight(value);

    const sortedUnique = [...new Set(values)].sort((a, b) => b - a);

    if (valueInLbs === sortedUnique[0]) return "bg-green-200"; // heaviest
    if (valueInLbs === sortedUnique[sortedUnique.length - 1]) return "bg-red-200"; // lightest
    return "bg-yellow-200";
  })();
}

  // Collect all values for this stat
  const values = selectedPlayers
    .map((p) => {
      if (label === "OVR") return p.ovr;
      if (label === "Height") return p.height;
      if (label === "Weight (lbs.)") return p.weight;
      return (
        p.stats.Quickness?.[statKey] ||
        p.stats.Physical?.[statKey] ||
        p.stats.Mental?.[statKey] ||
        p.stats.Passing?.[statKey] ||
        p.stats.Receiving?.[statKey] ||
        p.stats.Rushing?.[statKey] ||
        p.stats.Blocking?.[statKey] ||
        p.stats.Coverage?.[statKey] ||
        p.stats["Pass Rush"]?.[statKey] ||
        p.stats["Run Stop"]?.[statKey] ||
        p.stats.Kicking?.[statKey] ||
        p.stats.Returning?.[statKey] ||
        undefined
      );
    })
    .filter((v) => v !== undefined);

  if (values.length < 1) return "";

  const sortedUnique = [...new Set(values)].sort((a, b) => b - a);

  if (value === sortedUnique[0]) return "bg-green-200";
  if (value === sortedUnique[sortedUnique.length - 1]) return "bg-red-200";
  return "bg-yellow-200";
};

const rarityOptions = [
  "All",
  "Starter",
  "Uncommon",
  "Rare",
  "Epic",
  "Iconic",
  "Mythic",
  "Marvel",
];

const archetypeOptions = [
  "All",
  "Agile C", "Agile OG", "Agile OT", "Blocking FB", "Deep Threat TE", "Deep Threat WR",
  "Elusive Back HB", "Field General MLB", "Field General QB", "Hybrid S", "Improvisor QB",
  "Man to Man CB", "Pass Coverage LB", "Pass Coverage MLB", "Pass Protector C", "Pass Protector OG",
  "Pass Protector OT", "Physical WR", "Possession TE", "Power Back HB", "Power C", "Power K",
  "Power OG", "Power OT", "Power Rusher DE", "Power Rusher DT", "Power Rusher LB", "Returner",
  "Route Runner WR", "Run Stopper DE", "Run Stopper DT", "Run Stopper LB", "Run Stopper MLB",
  "Run Stopper S", "Run Support S", "Scrambler QB", "Slot CB", "Slot WR", "Speed Rusher DE",
  "Speed Rusher LB", "Utility FB", "Zone CB", "Zone S"
];

const formatHeight = (inches) => {
  if (inches == null) return "N/A";
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
};

// Convert height string like "6'2\"" to total inches
const parseHeight = (heightStr) => {
  if (!heightStr) return 0;
  const match = heightStr.match(/(\d+)'(\d+)"/);
  if (!match) return 0;
  const feet = parseInt(match[1], 10);
  const inches = parseInt(match[2], 10);
  return feet * 12 + inches;
};

// Convert weight (string or number) to a number
const parseWeight = (weight) => {
  if (!weight) return 0;
  return typeof weight === "string" ? parseInt(weight, 10) : weight;
};

function MainGrid({
  search, setSearch,
  teamFilter, setTeamFilter,
  programFilter, setProgramFilter,
  rarityFilter, setRarityFilter,
  archetypeFilter, setArchetypeFilter,
  positionFilter, setPositionFilter,
  minOvr, setMinOvr,
  maxOvr, setMaxOvr,
  minHeight, setMinHeight,
  minWeight, setMinWeight,
  statFilters, updateStatFilter, addStatFilter, removeStatFilter,
  filteredPlayers, selectedPlayers, togglePlayer,
  resetFilters
}) {
  const navigate = useNavigate();

  const getCardClassesLocal = (player) => {
    const base = "p-2 border rounded cursor-pointer transition-all";
    const programClass = rarityColors[player.rarity] || "bg-white border-gray-300";
    const hoverClass = "hover:shadow-md";
    const selectedClass = selectedPlayers.some((p) => p.id === player.id)
      ? "shadow-lg border-green-500"
      : "";
    return `${base} ${programClass} ${hoverClass} ${selectedClass}`;
  };

 return (
  <div className="flex flex-col lg:flex-row min-h-screen">

    {/* Two-column layout: Player grid (left) + Compare table (right) */}
    <div className="flex flex-1 gap-6 p-4">
      {/* Player Grid */}
      <main className="flex-1 p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
            <h1 className="w-full text-2xl font-bold mb-2">Player Comparison Tool</h1>
            <button
  onClick={resetFilters}
  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 self-end"
>
  Reset Filters
</button>
          {/* Name Filter */}
          <div className="flex flex-col">
            <span className="font-bold">Name:</span>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-2 py-1 min-w-[200px]"
            />
          </div>
{/* Position Filter */}
<div className="flex flex-col">
  <span className="font-bold">Position:</span>
  <select
    value={positionFilter}
    onChange={(e) => setPositionFilter(e.target.value)}
    className="border rounded px-2 py-1"
  >
    {["All", ...new Set(players.map((p) => p.position))].map((pos) => (
      <option key={pos} value={pos}>
        {pos}
      </option>
    ))}
  </select>
</div>
          {/* Team Filter */}
          <div className="flex flex-col">
            <span className="font-bold">Team:</span>
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {["All", ...new Set(players.map((p) => p.team))].map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Program Filter */}
          <div className="flex flex-col">
            <span className="font-bold">Program:</span>
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {["All", ...new Set(players.map((p) => p.program))].map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>

          {/* Rarity Filter */}
          <div className="flex flex-col">
            <span className="font-bold">Rarity:</span>
            <select
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {rarityOptions.map((rarity) => (
                <option key={rarity} value={rarity}>
                  {rarity}
                </option>
              ))}
            </select>
          </div>

          {/* Archetype Filter */}
          <div className="flex flex-col">
            <span className="font-bold">Archetype:</span>
            <select
              value={archetypeFilter}
              onChange={(e) => setArchetypeFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {archetypeOptions.map((archetype) => (
                <option key={archetype} value={archetype}>
                  {archetype}
                </option>
              ))}
            </select>
          </div>

          {/* Min/Max OVR */}
          <div className="flex flex-col">
            <span className="font-bold">Min OVR:</span>
            <input
              type="number"
              placeholder="Min OVR"
              value={minOvr}
              onChange={(e) => setMinOvr(e.target.value)}
              className="border rounded px-2 py-1"
              min="0"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Max OVR:</span>
            <input
              type="number"
              placeholder="Max OVR"
              value={maxOvr}
              onChange={(e) => setMaxOvr(e.target.value)}
              className="border rounded px-2 py-1"
              min="0"
            />
          </div>

          {/* Height Filter */}
          <div className="flex flex-col">
            <span className="font-bold">Height (in.): ≥</span>
            <input
              type="number"
              placeholder="Min Height"
              value={minHeight}
              onChange={(e) => setMinHeight(e.target.value)}
              className="border rounded px-2 py-1"
              min="0"
            />
          </div>

          {/* Weight Filter */}
          <div className="flex flex-col">
            <span className="font-bold">Weight (lbs.): ≥</span>
            <input
              type="number"
              placeholder="Min Weight"
              value={minWeight}
              onChange={(e) => setMinWeight(e.target.value)}
              className="border rounded px-2 py-1"
              min="0"
            />
          </div>

          {/* Stat Filters */}
          <div className="flex flex-col gap-2">
            <span className="font-bold">Filter by Stats:</span>
            <div className="flex flex-col gap-2">
              {statFilters.map((filter, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <select
                    value={filter.stat}
                    onChange={(e) => updateStatFilter(index, "stat", e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="">-- Select Stat --</option>
                    {STAT_GROUPS.map((group) => (
                      <optgroup key={group.title} label={group.title}>
                        {group.stats.map((stat) => (
                          <option key={stat} value={stat}>
                            {stat}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>

                  <select
                    value={filter.operator}
                    onChange={(e) => updateStatFilter(index, "operator", e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value=">=">{">="}</option>
                    <option value="<=">{"<="}</option>
                    <option value="=">{"="}</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Value"
                    value={filter.value}
                    onChange={(e) => updateStatFilter(index, "value", e.target.value)}
                    className="border rounded px-2 py-1 w-20"
                  />

                  {statFilters.length > 1 && (
                    <button
                      onClick={() => removeStatFilter(index)}
                      className="text-red-500 font-bold px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addStatFilter}
                className="inline-flex mt-1 px-2 py-1 border rounded bg-blue-100 hover:bg-blue-200 self-start"
              >
                + Add Another Stat Filter
              </button>
            </div>
          </div>
        </div>

        {/* Player Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className={getCardClassesLocal(player)}
              onClick={(e) => {
                if (!(e.target.tagName === "INPUT" || e.target.tagName === "SELECT")) {
                  navigate(`/player/${player.id}`);
                }
              }}
            >
              <img src={player.image} alt={player.name} className="w-full mb-2 rounded" />
              <p className="font-semibold">{player.name}</p>
              <p>{player.ovr} OVR</p>
              <p>{player.position} ({player.archetype})</p>
              <p>{player.program}</p>
              <p>{player.team}</p>
              <div className="mt-2">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedPlayers.some((p) => p.id === player.id)}
                    onChange={() => togglePlayer(player)}
                  />{" "}
                  Compare
                </label>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Compare Table */}
      <aside className="w-full lg:w-[630px] p-4 bg-gray-50 border-t lg:border-t-0 lg:border-l">
        <h2 className="text-xl font-bold mb-4">Compare ({selectedPlayers.length}/5)</h2>

        {selectedPlayers.length === 0 ? (
          <p className="text-gray-500">Select players to compare.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-fixed w-full text-sm border-collapse text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1 w-[25%]">Stat</th>
                  {selectedPlayers.map((player) => {
  const rarityClass = rarityColors[player.rarity] || "bg-white border-gray-300";

          // Dynamic width: 80% divided by number of players
        const playerColWidth = `${75 / selectedPlayers.length}%`;

  return (
    <th
      key={player.id}
      className={`border px-2 py-1 ${rarityClass}`}
    >
      <div className="flex flex-col items-center gap-1">
        <img
          src={player.image}
          alt={player.name}
          className="w-12 h-12 rounded mb-1"
        />
        <div className="flex justify-center items-center gap-2 w-full">
          <span className="font-semibold">{player.name}</span>
          <button
            onClick={() => togglePlayer(player)}
            className="text-red-500 font-bold"
          >
            ✕
          </button>
        </div>
        <div className="text-xs">
          {player.position} - {player.team} | {player.archetype}
        </div>
      </div>
    </th>
  );
})}
                </tr>
              </thead>
              <tbody>
  {/* OVR, Height, Weight rows */}
  {["OVR", "Height", "Weight (lbs.)"].map((label) => (
    <tr key={label}>
      <td className="bg-blue-600 text-white font-bold border px-2 py-1 text-center">
        {label}
      </td>
      {selectedPlayers.map((player) => {
        let value = "-";
        if (label === "OVR") value = player.ovr;
        if (label === "Height") value = formatHeight(player.height);
        if (label === "Weight (lbs.)") value = player.weight;

        // Apply color coding
        const highlightClass = getHighlightClass(label, value, selectedPlayers, label);

        return (
          <td
            key={player.id}
            className={`border px-2 py-1 text-center ${highlightClass}`}
          >
            {value}
          </td>
        );
      })}
    </tr>
  ))}

  {/* Stat Groups */}
  {STAT_GROUPS.map((group) => (
    <React.Fragment key={group.title}>
      <tr className="bg-gray-200">
        <td
          className="border px-2 py-2 text-left font-bold text-lg"
          colSpan={selectedPlayers.length + 1}
        >
          {group.title}
        </td>
      </tr>
      {group.stats.map((stat) => (
        <tr key={stat}>
          <td className="bg-blue-600 text-white font-bold border px-2 py-1 text-center">
            {stat}
          </td>
          {selectedPlayers.map((p) => {
            const statValue =
              p.stats.Quickness?.[stat] ??
              p.stats.Physical?.[stat] ??
              p.stats.Mental?.[stat] ??
              p.stats.Passing?.[stat] ??
              p.stats.Receiving?.[stat] ??
              p.stats.Rushing?.[stat] ??
              p.stats.Blocking?.[stat] ??
              p.stats.Coverage?.[stat] ??
              p.stats["Pass Rush"]?.[stat] ??
              p.stats["Run Stop"]?.[stat] ??
              p.stats.Kicking?.[stat] ??
              p.stats.Returning?.[stat] ??
              "N/A";

            const highlightClass = getHighlightClass(stat, statValue, selectedPlayers);

            return (
              <td
                key={p.id}
                className={`border px-2 py-1 text-center ${highlightClass}`}
              >
                {statValue}
              </td>
            );
          })}
        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>
            </table>
          </div>
        )}
      </aside>
    </div>
  </div>
);
}

/* -----------------------
   App component
   ----------------------- */
function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState(searchParams.get("position") || "All");
  const [teamFilter, setTeamFilter] = useState("All");
  const [programFilter, setProgramFilter] = useState("All");
  const [rarityFilter, setRarityFilter] = useState("All");
  const [archetypeFilter, setArchetypeFilter] = useState("All");
  const [minOvr, setMinOvr] = useState("");
  const [maxOvr, setMaxOvr] = useState("");
  const [minHeight, setMinHeight] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [statFilters, setStatFilters] = useState([{ stat: "", operator: ">=", value: "" }]);

  const resetFilters = () => {
  setSearch("");
  setPositionFilter("All");
  setTeamFilter("All");
  setProgramFilter("All");
  setRarityFilter("All");
  setArchetypeFilter("All");
  setMinOvr("");
  setMaxOvr("");
  setMinHeight("");
  setMinWeight("");
  setStatFilters([{ stat: "", operator: ">=", value: "" }]);
};

  // Update a specific stat filter row
  const updateStatFilter = (index, field, newValue) => {
    setStatFilters((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: newValue };
      return updated;
    });
  };

  const addStatFilter = () => {
    setStatFilters((prev) => [...prev, { stat: "", operator: ">=", value: "" }]);
  };

  const removeStatFilter = (index) => {
    setStatFilters((prev) => prev.filter((_, i) => i !== index));
  };

  // Initialize from URL (only once)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idsParam = params.get("players");
    if (idsParam) {
      const ids = idsParam.split(",").map((id) => parseInt(id, 10));
      const preselected = players.filter((p) => ids.includes(p.id));
      setSelectedPlayers(preselected.slice(0, 5));
    }
    setSearch(params.get("search") || "");
    setTeamFilter(params.get("team") || "All");
    setProgramFilter(params.get("program") || "All");
    setRarityFilter(params.get("rarity") || "All");
    setArchetypeFilter(params.get("archetype") || "All");
    setMinOvr(params.get("minOvr") || "");
    setMaxOvr(params.get("maxOvr") || "");
    setMinHeight(params.get("minHeight") || "");
    setMinWeight(params.get("minWeight") || "");

    const statFiltersParam = params.get("statFilters");
    if (statFiltersParam) {
      const parsed = statFiltersParam.split(",").map((s) => {
        const match = s.match(/^([A-Z0-9]+)([<>=]{1,2})(\d+)$/);
        if (match) {
          return {
            stat: match[1],
            operator: match[2],
            value: match[3],
          };
        }
        return { stat: "", operator: ">=", value: "" };
      });
      setStatFilters(parsed);
    }
  }, []);

  // Keep URL in sync with filters + players (only navigate if different)
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedPlayers.length > 0) {
      params.set("players", selectedPlayers.map((p) => p.id).join(","));
    }
    if (search) params.set("search", search);
    if (teamFilter !== "All") params.set("team", teamFilter);
    if (programFilter !== "All") params.set("program", programFilter);
    if (rarityFilter !== "All") params.set("rarity", rarityFilter);
    if (archetypeFilter !== "All") params.set("archetype", archetypeFilter);
    if (positionFilter !== "All") params.set("position", positionFilter);
    if (minOvr) params.set("minOvr", minOvr);
    if (maxOvr) params.set("maxOvr", maxOvr);
    if (minHeight) params.set("minHeight", minHeight);
    if (minWeight) params.set("minWeight", minWeight);

    if (statFilters.length > 0) {
      const encoded = statFilters
        .filter(f => f.stat && f.value !== "")
        .map(f => `${f.stat}${f.operator}${f.value}`)
        .join(",");
      if (encoded) params.set("statFilters", encoded);
    }

    const searchString = params.toString();
    const currentSearch = location.search.replace(/^\?/, "");

    if (searchString !== currentSearch) {
      navigate("?" + searchString, { replace: true });
    }
  }, [
    selectedPlayers,
    search,
    teamFilter,
    programFilter,
    rarityFilter,
    archetypeFilter,
    positionFilter,
    minOvr,
    maxOvr,
    minHeight,
    minWeight,
    statFilters,
    navigate,
    location.search,
  ]);

  const togglePlayer = (player) => {
    setSelectedPlayers((prev) => {
      if (prev.some((p) => p.id === player.id)) {
        return prev.filter((p) => p.id !== player.id);
      } else {
        if (prev.length < 5) return [...prev, player];
        return prev;
      }
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(selectedPlayers);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSelectedPlayers(reordered);
  };

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
    const matchesPosition = positionFilter === "All" || player.position === positionFilter;
    const matchesTeam = teamFilter === "All" || player.team === teamFilter;
    const matchesProgram = programFilter === "All" || player.program === programFilter;
    const matchesRarity = rarityFilter === "All" || player.rarity === rarityFilter;
    const matchesArchetype = archetypeFilter === "All" || player.archetype === archetypeFilter;
    const matchesMinOvr = minOvr === "" || player.ovr >= Number(minOvr);
    const matchesMaxOvr = maxOvr === "" || player.ovr <= Number(maxOvr);
    const matchesMinHeight = minHeight === "" || player.height >= Number(minHeight);
    const matchesMinWeight = minWeight === "" || player.weight >= Number(minWeight);

    const matchesStatFilters = statFilters.every(({ stat, operator, value }) => {
      if (!stat || value === "") return true; // ignore incomplete filters

      const statVal =
        player.stats.Quickness?.[stat] ||
        player.stats.Physical?.[stat] ||
        player.stats.Mental?.[stat] ||
        player.stats.Passing?.[stat] ||
        player.stats.Receiving?.[stat] ||
        player.stats.Rushing?.[stat] ||
        player.stats.Blocking?.[stat] ||
        player.stats.Coverage?.[stat] ||
        player.stats["Pass Rush"]?.[stat] ||
        player.stats["Run Stop"]?.[stat] ||
        player.stats.Kicking?.[stat] ||
        player.stats.Returning?.[stat] ||
        undefined;

      if (statVal === undefined) return false;

      const numVal = Number(value);
      if (isNaN(numVal)) return true;

      switch (operator) {
        case ">=":
          return statVal >= numVal;
        case "<=":
          return statVal <= numVal;
        case "=":
          return statVal === numVal;
        default:
          return true;
      }
    });

    return (
      matchesSearch &&
      matchesTeam &&
      matchesProgram &&
      matchesRarity &&
      matchesArchetype &&
      matchesPosition &&
      matchesMinOvr &&
      matchesMaxOvr &&
      matchesMinHeight &&
      matchesMinWeight &&
      matchesStatFilters
    );
  });

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <MainGrid
              search={search} setSearch={setSearch}
              positionFilter={positionFilter} setPositionFilter={setPositionFilter}
              teamFilter={teamFilter} setTeamFilter={setTeamFilter}
              programFilter={programFilter} setProgramFilter={setProgramFilter}
              rarityFilter={rarityFilter} setRarityFilter={setRarityFilter}
              archetypeFilter={archetypeFilter} setArchetypeFilter={setArchetypeFilter}
              minOvr={minOvr} setMinOvr={setMinOvr}
              maxOvr={maxOvr} setMaxOvr={setMaxOvr}
              minHeight={minHeight} setMinHeight={setMinHeight}
              minWeight={minWeight} setMinWeight={setMinWeight}
              statFilters={statFilters}
              updateStatFilter={updateStatFilter}
              addStatFilter={addStatFilter}
              removeStatFilter={removeStatFilter}
              filteredPlayers={filteredPlayers}
              selectedPlayers={selectedPlayers}
              togglePlayer={togglePlayer}
              resetFilters={resetFilters}
            />
          }
        />
        <Route
          path="/player/:id"
          element={
            <PlayerProfile
              players={players}
              selectedPlayers={selectedPlayers}
              togglePlayer={togglePlayer}
              setSelectedPlayers={setSelectedPlayers}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
