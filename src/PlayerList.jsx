import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useCompare } from "./CompareContext";

export default function PlayerList() {
  const {
    compareList: contextCompareList,
    removeFromCompare,
    clearCompare,
    getShareableURL,
    setCompareList,
  } = useCompare();

  const [compareList, setLocalCompareList] = useState(contextCompareList);

  const parseStatValue = (val) => {
    if (!val) return null;
    const num = parseInt(val.toString().replace(/[^0-9]/g, ""));
    return isNaN(num) ? null : num;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(compareList);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setLocalCompareList(reordered);
    setCompareList(reordered);
  };

  if (compareList.length === 0)
    return (
      <p>
        No players selected. Go to <a href="/players">Player Database</a> to add some.
      </p>
    );

  // Collect categories dynamically
  const statCategories = Object.fromEntries(
    Object.keys(compareList[0].stats).map((cat) => [
      cat,
      Array.from(
        new Set(compareList.flatMap((p) => Object.keys(p.stats[cat] || {})))
      ),
    ])
  );

  const copyLink = () => {
    const url = getShareableURL();
    navigator.clipboard.writeText(url);
    alert("Shareable link copied to clipboard!");
  };

  return (
    <div className="comparison-page">
      <h1>Player Comparison</h1>
      <button onClick={clearCompare}>Clear All</button>
      <button onClick={copyLink}>Copy Shareable Link</button>

      <div className="compare-table-wrapper">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="table-scroll-container">
            <table className="compare-table">
              <thead>
                <Droppable droppableId="players" direction="horizontal">
                  {(provided) => (
                    <tr {...provided.droppableProps} ref={provided.innerRef}>
                      <th className="sticky-header">Stat</th>
                      {compareList.map((p, index) => (
                        <Draggable
                          key={p.id}
                          draggableId={p.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <th
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="sticky-header"
                            >
                              <div className="player-col">
                                <img src={p.image} alt={p.name} />
                                <h3>{p.name}</h3>
                                <p>
                                  {p.position} | {p.team}
                                </p>
                                <button onClick={() => removeFromCompare(p.id)}>
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
                    <tr className="category-row">
                      <td colSpan={compareList.length + 1}>{category}</td>
                    </tr>

                    {stats.map((stat) => {
                      const values = compareList.map((p) =>
                        parseStatValue(p.stats[category]?.[stat])
                      );
                      const numericValues = values.filter((v) => v !== null);
                      const max = Math.max(...numericValues);
                      const min = Math.min(...numericValues);

                      return (
                        <tr key={stat}>
                          <td className="stat-label">{stat}</td>
                          {compareList.map((p, i) => {
                            const val = p.stats[category]?.[stat] ?? "-";
                            const num = values[i];
                            let cellClass = "";
                            if (num !== null) {
                              if (num === max) cellClass = "highlight-max";
                              else if (num === min) cellClass = "highlight-min";
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
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
