import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTheme } from "./context/ThemeContext";
import PlayerComments from "./PlayerComments";

const playTypeColors = {
  "Run": "#54a354ff",
  "Short Pass": "#835499ff",
  "Long Pass": "#4e7199ff",
  "Play Action": "#8f694fff"
};

const STAT_LABELS = [
  { label: "Type", key: "type" },
  { label: "Playbook Budget", key: "pbb" },
  { label: "Cost", key: "cost" },
  { label: "OVR Boost", key: "ovrBoost" },
  { label: "Play Count", key: "playCount" },
  { label: "Average Yards", key: "averageYards" }
];

export default function PlayProfile({
  plays,
  selectedPlays = [],
  togglePlay,
  setSelectedPlays
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const play = plays?.find((p) => p.id === parseInt(id, 10));
  const { theme } = useTheme();
  const [showLimitModal, setShowLimitModal] = React.useState(false);

  if (!play) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Play not found</h2>
        <Link
          to="/plays"
          className="inline-block mt-[-8px] mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          ← Back to Play Database
        </Link>
      </div>
    );
  }

  const validPlays = Array.isArray(selectedPlays)
    ? selectedPlays.filter((p) => p && p.id !== undefined && p.id !== null)
    : [];

  const handleTogglePlay = (play) => {
    const isSelected = validPlays.some((p) => p.id === play.id);
    if (!isSelected && validPlays.length >= 5) {
      setShowLimitModal(true);
      return;
    }
    togglePlay?.(play);
  };

  const getHighlightClass = (key, value) => {
    if (!Array.isArray(selectedPlays) || selectedPlays.length < 2) return "";

    const values = selectedPlays
      .filter((p) => p && p[key] !== undefined)
      .map((p) => {
        if (key === "type" || key === "pbb") {
          return null;
        }
        return p[key];
      })
      .filter((v) => v !== null && v !== undefined);

    if (values.length < 2) return "";

    const sorted = [...new Set(values)].sort((a, b) => b - a);
    const isBest = value === sorted[0];
    const isWorst = value === sorted[sorted.length - 1];

    if (isBest) return "bg-green-200 dark:bg-green-900";
    if (isWorst) return "bg-red-200 dark:bg-red-900";
    return "bg-yellow-200 dark:bg-yellow-900";
  };

  const getPlayCompareHighlightClass = (values, currentValue) => {
    if (values.length <= 1) return "";
    const sortedUnique = [...new Set(values)].sort((a, b) => b - a);
    if (currentValue === sortedUnique[0]) return "bg-green-200 text-gray-900";
    if (currentValue === sortedUnique[sortedUnique.length - 1]) return "bg-red-200 text-gray-900";
    return "bg-yellow-200 text-gray-900";
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (!Array.isArray(selectedPlays)) return;
    const reordered = Array.from(selectedPlays);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSelectedPlays?.(reordered);
  };

  const borderColor = theme === 'dark' ? '#64748b' : '#d1d5db';

  const PlayComparisonTable = () => (
    <div className={`p-4 rounded border ${theme === 'dark' ? 'bg-zinc-800 border-slate-700' : 'bg-transparent border-green-500'}`}>
      <h3 className="text-lg font-bold mb-2 dark:text-white">Play Comparison</h3>
      <div className="play-compare-scroll overflow-x-auto">
        <table className={`play-compare-table play-compare-count-${validPlays.length} table-fixed w-full text-sm border-collapse text-center`}>
          <colgroup>
            <col className="play-compare-stat-col" />
            {validPlays.map((p) => (
              <col key={p.id} className="play-compare-play-col" />
            ))}
          </colgroup>
          <thead>
            <tr className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"}>
              <th className={`border px-2 py-1 w-[20%] ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                Stat
              </th>
              {validPlays.map((p) => (
                <th
                  key={p.id}
                  className="play-compare-header-cell border px-2 py-1 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: playTypeColors[p.type] || (theme === "dark" ? "#3f3f46" : "#ffffff"),
                    borderColor: theme === "dark" ? "#4b5563" : "#d1d5db"
                  }}
                  onClick={() => navigate(`/play/${p.id}`)}
                >
                  <div className="play-compare-header-content flex flex-col items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-14 w-auto object-contain mb-2"
                    />
                    <div className="flex justify-center items-center gap-2 w-full">
                      <span className="font-semibold text-white">{p.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePlay(p);
                        }}
                        className="text-red-500 font-bold hover:text-red-700"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                Type
              </td>
              {validPlays.map((p) => (
                <td key={p.id} className={`border px-2 py-1 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                  {p.type}
                </td>
              ))}
            </tr>
            <tr>
              <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                Playbook Budget
              </td>
              {validPlays.map((p) => {
                const values = validPlays.map((play) => play.pbb);
                const highlightClass = getPlayCompareHighlightClass(values, p.pbb);
                return (
                  <td key={p.id} className={`play-compare-value-cell border px-2 py-1 ${highlightClass} ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {p.pbb}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                Cost
              </td>
              {validPlays.map((p) => {
                const values = validPlays.map((play) => play.cost);
                const highlightClass = getPlayCompareHighlightClass(values, p.cost);
                return (
                  <td key={p.id} className={`play-compare-value-cell border px-2 py-1 ${highlightClass} ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {p.cost.toLocaleString()} Play Tokens
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                OVR Boost
              </td>
              {validPlays.map((p) => {
                const values = validPlays.map((play) => play.ovrBoost);
                const highlightClass = getPlayCompareHighlightClass(values, p.ovrBoost);
                return (
                  <td key={p.id} className={`border px-2 py-1 ${highlightClass} ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    +{p.ovrBoost}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                Play Count
              </td>
              {validPlays.map((p) => {
                const values = validPlays.map((play) => play.playCount);
                const highlightClass = getPlayCompareHighlightClass(values, p.playCount);
                return (
                  <td key={p.id} className={`border px-2 py-1 ${highlightClass} ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {p.playCount}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                Average Yards
              </td>
              {validPlays.map((p) => {
                const values = validPlays.map((play) => play.averageYards);
                const highlightClass = getPlayCompareHighlightClass(values, p.averageYards);
                return (
                  <td key={p.id} className={`border px-2 py-1 ${highlightClass} ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                    {p.averageYards}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      {showLimitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-md w-full mx-4 ${
            theme === "dark" ? "bg-zinc-800 text-gray-100" : "bg-white text-gray-900"
          }`}>
            <h2 className="text-xl font-bold mb-4">localhost:5173 says</h2>
            <p className="mb-6">You can only compare up to 5 plays at once.</p>
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
      
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="w-full lg:w-5/12 mb-6 lg:mb-0">
          <Link
            to="/plays"
            className="inline-block mt-[-8px] mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            ← Back to Play Database
          </Link>

          <div className="flex gap-4 items-start">
            <div className="flex flex-col">
              <img
                src={play.image}
                alt={play.name}
                className={`w-64 h-64 object-contain rounded mb-4 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}
              />
              <button
                onClick={() => handleTogglePlay(play)}
                className={`px-4 py-2 rounded ${
                  validPlays.some((p) => p.id === play.id)
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {validPlays.some((p) => p.id === play.id)
                  ? "Remove from Comparison"
                  : "Add to Comparison"}
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">{play.name}</h2>
              <div className="space-y-2">
                <p><strong>Type:</strong> {play.type}</p>
                <p><strong>Playbook Budget:</strong> {play.pbb}</p>
                <p><strong>Cost:</strong> {play.cost.toLocaleString()} Play Tokens</p>
                <p><strong>OVR Boost:</strong> +{play.ovrBoost}</p>
                <p><strong>Obtainable via:</strong> {play.obtainable}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
  <h3 className="text-xl font-bold mb-2">Stats</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Play Count:</strong> {play.playCount}</li>
              <li><strong>Average Yards:</strong> {play.averageYards}</li>
            </ul>
          </div>

          <PlayerComments playerId={`play-${play.id}`} />
        </div>

        <div className="w-full lg:w-7/12 flex flex-col gap-6">
          <div 
            className={`p-4 rounded border ${theme === 'dark' ? 'bg-zinc-800 border-slate-700' : 'bg-white border-blue-500'}`}
          >
            <h2 className="text-xl font-bold mb-2 dark:text-white">Comparison Panel</h2>
            {validPlays.length === 0 ? (
              <p className="dark:text-gray-400">No plays selected yet.</p>
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="compare-panel">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {validPlays.map((p, index) => {
                        const bgColor = playTypeColors[p.type] || "#ffffff";
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
                                style={{
                                  backgroundColor: bgColor,
                                  ...provided.draggableProps.style
                                }}
                                className="p-2 mb-2 rounded flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => navigate(`/play/${p.id}`)}
                              >
                                <div className="flex items-center gap-3">
                                  <img 
                                    src={p.image} 
                                    alt={p.name} 
                                    className={`w-12 h-12 object-contain rounded ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`} 
                                  />
                                  <div>
                                    <div className="font-semibold text-black">{p.name}</div>
                                    <div className="text-xs text-gray-900">
                                      {p.type} • {p.pbb} PBB • {p.cost.toLocaleString()} Play Tokens • +{p.ovrBoost} OVR
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTogglePlay(p);
                                  }}
                                  className="text-red-500 font-bold hover:text-red-700"
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

          {validPlays.length > 0 && <PlayComparisonTable />}

          {false && validPlays.length > 0 && (
            <div className={`p-4 rounded border overflow-x-auto ${theme === 'dark' ? 'bg-zinc-800 border-slate-700' : 'bg-transparent border-green-500'}`}>
              <h3 className="text-lg font-bold mb-2 dark:text-white">Play Comparison</h3>
              <table className="table-fixed w-full text-sm border-collapse border" style={{ borderColor }}>
                <thead>
                  <tr>
                    <th className={`border p-1 w-35 ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`} style={{ borderColor }}>Stat</th>
                    {validPlays.map((p) => {
                      const bgColor = playTypeColors[p.type] || "#ffffff";
                      return (
                        <th 
                          key={p.id} 
                          className="border p-2 text-center"
                          style={{ 
                            width: `${100 / validPlays.length}%`, 
                            borderColor,
                            backgroundColor: bgColor
                          }}
                        >
                          <div 
                            className="flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:opacity-90 transition-opacity relative"
                            onClick={() => navigate(`/play/${p.id}`)}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTogglePlay(p);
                              }}
                              className="absolute top-0 right-0 text-red-500 font-bold hover:text-red-700 text-lg"
                            >
                              ✕
                            </button>
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className={`w-16 h-16 object-contain rounded ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`} 
                            />
                            <span className="font-semibold text-xs text-black">{p.name}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {STAT_LABELS.map((stat) => (
                    <tr key={stat.key}>
                      <td className={`font-bold border px-2 py-1 text-center ${theme === 'dark' ? 'bg-[#155dfc] text-white' : 'bg-blue-600 text-white'}`} style={{ borderColor }}>
                        {stat.label}
                      </td>
                      {validPlays.map((p) => {
                        let value = p[stat.key];
                        let displayValue = value;
                        
                        if (stat.key === "cost") {
                          displayValue = value?.toLocaleString() ? `${value.toLocaleString()} Play Tokens` : "-";
                        } else if (stat.key === "ovrBoost") {
                          displayValue = `+${value}`;
                        }
                        
                        const highlightClass = stat.key !== "type" && stat.key !== "pbb" 
                          ? getHighlightClass(stat.key, value) 
                          : "";
                        const hasHighlight = highlightClass !== "";

                        return (
                          <td
                            key={p.id}
                            className={`border px-2 py-1 text-center ${highlightClass} ${
                              theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                            } ${hasHighlight ? 'text-black dark:text-white' : validPlays.length === 1 ? (theme === 'dark' ? 'text-white' : 'text-black') : ''}`}
                            style={{ borderColor }}
                          >
                            {displayValue}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
