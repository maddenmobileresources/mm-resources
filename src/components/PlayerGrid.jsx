import React from "react";
import { Link } from "react-router-dom";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function PlayerGrid({
  // filters + setters
  search, setSearch,
  teamFilter, setTeamFilter,
  programFilter, setProgramFilter,
  rarityFilter, setRarityFilter,
  archetypeFilter, setArchetypeFilter,
  minOvr, setMinOvr,
  maxOvr, setMaxOvr,
  minHeight, setMinHeight,
  minWeight, setMinWeight,
  statFilters, updateStatFilter, addStatFilter, removeStatFilter,

  // players
  filteredPlayers,
  selectedPlayers, togglePlayer,
}) {
  return (
    <div className="p-4">
      {/* 🔍 Search + Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="border p-2 rounded">
          <option>All</option>
          {/* TODO: populate team options dynamically */}
        </select>
        <select value={programFilter} onChange={(e) => setProgramFilter(e.target.value)} className="border p-2 rounded">
          <option>All</option>
          {/* TODO: populate program options dynamically */}
        </select>
        <select value={rarityFilter} onChange={(e) => setRarityFilter(e.target.value)} className="border p-2 rounded">
          <option>All</option>
          <option>Common</option>
          <option>Rare</option>
          <option>Epic</option>
          <option>Iconic</option>
        </select>
        <select value={archetypeFilter} onChange={(e) => setArchetypeFilter(e.target.value)} className="border p-2 rounded">
          <option>All</option>
          {/* TODO: populate archetypes dynamically */}
        </select>
        <input
          type="number"
          placeholder="Min OVR"
          value={minOvr}
          onChange={(e) => setMinOvr(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max OVR"
          value={maxOvr}
          onChange={(e) => setMaxOvr(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min Height (in)"
          value={minHeight}
          onChange={(e) => setMinHeight(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min Weight (lbs)"
          value={minWeight}
          onChange={(e) => setMinWeight(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* 📊 Stat Filters */}
      <div className="mb-6">
        {statFilters.map((filter, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              value={filter.stat}
              onChange={(e) => updateStatFilter(index, "stat", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Stat</option>
              <option value="speed">Speed</option>
              <option value="strength">Strength</option>
              {/* TODO: add more stats */}
            </select>
            <select
              value={filter.operator}
              onChange={(e) => updateStatFilter(index, "operator", e.target.value)}
              className="border p-2 rounded"
            >
              <option value=">=">=</option>
              <option value="<=">{"<="}</option>
            </select>
            <input
              type="number"
              value={filter.value}
              onChange={(e) => updateStatFilter(index, "value", e.target.value)}
              className="border p-2 rounded"
            />
            <button onClick={() => removeStatFilter(index)} className="bg-red-500 text-white px-2 rounded">
              ✕
            </button>
          </div>
        ))}
        <button onClick={addStatFilter} className="bg-blue-500 text-white px-3 py-1 rounded">
          ➕ Add Stat Filter
        </button>
      </div>

      {/* 🏈 Player Grid */}
      <Droppable droppableId="playerGrid" direction="horizontal">
        {(provided) => (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredPlayers.map((player, index) => (
              <Draggable key={player.id} draggableId={player.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="border p-2 rounded shadow bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedPlayers.some((p) => p.id === player.id)}
                          onChange={() => togglePlayer(player)}
                        />
                        Compare
                      </label>
                      <Link to={`/player/${player.id}`} className="text-blue-500 underline">
                        View
                      </Link>
                    </div>
                    <h3 className="font-bold">{player.name}</h3>
                    <p>{player.team}</p>
                    <p>{player.ovr} OVR</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* 📈 Comparison Table */}
      {selectedPlayers.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-xl font-bold mb-2">Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Team</th>
                  <th className="border px-2 py-1">OVR</th>
                  <th className="border px-2 py-1">Height</th>
                  <th className="border px-2 py-1">Weight</th>
                </tr>
              </thead>
              <tbody>
                {selectedPlayers.map((player) => (
                  <tr key={player.id}>
                    <td className="border px-2 py-1">{player.name}</td>
                    <td className="border px-2 py-1">{player.team}</td>
                    <td className="border px-2 py-1">{player.ovr}</td>
                    <td className="border px-2 py-1">{player.height}"</td>
                    <td className="border px-2 py-1">{player.weight} lbs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
