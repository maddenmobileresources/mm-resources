import React from "react";
import { useParams, Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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
  { label: "Quickness", stats: ["Speed", "Acceleration"] },
  { label: "Physical", stats: ["Strength", "Agility", "Jump", "Elusiveness"] },
  { label: "Mental", stats: ["Awareness", "Ball Carrier Vision", "Play Recognition"] },
  { label: "Passing", stats: ["Play Action", "Throw on Run", "Throw Power", "Throw Acc Short", "Throw Acc Mid", "Throw Acc Deep"] },
  { label: "Receiving", stats: ["Release", "Route Running", "Catch", "Catch In Traffic", "Spectacular Catch"] },
  { label: "Rushing", stats: ["Carry", "Trucking", "Spin Move", "Juke Move", "Stiff Arm"] },
  { label: "Blocking", stats: ["Impact Block", "Run Block", "Pass Block"] },
  { label: "Coverage", stats: ["Press", "Man Coverage", "Zone Coverage"] },
  { label: "Pass Rush", stats: ["Block Shedding", "Finesse Moves", "Power Moves"] },
  { label: "Run Stop", stats: ["Tackle", "Hit Power", "Pursuit"] },
  { label: "Kicking", stats: ["Kick Power", "Kick Accuracy"] },
  { label: "Returning", stats: ["Kick Return"] }
];

export default function PlayerProfile({
  players,
  selectedPlayers = [],
  togglePlayer,
  setSelectedPlayers
}) {
  const { id } = useParams();
  const player = players?.find((p) => p.id === parseInt(id, 10));

  if (!player) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Player not found</h2>
        <Link to="/" className="text-blue-500 underline mt-2 block">
          Back to Compare
        </Link>
      </div>
    );
  }

