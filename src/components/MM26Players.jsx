import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTheme } from "../context/ThemeContext";
import players from "../data/MM26PlayerDatabase";

const rarityColors = {
  "Starter": "bg-[#c2fff5] border-[#c2fff5]",
  "Uncommon": "bg-[#b1ffb1] border-[#b1ffb1]",
  "Rare": "bg-[#a4d3ff] border-[#a4d3ff]",
  "Epic": "bg-[#d8adff] border-[#d8adff]",
  "Iconic": "bg-[#cfcea0] border-[#cfcea0]",
  "Mythic": "bg-[#e4e4e4] border-[#e4e4e4]",
  "Marvel": "bg-[#ff8484] border-[#ff8484]"
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

const STAT_GROUPS = [
  { title: "Quickness", stats: ["Acceleration", "Speed"] },
  { title: "Physical", stats: ["Agility", "Elusiveness", "Jump", "Strength"] },
  { title: "Mental", stats: ["Awareness", "Ball Carrier Vision", "Play Recognition"] },
  { title: "Passing", stats: ["Play Action", "Throw Acc Deep", "Throw Acc Mid", "Throw Acc Short", "Throw on Run", "Throw Power"] },
  { title: "Receiving", stats: ["Catch", "Catch In Traffic", "Release", "Route Running", "Spectacular Catch"] },
  { title: "Rushing", stats: ["Carry", "Juke Move", "Spin Move", "Stiff Arm", "Trucking"] },
  { title: "Blocking", stats: ["Impact Block", "Pass Block", "Run Block"] },
  { title: "Coverage", stats: ["Man Coverage", "Press", "Zone Coverage"] },
  { title: "Pass Rush", stats: ["Block Shedding", "Finesse Moves", "Power Moves"] },
  { title: "Run Stop", stats: ["Hit Power", "Pursuit", "Tackle"] },
  { title: "Kicking", stats: ["Kick Accuracy", "Kick Power"] },
  { title: "Returning", stats: ["Kick Return"] },
];

const rarityOptions = ["All", "Starter", "Uncommon", "Rare", "Epic", "Iconic", "Mythic", "Marvel"];
const archetypeOptions = [
  "All", "Agile C", "Agile OG", "Agile OT", "Blocking FB", "Deep Threat TE", "Deep Threat WR",
  "Elusive Back HB", "Field General MLB", "Field General QB", "Hybrid S", "Improvisor QB",
  "Man To Man CB", "Pass Coverage LB", "Pass Coverage MLB", "Pass Protector C", "Pass Protector OG",
  "Pass Protector OT", "Physical WR", "Possession TE", "Power Back HB", "Power C", "Power K",
  "Power OG", "Power OT", "Power Rusher DE", "Power Rusher DT", "Power Rusher LB", "Returner",
  "Route Runner WR", "Run Stopper DE", "Run Stopper DT", "Run Stopper LB", "Run Stopper MLB",
  "Run Support S", "Scrambler QB", "Slot CB", "Slot WR", "Speed Rusher DE",
  "Speed Rusher LB", "Utility FB", "Zone CB", "Zone S"
];

const archetypeMapping = {
  "Agile C": "Agile",
  "Agile OG": "Agile",
  "Agile OT": "Agile",
  "Blocking FB": "Blocking",
  "Deep Threat TE": "Deep Threat",
  "Deep Threat WR": "Deep Threat",
  "Elusive Back HB": "Elusive Back",
  "Field General MLB": "Field General",
  "Field General QB": "Field General",
  "Hybrid S": "Hybrid",
  "Improvisor QB": "Improvisor",
  "Man To Man CB": "Man To Man",
  "Pass Coverage LB": "Pass Coverage",
  "Pass Coverage MLB": "Pass Coverage",
  "Pass Protector C": "Pass Protector",
  "Pass Protector OG": "Pass Protector",
  "Pass Protector OT": "Pass Protector",
  "Physical WR": "Physical",
  "Possession TE": "Possession",
  "Power Back HB": "Power Back",
  "Power C": "Power",
  "Power K": "Power",
  "Power OG": "Power",
  "Power OT": "Power",
  "Power Rusher DE": "Power Rusher",
  "Power Rusher DT": "Power Rusher",
  "Power Rusher LB": "Power Rusher",
  "Returner": "Returner",
  "Route Runner WR": "Route Runner",
  "Run Stopper DE": "Run Stopper",
  "Run Stopper DT": "Run Stopper",
  "Run Stopper LB": "Run Stopper",
  "Run Stopper MLB": "Run Stopper",
  "Run Support S": "Run Support",
  "Scrambler QB": "Scrambler",
  "Slot CB": "Slot",
  "Slot WR": "Slot",
  "Speed Rusher DE": "Speed Rusher",
  "Speed Rusher LB": "Speed Rusher",
  "Utility FB": "Utility",
  "Zone CB": "Zone",
  "Zone S": "Zone"
};

const formatHeight = (inches) => {
  if (inches == null) return "N/A";
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
};

const parseHeight = (heightStr) => {
  if (!heightStr) return 0;
  const match = heightStr.match(/(\d+)'(\d+)"/);
  if (!match) return 0;
  return parseInt(match[1], 10) * 12 + parseInt(match[2], 10);
};

const parseWeight = (weight) => {
  if (!weight) return 0;
  return typeof weight === "string" ? parseInt(weight, 10) : weight;
};

const parseStatValue = (val) => {
  if (!val) return null;
  const num = parseInt(val.toString().replace(/[^0-9]/g, ""));
  return isNaN(num) ? null : num;
};

const getStatValue = (player, statKey) => {
  const headerStat = STAT_GROUPS.find(group => group.title === statKey);
  if (headerStat) {
    return player.stats[statKey]?.overall;
  }
  
  for (const group of STAT_GROUPS) {
    const value = player.stats[group.title]?.[statKey];
    if (value !== undefined) return value;
  }
  return undefined;
};

const getHighlightClass = (statKey, value, selectedPlayers, label = null) => {
  if (!Array.isArray(selectedPlayers) || selectedPlayers.length <= 1) return "";

  let values, valueToCompare;

  if (label === "Rarity") {
    const rarityRank = {
      "Starter": 1,
      "Uncommon": 2,
      "Rare": 3,
      "Epic": 4,
      "Iconic": 5,
      "Mythic": 6,
      "Marvel": 7
    };
    values = selectedPlayers.map(p => rarityRank[p.rarity] || 0);
    valueToCompare = rarityRank[value] || 0;
  } else if (label === "Height") {
    values = selectedPlayers.map(p => parseHeight(formatHeight(p.height)));
    valueToCompare = parseHeight(value);
  } else if (label === "Weight (lbs.)") {
    values = selectedPlayers.map(p => parseWeight(p.weight));
    valueToCompare = parseWeight(value);
  } else if (label === "OVR") {
    values = selectedPlayers.map(p => p.ovr);
    valueToCompare = value;
  } else {
    values = selectedPlayers.map(p => getStatValue(p, statKey)).filter(v => v !== undefined);
    valueToCompare = value;
  }

  if (values.length < 1) return "";

  const sortedUnique = [...new Set(values)].sort((a, b) => b - a);
  if (valueToCompare === sortedUnique[0]) return "bg-green-200";
  if (valueToCompare === sortedUnique[sortedUnique.length - 1]) return "bg-red-200";
  return "bg-yellow-200";
};

function Pagination({ currentPage, totalPages, onPageChange, theme }) {
  const [inputValue, setInputValue] = useState("");

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const handleJump = () => {
    const page = parseInt(inputValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleJump();
  };

  return (
    <div className="my-6 flex max-w-full flex-col items-center gap-3 px-2">
      <div className="flex max-w-full flex-wrap items-center justify-center gap-1 sm:gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rounded px-2 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
            currentPage === 1
              ? theme === "dark"
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              : theme === "dark"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <span className="sm:hidden">Prev</span>
          <span className="hidden sm:inline">Previous</span>
        </button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className={`px-1 text-sm sm:px-2 sm:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`min-w-9 rounded px-2 py-2 text-sm font-medium transition-colors sm:min-w-11 sm:px-4 sm:text-base ${
                  currentPage === page
                    ? theme === "dark"
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                    : theme === "dark"
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`rounded px-2 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
            currentPage === totalPages
              ? theme === "dark"
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              : theme === "dark"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
        <span className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Go to page:
        </span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Page #"
          className={`w-16 rounded border px-2 py-1 text-xs sm:w-20 sm:text-sm ${
            theme === "dark"
              ? "bg-zinc-800 text-gray-100 border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        />
        <button
          onClick={handleJump}
          className={`rounded px-3 py-1 text-xs font-medium transition-colors sm:text-sm ${
            theme === "dark"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Go
        </button>
        <span className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          of {totalPages}
        </span>
      </div>
    </div>
  );
}

function FilterInput({ label, type, placeholder, value, onChange, min, theme }) {
  return (
    <div className="flex min-w-0 w-full flex-col sm:w-auto">
      <span className="font-bold">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full min-w-0 rounded border px-2 py-1 sm:min-w-[200px] ${
          theme === "dark" 
            ? "bg-zinc-800 text-gray-100 border-gray-600" 
            : "bg-white text-gray-900 border-gray-300"
        }`}
        min={min}
      />
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, theme }) {
  return (
    <div className="flex min-w-0 w-full flex-col sm:w-auto">
      <span className="font-bold">{label}</span>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className={`w-full min-w-0 rounded border px-2 py-1 sm:min-w-[200px] ${
          theme === "dark" 
            ? "bg-zinc-800 text-gray-100 border-gray-600" 
            : "bg-white text-gray-900 border-gray-300"
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function StatFilterRow({ filter, index, updateStatFilter, removeStatFilter, showRemove, theme }) {
  const selectClass = `w-full min-w-0 rounded border px-2 py-1 sm:w-auto ${
    theme === "dark" 
      ? "bg-zinc-800 text-gray-100 border-gray-600" 
      : "bg-white text-gray-900 border-gray-300"
  }`;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <select
        value={filter.stat}
        onChange={(e) => updateStatFilter(index, "stat", e.target.value)}
        className={selectClass}
      >
        <option value="">-- Select Stat --</option>
        {STAT_GROUPS.map((group) => [
          <option key={group.title} value={group.title} style={{ fontWeight: "bold" }}>{group.title}</option>,
          ...group.stats.map((stat) => (
            <option key={`${group.title}-${stat}`} value={stat}>&nbsp;&nbsp;{stat}</option>
          ))
        ])}
      </select>
      <select
        value={filter.operator}
        onChange={(e) => updateStatFilter(index, "operator", e.target.value)}
        className={selectClass}
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
        className={`${selectClass} sm:w-20`}
      />
      {showRemove && (
        <button onClick={() => removeStatFilter(index)} className="text-red-500 font-bold px-2 hover:text-red-600">
          ✕
        </button>
      )}
    </div>
  );
}

function PlayerRow({ player, selectedPlayers, togglePlayer, navigate, theme }) {
  const isSelected = selectedPlayers.some((p) => p.id === player.id);
  const rarityColor = rarityTextColors[player.rarity] || "#ffffff";

  return (
    <div
      className={`flex min-w-0 flex-col gap-3 rounded-lg p-3 cursor-pointer transition-all duration-200 sm:flex-row sm:items-center sm:justify-between ${
        isSelected 
          ? "bg-green-100 dark:bg-green-900 border-2 border-green-500 shadow-md" 
          : theme === "dark"
            ? "bg-zinc-800 border border-gray-600 hover:bg-zinc-700"
            : "bg-white border border-gray-400 hover:bg-gray-50"
      }`}
      onClick={(e) => {
        if (!(e.target.tagName === "INPUT" || e.target.tagName === "BUTTON")) {
          navigate(`/player/${player.id}`);
        }
      }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <img 
          src={player.image} 
          alt={player.name} 
          className={`w-12 h-12 rounded object-contain border ${
            theme === "dark" ? "border-gray-600 bg-zinc-800" : "border-gray-400 bg-white"
          }`}
        />
        <div className="min-w-0 leading-tight">
          <p className={`font-semibold ${isSelected ? "text-gray-900" : ""}`}>{player.name}</p>
          <p className={`break-words text-sm ${isSelected ? "text-gray-900" : theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            {player.ovr} OVR • <span style={{ color: rarityColor }}>{player.rarity}</span> • {Array.isArray(player.program) ? player.program[0].replace(/ I$/, "") + " I & II" : player.program} • {player.position.split("|")[0]} ({player.archetype}) • {player.team}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); togglePlayer(player); }}
          className={`w-full rounded px-4 py-2 font-semibold transition-colors sm:w-auto ${
            isSelected
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {isSelected ? "Remove from Compare" : "Add to Compare"}
        </button>
      </div>
    </div>
  );
}

function CompareTable({ selectedPlayers, togglePlayer, theme }) {
  return (
    <aside className={`w-full lg:w-[630px] p-4 border-t lg:border-t-0 lg:border-l ${
      theme === "dark" 
        ? "bg-zinc-800 border-gray-700 text-gray-100" 
        : "bg-gray-100 border-gray-300 text-gray-900"
    }`}>
      <h2 className="text-xl font-bold mb-4">Compare ({selectedPlayers.length}/5)</h2>
      {selectedPlayers.length === 0 ? (
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
          Select players to compare.
        </p>
      ) : (
        <div className="compare-scroll overflow-x-auto">
          <table className={`compare-table compare-count-${selectedPlayers.length} table-fixed w-full text-xs border-collapse text-center sm:text-sm`}>
            <colgroup>
              <col className="compare-stat-col" />
              {selectedPlayers.map((player) => (
                <col key={player.id} />
              ))}
            </colgroup>
            <thead>
              <tr className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"}>
                <th className={`compare-label-cell compare-stat-heading-cell w-[22%] border px-1 py-1 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                  Stat
                </th>
                {selectedPlayers.map((player) => (
                  <PlayerHeader key={player.id} player={player} togglePlayer={togglePlayer} theme={theme} />
                ))}
              </tr>
            </thead>
            <tbody>
              {["Rarity", "OVR", "Height", "Weight (lbs.)"].map((label) => (
                <InfoRow key={label} label={label} selectedPlayers={selectedPlayers} theme={theme} />
              ))}
              {STAT_GROUPS.map((group) => (
                <StatGroupRows key={group.title} group={group} selectedPlayers={selectedPlayers} theme={theme} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </aside>
  );
}

function PlayerHeader({ player, togglePlayer, theme }) {
  const navigate = useNavigate();
  const rarityClass = rarityColors[player.rarity] || "bg-white border-gray-300";
  
  return (
    <th className={`break-words border px-1 py-1 align-top ${rarityClass} ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
      <div 
        className="flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => navigate(`/player/${player.id}`)}
      >
        <img 
          src={player.image} 
          alt={player.name} 
          className="h-14 w-auto object-contain mb-2" 
        />
        <div className="flex w-full items-start justify-center gap-1">
          <span className="min-w-0 break-words font-semibold leading-tight text-gray-900">
            {player.name}
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              togglePlayer(player);
            }} 
            className="mobile-compare-remove-button text-red-500 font-bold hover:text-red-600"
          >
            ✕
          </button>
        </div>
        <div className="break-words text-[10px] leading-tight text-gray-900 sm:text-xs">
  {player.position.split("|")[0]} - {player.team} | {player.archetype}
</div>
      </div>
    </th>
  );
}

function InfoRow({ label, selectedPlayers, theme }) {
  return (
    <tr>
      <td className={`compare-label-cell bg-blue-600 text-white font-bold border px-0.5 py-1 text-center sm:px-1 ${
        theme === "dark" ? "border-gray-600" : "border-gray-300"
      }`}>
        {label}
      </td>
      {selectedPlayers.map((player) => {
        let value = "-";
        let displayValue = "-";
        
        if (label === "OVR") {
          value = player.ovr;
          displayValue = player.ovr;
        }
        if (label === "Rarity") {
          value = player.rarity;
          displayValue = player.rarity;
        }
        if (label === "Height") {
          value = formatHeight(player.height);
          displayValue = formatHeight(player.height);
        }
        if (label === "Weight (lbs.)") {
          value = player.weight;
          displayValue = player.weight;
        }
        
        const highlightClass = getHighlightClass(label, value, selectedPlayers, label);
        const hasHighlight = highlightClass !== "";
        
        return (
          <td 
            key={player.id} 
            className={`compare-value-cell compare-info-value-cell border px-1 py-1 text-center ${highlightClass} ${
              theme === "dark" ? "border-gray-600" : "border-gray-300"
            } ${hasHighlight ? "text-gray-900" : ""}`}
          >
            {displayValue}
          </td>
        );
      })}
    </tr>
  );
}

function StatGroupRows({ group, selectedPlayers, theme }) {
  return (
    <React.Fragment>
      <tr className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"}>
        <td 
          className={`compare-group-cell border px-1 py-2 text-left font-bold sm:px-2 ${
            theme === "dark" ? "border-gray-600" : "border-gray-300"
          }`}
        >
          {group.title}
        </td>
        {selectedPlayers.map((p) => {
          const overallValue = p.stats[group.title]?.overall ?? "N/A";
          return (
            <td 
              key={p.id} 
              className={`compare-value-cell border px-1 py-2 text-center font-bold ${
                theme === "dark" ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-gray-200 text-gray-900"
              }`}
            >
              {overallValue}
            </td>
          );
        })}
      </tr>
      {group.stats.map((stat) => (
        <tr key={stat}>
          <td className={`compare-label-cell bg-blue-600 text-white font-bold border px-0.5 py-1 text-center sm:px-1 ${
            theme === "dark" ? "border-gray-600" : "border-gray-300"
          }`}>
            {stat}
          </td>
          {selectedPlayers.map((p) => {
            const statValue = getStatValue(p, stat) ?? "N/A";
            const highlightClass = getHighlightClass(stat, statValue, selectedPlayers);
            const hasHighlight = highlightClass !== "";
            return (
              <td 
                key={p.id} 
                className={`compare-value-cell ${hasHighlight ? "" : "compare-empty-value-cell"} border px-1 py-1 text-center ${highlightClass} ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                } ${hasHighlight ? "text-gray-900" : ""}`}
              >
                {statValue}
              </td>
            );
          })}
        </tr>
      ))}
    </React.Fragment>
  );
}

function MainGrid({
  search, setSearch, teamFilter, setTeamFilter, programFilter, setProgramFilter,
  rarityFilter, setRarityFilter, archetypeFilter, setArchetypeFilter,
  positionFilter, setPositionFilter, minOvr, setMinOvr, maxOvr, setMaxOvr,
  minHeight, setMinHeight, minWeight, setMinWeight, statFilters, updateStatFilter,
  addStatFilter, removeStatFilter, filteredPlayers, selectedPlayers, togglePlayer, resetFilters
}) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 20;
  
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  const startIndex = (currentPage - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;
  const currentPlayers = filteredPlayers.slice(startIndex, endIndex);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [search, teamFilter, programFilter, rarityFilter, archetypeFilter, positionFilter, minOvr, maxOvr, minHeight, minWeight, statFilters]);

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen transition-colors duration-300 ${
  theme === "dark" ? "bg-zinc-900 text-gray-100" : "bg-gray-50 text-gray-900"
}`}>
  <div className="flex min-w-0 flex-1 flex-col gap-6 p-3 pt-2 lg:flex-row lg:p-4">
    <main className="min-w-0 flex-1 p-0 pt-2 sm:p-4 sm:pt-2">
          <div className="mb-4 flex min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap">
            <div className="w-full mb-2 flex flex-wrap items-start justify-between gap-4">
  <div>
    <h1 className="text-2xl font-bold">Player Database</h1>
    <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
      Last Updated: November 25, 2025
    </p>
  </div>

  <div className={`text-sm rounded-lg px-4 py-2 border ${
    theme === "dark"
      ? "bg-zinc-800 border-gray-600 text-gray-200"
      : "bg-white border-gray-300 text-gray-800"
  }`}>
    <p className="font-bold mb-1">🆕 Recently Added</p>
    <ul className="space-y-0.5">
      <li>
        •{" "}
        <button
          onClick={() => setProgramFilter("Lone Star")}
          className="text-blue-500 hover:text-blue-600 hover:underline"
        >
          Lone Star
        </button>
        {" "}
        <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>(Nov 25, 2025)</span>
      </li>
      <li>
        •{" "}
        <button
          onClick={() => setProgramFilter("Autumn Blaze")}
          className="text-blue-500 hover:text-blue-600 hover:underline"
        >
          Autumn Blaze
        </button>
        {" "}
        <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>(Nov 18, 2025)</span>
      </li>
    </ul>
  </div>
</div>
            <button 
              onClick={resetFilters} 
              className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 sm:w-auto sm:self-end"
            >
              Reset Filters
            </button>

            <FilterInput label="Name:" type="text" placeholder="Search by name..." value={search} onChange={setSearch} theme={theme} />
            <FilterSelect label="Position:" value={positionFilter} onChange={setPositionFilter} options={["All", "Dual", ...new Set(players.map(p => p.position.split("|")[0]))]} theme={theme} />
            <FilterSelect label="Team:" value={teamFilter} onChange={setTeamFilter} options={["All", ...new Set(players.map(p => p.team))]} theme={theme} />
            <FilterSelect label="Program:" value={programFilter} onChange={setProgramFilter} options={["All", ...new Set(players.flatMap(p => Array.isArray(p.program) ? p.program : [p.program]))]} theme={theme} />
            <FilterSelect label="Rarity:" value={rarityFilter} onChange={setRarityFilter} options={rarityOptions} theme={theme} />
            <FilterSelect label="Archetype:" value={archetypeFilter} onChange={setArchetypeFilter} options={archetypeOptions} theme={theme} />
            <FilterInput label="Min OVR:" type="number" placeholder="Min OVR" value={minOvr} onChange={setMinOvr} min="0" theme={theme} />
            <FilterInput label="Max OVR:" type="number" placeholder="Max OVR" value={maxOvr} onChange={setMaxOvr} min="0" theme={theme} />
            <FilterInput label="Height (in.): ≥" type="number" placeholder="Min Height" value={minHeight} onChange={setMinHeight} min="0" theme={theme} />
            <FilterInput label="Weight (lbs.): ≥" type="number" placeholder="Min Weight" value={minWeight} onChange={setMinWeight} min="0" theme={theme} />

            <div className="flex min-w-0 w-full flex-col gap-2">
              <span className="font-bold">Filter by Stats:</span>
              <div className="flex flex-col gap-2">
                {statFilters.map((filter, index) => (
                  <StatFilterRow
                    key={index}
                    filter={filter}
                    index={index}
                    updateStatFilter={updateStatFilter}
                    removeStatFilter={removeStatFilter}
                    showRemove={statFilters.length > 1}
                    theme={theme}
                  />
                ))}
                <button 
                  onClick={addStatFilter} 
                  className={`inline-flex mt-1 px-2 py-1 border rounded self-start ${
                    theme === "dark" 
                      ? "bg-blue-700 hover:bg-blue-600 border-blue-600 text-white" 
                      : "bg-blue-100 hover:bg-blue-200 border-blue-300"
                  }`}
                >
                  + Add Another Stat Filter
                </button>
              </div>
            </div>
          </div>

          <div className={`mb-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPlayers.length)} of {filteredPlayers.length} players
          </div>

          <div className="flex flex-col divide-y divide-gray-300 dark:divide-gray-700">
            {currentPlayers.length > 0 ? (
              currentPlayers.map((player) => (
                <PlayerRow 
                  key={player.id} 
                  player={player} 
                  selectedPlayers={selectedPlayers} 
                  togglePlayer={togglePlayer} 
                  navigate={navigate}
                  theme={theme}
                />
              ))
            ) : (
              <p className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                No players found.
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              theme={theme}
            />
          )}
        </main>

        <CompareTable selectedPlayers={selectedPlayers} togglePlayer={togglePlayer} theme={theme} />
      </div>
    </div>
  );
}

function PlayerComparison({ selectedPlayers, setSelectedPlayers }) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(selectedPlayers);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setSelectedPlayers(reordered);
  };

  const removePlayer = (playerId) => {
    setSelectedPlayers(prev => prev.filter(p => p.id !== playerId));
  };

  const clearAll = () => {
    setSelectedPlayers([]);
  };

  const copyShareableLink = () => {
    const ids = selectedPlayers.map(p => p.id).join(',');
    const url = `${window.location.origin}/players?players=${ids}`;
    navigator.clipboard.writeText(url);
    alert("Shareable link copied to clipboard!");
  };

  if (selectedPlayers.length === 0) {
    return (
      <div className={`p-8 text-center ${theme === "dark" ? "bg-zinc-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
          No players selected. Go to{" "}
          <button 
            onClick={() => navigate("/players")}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Player Database
          </button>
          {" "}to add some.
        </p>
      </div>
    );
  }

  const statCategories = Object.fromEntries(
    Object.keys(selectedPlayers[0].stats).map((cat) => [
      cat,
      Array.from(
        new Set(selectedPlayers.flatMap((p) => Object.keys(p.stats[cat] || {})))
      ),
    ])
  );

  return (
    <div className={`p-4 min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-zinc-800 text-gray-100" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="mb-4 flex gap-2">
        <h1 className="text-2xl font-bold flex-1">Player Comparison</h1>
        <button 
          onClick={clearAll}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear All
        </button>
        <button 
          onClick={copyShareableLink}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Copy Shareable Link
        </button>
      </div>

      <div className="compare-scroll overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <table className={`compare-table compare-count-${selectedPlayers.length} w-full table-fixed border-collapse text-xs sm:text-sm ${
            theme === "dark" ? "bg-zinc-800" : "bg-white"
          }`}>
            <colgroup>
              <col className="compare-stat-col" />
              {selectedPlayers.map((player) => (
                <col key={player.id} />
              ))}
            </colgroup>
            <thead>
              <Droppable droppableId="players" direction="horizontal">
                {(provided) => (
                  <tr 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                    className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"}
                  >
                    <th className={`compare-label-cell compare-stat-heading-cell sticky left-0 z-10 w-[22%] border px-1 py-2 sm:px-4 ${
                      theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-gray-300"
                    }`}>
                      Stat
                    </th>
                    {selectedPlayers.map((player, index) => (
                      <Draggable
                        key={player.id}
                        draggableId={player.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <th
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`break-words border px-1 py-2 align-top ${
                              theme === "dark" ? "border-gray-600" : "border-gray-300"
                            }`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <img 
                                src={player.image} 
                                alt={player.name} 
                                className="h-16 w-auto object-contain"
                              />
                              <h3 className="break-words text-center font-semibold leading-tight">{player.name}</h3>
                              <p className={`break-words text-center text-[10px] leading-tight sm:text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
  {player.position.split("|")[0]} | {player.team}
</p>
                              <button 
                                onClick={() => removePlayer(player.id)}
                                className="text-red-500 hover:text-red-600 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </th>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tr>
                )}
              </Droppable>
            </thead>

            <tbody>
              {Object.entries(statCategories).map(([category, stats]) => (
                <React.Fragment key={category}>
                  <tr className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"}>
                    <td 
                      colSpan={selectedPlayers.length + 1}
                      className={`compare-group-cell border px-1 py-2 font-bold sm:px-4 ${
                        theme === "dark" ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      {category}
                    </td>
                  </tr>

                  {stats.map((stat) => {
                    const values = selectedPlayers.map((p) =>
                      parseStatValue(p.stats[category]?.[stat])
                    );
                    const numericValues = values.filter((v) => v !== null);
                    const max = Math.max(...numericValues);
                    const min = Math.min(...numericValues);

                    return (
                      <tr key={stat}>
                        <td className={`compare-label-cell border px-0.5 py-2 font-medium sm:px-4 ${
                          theme === "dark" ? "border-gray-600 bg-zinc-800" : "border-gray-300"
                        }`}>
                          {stat}
                        </td>
                        {selectedPlayers.map((p, i) => {
                          const val = p.stats[category]?.[stat] ?? "-";
                          const num = values[i];
                          let cellClass = `compare-value-cell border px-1 py-2 text-center leading-tight sm:px-4 ${
                            theme === "dark" ? "border-gray-600" : "border-gray-300"
                          }`;
                          
                          if (num !== null && numericValues.length > 1) {
                            if (num === max) cellClass += " bg-green-200 text-gray-900";
                            else if (num === min) cellClass += " bg-red-200 text-gray-900";
                            else cellClass += " bg-yellow-100 text-gray-900";
                          } else {
                            cellClass += " compare-empty-value-cell";
                          }
                          
                          return (
                            <td key={p.id} className={cellClass}>
                              {val}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </DragDropContext>
      </div>
    </div>
  );
}

export default function MM26Players({ selectedPlayers, setSelectedPlayers, togglePlayer, isComparePage = false }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

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
  const [showLimitModal, setShowLimitModal] = useState(false);

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

  const handleTogglePlayer = (player) => {
    const isSelected = selectedPlayers.some((p) => p.id === player.id);
    if (!isSelected && selectedPlayers.length >= 5) {
      setShowLimitModal(true);
      return;
    }
    togglePlayer(player);
  };

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

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setTeamFilter(searchParams.get("team") || "All");
    setProgramFilter(searchParams.get("program") || "All");
    setRarityFilter(searchParams.get("rarity") || "All");
    setArchetypeFilter(searchParams.get("archetype") || "All");
    setMinOvr(searchParams.get("minOvr") || "");
    setMaxOvr(searchParams.get("maxOvr") || "");
    setMinHeight(searchParams.get("minHeight") || "");
    setMinWeight(searchParams.get("minWeight") || "");

    const statFiltersParam = searchParams.get("statFilters");
    if (statFiltersParam) {
      const parsed = statFiltersParam.split(",").map((s) => {
        const match = s.match(/^([A-Z0-9]+)([<>=]{1,2})(\d+)$/);
        if (match) {
          return { stat: match[1], operator: match[2], value: match[3] };
        }
        return { stat: "", operator: ">=", value: "" };
      });
      setStatFilters(parsed);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedPlayers.length > 0) params.set("players", selectedPlayers.map((p) => p.id).join(","));
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
      const encoded = statFilters.filter(f => f.stat && f.value !== "").map(f => `${f.stat}${f.operator}${f.value}`).join(",");
      if (encoded) params.set("statFilters", encoded);
    }

    const searchString = params.toString();
    const currentSearch = location.search.replace(/^\?/, "");
    if (searchString !== currentSearch) {
      navigate("?" + searchString, { replace: true });
    }
  }, [selectedPlayers, search, teamFilter, programFilter, rarityFilter, archetypeFilter, positionFilter, minOvr, maxOvr, minHeight, minWeight, statFilters, navigate, location.search]);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
    const matchesPosition = 
  positionFilter === "All" ||
  (positionFilter === "Dual" && player.isDualCard) ||
  player.position.split("|")[0] === positionFilter;
    const matchesTeam = teamFilter === "All" || player.team === teamFilter;
    const matchesProgram = programFilter === "All" || 
  (Array.isArray(player.program) 
    ? player.program.includes(programFilter) 
    : player.program === programFilter);
    const matchesRarity = rarityFilter === "All" || player.rarity === rarityFilter;
    
    const matchesArchetype = archetypeFilter === "All" || 
      player.archetype === archetypeFilter || 
      player.archetype === archetypeMapping[archetypeFilter];
    
    const matchesMinOvr = minOvr === "" || player.ovr >= Number(minOvr);
    const matchesMaxOvr = maxOvr === "" || player.ovr <= Number(maxOvr);
    const matchesMinHeight = minHeight === "" || player.height >= Number(minHeight);
    const matchesMinWeight = minWeight === "" || player.weight >= Number(minWeight);

    const matchesStatFilters = statFilters.every(({ stat, operator, value }) => {
      if (!stat || value === "") return true;
      const statVal = getStatValue(player, stat);
      if (statVal === undefined) return false;
      const numVal = Number(value);
      if (isNaN(numVal)) return true;
      switch (operator) {
        case ">=": return statVal >= numVal;
        case "<=": return statVal <= numVal;
        case "=": return statVal === numVal;
        default: return true;
      }
    });

    return matchesSearch && matchesTeam && matchesProgram && matchesRarity && matchesArchetype && matchesPosition && matchesMinOvr && matchesMaxOvr && matchesMinHeight && matchesMinWeight && matchesStatFilters;
  });

  if (isComparePage) {
    return <PlayerComparison selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers} />;
  }

  return (
    <>
      {showLimitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-md w-full mx-4 ${
            theme === "dark" ? "bg-zinc-800 text-gray-100" : "bg-white text-gray-900"
          }`}>
            <h2 className="text-xl font-bold mb-4">localhost:5173 says</h2>
            <p className="mb-6">You can only compare up to 5 players at once.</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowLimitModal(false)}
                className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 font-semibold"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      <MainGrid 
        search={search} 
        setSearch={setSearch} 
        positionFilter={positionFilter} 
        setPositionFilter={setPositionFilter} 
        teamFilter={teamFilter} 
        setTeamFilter={setTeamFilter} 
        programFilter={programFilter} 
        setProgramFilter={setProgramFilter} 
        rarityFilter={rarityFilter} 
        setRarityFilter={setRarityFilter} 
        archetypeFilter={archetypeFilter} 
        setArchetypeFilter={setArchetypeFilter} 
        minOvr={minOvr} 
        setMinOvr={setMinOvr} 
        maxOvr={maxOvr} 
        setMaxOvr={setMaxOvr} 
        minHeight={minHeight} 
        setMinHeight={setMinHeight} 
        minWeight={minWeight} 
        setMinWeight={setMinWeight} 
        statFilters={statFilters} 
        updateStatFilter={updateStatFilter} 
        addStatFilter={addStatFilter} 
        removeStatFilter={removeStatFilter} 
        filteredPlayers={filteredPlayers} 
        selectedPlayers={selectedPlayers} 
        togglePlayer={handleTogglePlayer} 
        resetFilters={resetFilters} 
      />
    </>
  );
}
