import React, { useState } from "react";
import { Shield, Trophy } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const defensiveScenarios = [
  {
    title: "1st Down",
    description: "Defensive plays ranked by collected interception results on 1st down.",
    rows: [
      { rank: 1, play: "Cover 6", interceptions: 25, type: "Zone Coverage", formation: "Multiple" },
      { rank: 2, play: "Cover 2", interceptions: 21, type: "Zone Coverage", formation: "Multiple" },
      { rank: 2, play: "Cover 2 Man", interceptions: 21, type: "Man Coverage", formation: "Multiple" },
      { rank: 2, play: "Cover 4", interceptions: 21, type: "Zone Coverage", formation: "Multiple" },
      { rank: 5, play: "Cov 3 Contain", interceptions: 18, type: "Zone Coverage", formation: "Quarter" },
      { rank: 6, play: "Cover 3", interceptions: 17, type: "Zone Coverage", formation: "Multiple" },
      { rank: 7, play: "Cover 3 Buzz Press", interceptions: 14, type: "Zone Coverage", formation: "4-3" },
      { rank: 8, play: "Cover 3 Sky", interceptions: 12, type: "Zone Coverage", formation: "Multiple" },
      { rank: 9, play: "Overload 3 Press", interceptions: 9, type: "Zone Coverage", formation: "Dime" },
      { rank: 9, play: "Sam Blitz 2", interceptions: 9, type: "Zone Coverage", formation: "4-3" },
    ],
  },
  {
    title: "2nd Down & Short",
    description: "Second down with 0-3 yards to go.",
    rows: [
      { rank: 1, play: "Corner Blitz 3", interceptions: 2, type: "Zone Coverage", formation: "Multiple" },
      { rank: 1, play: "2 Man Press", interceptions: 2, type: "Man Coverage", formation: "Multiple" },
      { rank: 3, play: "Cover 6", interceptions: 1, type: "Zone Coverage", formation: "Multiple" },
      { rank: 3, play: "Cover 3 Sky", interceptions: 1, type: "Zone Coverage", formation: "Multiple" },
    ],
  },
  {
    title: "3rd Down & Medium",
    description: "Third down situations where coverage balance can matter more than pressure alone.",
    rows: [
      { rank: 1, play: "Cover 2 Man", interceptions: 8, type: "Man Coverage", formation: "Multiple" },
      { rank: 2, play: "Cover 4", interceptions: 6, type: "Zone Coverage", formation: "Multiple" },
      { rank: 3, play: "Cover 6", interceptions: 5, type: "Zone Coverage", formation: "Multiple" },
      { rank: 4, play: "Sam Blitz 2", interceptions: 4, type: "Zone Coverage", formation: "4-3" },
    ],
  },
];

export default function DefensiveStrategy() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeScenario, setActiveScenario] = useState(defensiveScenarios[0].title);
  const activeData = defensiveScenarios.find((scenario) => scenario.title === activeScenario) ?? defensiveScenarios[0];

  const pageBg = isDark ? "#18181B" : "#f9fafb";
  const textColor = isDark ? "#f5f5f5" : "#111827";
  const mutedText = isDark ? "#cbd5e1" : "#4b5563";
  const panelBg = isDark ? "#27272a" : "#ffffff";
  const borderColor = isDark ? "#334155" : "#d1d5db";
  const headerBg = isDark ? "#1f2937" : "#eef2f7";
  const rowBg = isDark ? "#18181B" : "#ffffff";
  const altRowBg = isDark ? "#202026" : "#f8fafc";

  return (
    <main style={{ minHeight: "100vh", backgroundColor: pageBg, color: textColor, padding: "2rem 1rem 3rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <header style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <Shield size={34} color="#facc15" />
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1 }}>
              Defensive Strategy
            </h1>
          </div>
          <p style={{ maxWidth: "900px", color: mutedText, fontSize: "1.05rem", lineHeight: 1.7 }}>
            View collected defensive play data by game scenario. Rankings are based on how many interceptions each play
            generated in the submitted data set. These results are meant as guidance, not a guarantee that a play is the
            best choice for every in-game situation.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {defensiveScenarios.map((scenario) => {
            const isActive = scenario.title === activeScenario;
            const topPlay = scenario.rows[0];
            return (
              <button
                key={scenario.title}
                type="button"
                onClick={() => setActiveScenario(scenario.title)}
                style={{
                  border: `1px solid ${isActive ? "#facc15" : borderColor}`,
                  borderRadius: "0.5rem",
                  backgroundColor: isActive ? (isDark ? "#3f3213" : "#fef3c7") : panelBg,
                  color: textColor,
                  cursor: "pointer",
                  padding: "1rem",
                  textAlign: "left",
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: "0.35rem" }}>{scenario.title}</div>
                <div style={{ color: mutedText, fontSize: "0.88rem" }}>
                  Leader: {topPlay.play} ({topPlay.interceptions} INTs)
                </div>
              </button>
            );
          })}
        </section>

        <section style={{ border: `1px solid ${borderColor}`, borderRadius: "0.65rem", backgroundColor: panelBg, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "1rem 1.25rem", borderBottom: `1px solid ${borderColor}` }}>
            <Trophy size={22} color="#facc15" />
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>{activeData.title}</h2>
              <p style={{ color: mutedText, fontSize: "0.92rem" }}>{activeData.description}</p>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: "760px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: headerBg }}>
                  {["Rank", "Play Name", "# of Interceptions", "Play Type", "Formation"].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        borderBottom: `1px solid ${borderColor}`,
                        padding: "0.85rem",
                        textAlign: heading === "Play Name" ? "left" : "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeData.rows.map((row, index) => (
                  <tr key={`${row.rank}-${row.play}`} style={{ backgroundColor: index % 2 === 0 ? rowBg : altRowBg }}>
                    <td style={{ borderBottom: `1px solid ${borderColor}`, padding: "0.85rem", textAlign: "center", fontWeight: 800 }}>
                      {row.rank}
                    </td>
                    <td style={{ borderBottom: `1px solid ${borderColor}`, padding: "0.85rem", fontWeight: 700 }}>
                      {row.play}
                    </td>
                    <td style={{ borderBottom: `1px solid ${borderColor}`, padding: "0.85rem", textAlign: "center" }}>
                      {row.interceptions}x
                    </td>
                    <td style={{ borderBottom: `1px solid ${borderColor}`, padding: "0.85rem", textAlign: "center" }}>
                      {row.type}
                    </td>
                    <td style={{ borderBottom: `1px solid ${borderColor}`, padding: "0.85rem", textAlign: "center" }}>
                      {row.formation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