// Highlight all 5 players: Best = Green, Middle = Yellow, Worst = Red
const getHighlightClass = (statKey, value, label = null) => {
  if (!Array.isArray(selectedPlayers)) return "";

  // Collect all values for this stat
  const values = selectedPlayers
    .filter((p) => p && p.stats)
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

  if (values.length < 2) return "";

  // Unique sorted values (highest first)
  const sorted = [...new Set(values)].sort((a, b) => b - a);

  const isBest = value === sorted[0];
  const isWorst = value === sorted[sorted.length - 1];

  if (isBest) return "bg-green-200";
  if (isWorst) return "bg-red-200";
  return "bg-yellow-200"; // Everything in between
};

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (!Array.isArray(selectedPlayers)) return;
    const reordered = Array.from(selectedPlayers);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSelectedPlayers?.(reordered);
  };

  const formatHeight = (inches) => {
    if (inches == null) return "N/A";
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
  };

  const validPlayers = Array.isArray(selectedPlayers)
    ? selectedPlayers.filter((p) => p && p.id !== undefined && p.id !== null)
    : [];

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Player Details */}
      <div className="w-full lg:w-3/4 mb-6 lg:mb-0">
        <Link to="/" className="text-blue-500 underline mb-4 block">
          ← Back to Main Page
        </Link>

        <div className="flex gap-4">
          <img
            src={player.image}
            alt={player.name}
            className="w-48 h-48 object-cover rounded"
          />
          <div>
            <h2 className="text-2xl font-bold">{player.name}</h2>
            <p><strong>OVR:</strong> {player.ovr}</p>
            <p><strong>Height:</strong> {formatHeight(player.height)}</p>
            <p><strong>Weight (lbs.):</strong> {player.weight ?? "N/A"}</p>           
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Team:</strong> {player.team}</p>
            <p><strong>Program:</strong> {player.program}</p>
            <p><strong>Rarity:</strong> {player.rarity}</p>
            <p><strong>Archetype:</strong> {player.archetype}</p>


            <button
              onClick={() => togglePlayer?.(player)}
              className={`mt-4 px-4 py-2 rounded ${
                validPlayers.some((p) => p.id === player.id)
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {validPlayers.some((p) => p.id === player.id)
                ? "Remove from Comparison"
                : "Add to Comparison"}
            </button>
          </div>
        </div>

        {/* Grouped stats */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Stats</h3>
          {STAT_GROUPS.map((group) => (
            <div key={group.label} className="mb-4">
              <h4 className="text-lg font-semibold mb-1">{group.label}</h4>
              <ul className="list-disc list-inside ml-4">
                {group.stats.map((stat) => (
                  <li key={stat}>
                    <span className="font-bold">{stat}:</span>{" "}
                    {player.stats?.[group.label]?.[stat] ?? "N/A"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Panel + Table */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* Comparison Panel */}
        <div className="p-4 border border-blue-500 rounded bg-white">
          <h2 className="text-xl font-bold mb-2">Comparison Panel</h2>
          {validPlayers.length === 0 ? (
            <p>No players selected yet.</p>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="compare-panel">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                  {validPlayers.map((p, index) => {
  const rarityClass = rarityColors[p.rarity] || "bg-white border-gray-300";
  return (
    <Draggable
      key={p.id.toString()}
      draggableId={p.id.toString()}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${rarityClass} p-2 mb-2 rounded flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <img src={p.image} alt={p.name} className="w-12 h-12 rounded" />
            <div>
              <div className="font-semibold">{p.name}</div>
              {/* Updated details line with OVR label */}
              <div className="text-xs text-gray-800">
                {p.ovr} OVR • {p.rarity} • {p.program} • {p.position} ({p.archetype})
              </div>
            </div>
          </div>
          <button
            onClick={() => togglePlayer?.(p)}
            className="text-red-500 font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </Draggable>
  );
})}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>

        {/* Highlighted Comparison Table */}
        {validPlayers.length > 0 && (
          <div className="p-4 border border-green-500 rounded bg-white overflow-x-auto">
            <h3 className="text-lg font-bold mb-2">Stat Comparison</h3>
            <table className="table-fixed w-full text-sm border-collapse">
<thead>
  <tr>
    <th className="border p-1 w-35">Stat</th>
    {validPlayers.map((p) => {
      const rarityClass = rarityColors[p.rarity] || "bg-white border-gray-300";
      return (
        <th key={p.id} className={`border p-2 ${rarityClass} text-center`}
        style={{ width: `${100 / validPlayers.length}%` }}>
          <div className="flex flex-col items-center justify-center text-center gap-1">
            <div className="flex justify-center items-center gap-2 w-full">
              <span className="font-semibold text-sm">{p.name}</span>
              <button
                onClick={() => togglePlayer?.(p)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-xs leading-tight">
              <div>{p.position} - {p.team}</div>
              <div>{p.archetype}</div>
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
    {validPlayers.map((p) => {
      let value = "-";
      if (label === "OVR") value = p.ovr;
      if (label === "Height") value = p.height;
      if (label === "Weight (lbs.)") value = p.weight;

      return (
        <td
          key={p.id}
          className={`border px-2 py-1 text-center ${getHighlightClass(null, value, label)}`}
        >
          {label === "Height" ? formatHeight(value) : value}
        </td>
      );
    })}
  </tr>
))}

                {/* Grouped stats */}
                {STAT_GROUPS.map((group) => (
                  <React.Fragment key={group.label}>
                    <tr className="bg-gray-200">
                      <td
                        className="border px-2 py-2 text-left font-bold text-lg"
                        colSpan={validPlayers.length + 1}
                      >
                        {group.label}
                      </td>
                    </tr>
                    {group.stats.map((stat) => (
  <tr key={stat}>
    <td className="bg-blue-600 text-white font-bold border px-2 py-1 text-center">
      {stat}
    </td>
    {validPlayers.map((p) => {
      const val =
        p.stats.Quickness?.[stat] ||
        p.stats.Physical?.[stat] ||
        p.stats.Mental?.[stat] ||
        p.stats.Passing?.[stat] ||
        p.stats.Receiving?.[stat] ||
        p.stats.Rushing?.[stat] ||
        p.stats.Blocking?.[stat] ||
        p.stats.Coverage?.[stat] ||
        p.stats["Pass Rush"]?.[stat] ||
        p.stats["Run Stop"]?.[stat] ||
        p.stats.Kicking?.[stat] ||
        p.stats.Returning?.[stat] ||
        "N/A";
      return (
        <td
          key={p.id}
          className={`border px-2 py-1 text-center ${getHighlightClass(stat, val)}`}
        >
          {val}
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
      </div>
    </div>
  );
}
