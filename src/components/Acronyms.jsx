import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ACRONYMS = [
  { term: "MM", definition: "Madden Mobile" },
  { term: "MM26", definition: "Madden Mobile 26 (the current season)" },
  { term: "OVR", definition: "Overall — a player's overall rating" },
  { term: "OG", definition: "Original / Also refers to the Offensive Guard position" },
  { term: "F2P", definition: "Free to Play — players who do not spend real money" },
  { term: "P2W", definition: "Pay to Win — spending real money for competitive advantage" },
  { term: "CC", definition: "Content Creator" },
  { term: "MOTD", definition: "Message of the Day — daily in-game message with rewards or news" },
  { term: "STT", definition: "Season Team Training — a game mode for upgrading players" },
  { term: "TTP", definition: "Team Training Points — currency earned in STT" },
  { term: "H2H", definition: "Head to Head — playing directly against another user" },
  { term: "LvL", definition: "League vs. League — a competitive league game mode" },
  { term: "FP", definition: "Field Pass — a seasonal progression reward track" },
  { term: "SP", definition: "Spotlight Pass — a limited-time event pass" },
  { term: "PA", definition: "Play Action — a passing play that fakes a handoff" },
  { term: "TOTW", definition: "Team of the Week — weekly promo featuring real NFL performers" },
  { term: "TOTY", definition: "Team of the Year — end-of-year promo featuring top players" },
  { term: "EVO", definition: "Evolution — upgrading a player card to a higher version" },
  { term: "OL", definition: "Offensive Line (OT, OG, C combined)" },
  { term: "DL", definition: "Defensive Line (DE, DT combined)" },
  { term: "LB", definition: "Linebacker" },
  { term: "MLB", definition: "Middle Linebacker" },
  { term: "OT", definition: "Offensive Tackle" },
  { term: "C", definition: "Center" },
  { term: "QB", definition: "Quarterback" },
  { term: "HB", definition: "Halfback / Running Back" },
  { term: "FB", definition: "Fullback" },
  { term: "WR", definition: "Wide Receiver" },
  { term: "TE", definition: "Tight End" },
  { term: "CB", definition: "Cornerback" },
  { term: "S", definition: "Safety" },
  { term: "DE", definition: "Defensive End" },
  { term: "DT", definition: "Defensive Tackle" },
  { term: "K", definition: "Kicker" },
  { term: "P", definition: "Punter" },
  { term: "KR", definition: "Kick Returner" },
  { term: "PR", definition: "Punt Returner" },
  { term: "SPD", definition: "Speed — player attribute" },
  { term: "ACC", definition: "Acceleration — player attribute" },
  { term: "STR", definition: "Strength — player attribute" },
  { term: "AGI", definition: "Agility — player attribute" },
  { term: "AWR", definition: "Awareness — player attribute" },
  { term: "CTH", definition: "Catching — player attribute" },
  { term: "CIT", definition: "Catch in Traffic — player attribute" },
  { term: "SPC", definition: "Spectacular Catch — player attribute" },
  { term: "RTE", definition: "Route Running — player attribute" },
  { term: "RLS", definition: "Release — player attribute" },
  { term: "THP", definition: "Throw Power — player attribute" },
  { term: "TAS", definition: "Throw Accuracy Short — player attribute" },
  { term: "TAM", definition: "Throw Accuracy Mid — player attribute" },
  { term: "TAD", definition: "Throw Accuracy Deep — player attribute" },
  { term: "TOR", definition: "Throw on the Run — player attribute" },
  { term: "PAC", definition: "Play Action — player attribute" },
  { term: "TRK", definition: "Trucking — player attribute" },
  { term: "ELS", definition: "Elusiveness — player attribute" },
  { term: "BCV", definition: "Ball Carrier Vision — player attribute" },
  { term: "SFA", definition: "Stiff Arm — player attribute" },
  { term: "SPM", definition: "Spin Move — player attribute" },
  { term: "JKM", definition: "Juke Move — player attribute" },
  { term: "CAR", definition: "Carrying — player attribute" },
  { term: "RBK", definition: "Run Block — player attribute" },
  { term: "PBK", definition: "Pass Block — player attribute" },
  { term: "IMP", definition: "Impact Blocking — player attribute" },
  { term: "TAK", definition: "Tackle — player attribute" },
  { term: "POW", definition: "Hit Power — player attribute" },
  { term: "PWM", definition: "Power Move — player attribute" },
  { term: "FNM", definition: "Finesse Move — player attribute" },
  { term: "BKS", definition: "Block Shedding — player attribute" },
  { term: "PUR", definition: "Pursuit — player attribute" },
  { term: "PRC", definition: "Play Recognition — player attribute" },
  { term: "MCV", definition: "Man Coverage — player attribute" },
  { term: "ZCV", definition: "Zone Coverage — player attribute" },
  { term: "PRS", definition: "Press — player attribute" },
  { term: "KPW", definition: "Kick Power — player attribute" },
  { term: "KAC", definition: "Kick Accuracy — player attribute" },
  { term: "KR (stat)", definition: "Kick Return — player attribute" },
];

const CATEGORIES = ["All", "General", "Game Modes", "Positions", "Attributes"];

const categoryMap = {
  General: ["MM", "MM26", "OVR", "OG", "F2P", "P2W", "CC", "MOTD", "EVO", "OL", "DL"],
  "Game Modes": ["STT", "TTP", "H2H", "LvL", "FP", "SP", "PA", "TOTW", "TOTY"],
  Positions: ["QB", "HB", "FB", "WR", "TE", "OT", "OG", "C", "DE", "DT", "LB", "MLB", "CB", "S", "K", "P", "KR", "PR"],
  Attributes: ["SPD", "ACC", "STR", "AGI", "AWR", "CTH", "CIT", "SPC", "RTE", "RLS", "THP", "TAS", "TAM", "TAD", "TOR", "PAC", "TRK", "ELS", "BCV", "SFA", "SPM", "JKM", "CAR", "RBK", "PBK", "IMP", "TAK", "POW", "PWM", "FNM", "BKS", "PUR", "PRC", "MCV", "ZCV", "PRS", "KPW", "KAC", "KR (stat)"],
};

export default function Acronyms() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = ACRONYMS.filter((a) => {
    const matchesCategory =
      activeCategory === "All" || (categoryMap[activeCategory] && categoryMap[activeCategory].includes(a.term));
    const matchesSearch =
      a.term.toLowerCase().includes(search.toLowerCase()) ||
      a.definition.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={isDark ? "p-6 min-h-screen bg-[#18181B] text-gray-100" : "p-6 min-h-screen bg-gray-50 text-gray-900"}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Acronyms & Abbreviations</h1>
        <p className={isDark ? "text-center mb-6 text-gray-400" : "text-center mb-6 text-gray-600"}>
          A reference guide to commonly used Madden Mobile terms and abbreviations.
        </p>

        <input
          type="text"
          placeholder="Search acronyms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={isDark ? "w-full mb-6 px-4 py-2 rounded-lg border border-gray-600 bg-zinc-800 text-gray-100 outline-none" : "w-full mb-6 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 outline-none"}
        />

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={activeCategory === cat
                ? "px-4 py-2 rounded-lg font-medium bg-blue-500 text-white"
                : isDark
                ? "px-4 py-2 rounded-lg font-medium bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                : "px-4 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={isDark ? "rounded-lg overflow-hidden border border-gray-700" : "rounded-lg overflow-hidden border border-gray-200 shadow-md"}>
          <table className="w-full text-sm">
            <thead>
              <tr className={isDark ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-700"}>
                <th className="text-left px-4 py-3 font-bold w-1/4">Acronym</th>
                <th className="text-left px-4 py-3 font-bold">Definition</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={2} className={isDark ? "px-4 py-6 text-center text-gray-400" : "px-4 py-6 text-center text-gray-500"}>
                    No results found.
                  </td>
                </tr>
              ) : (
                filtered.map((a, i) => (
                  <tr
                    key={a.term}
                    className={i % 2 === 0
                      ? isDark ? "bg-zinc-800" : "bg-white"
                      : isDark ? "bg-zinc-900" : "bg-gray-50"}
                  >
                    <td className={isDark ? "px-4 py-3 font-bold text-blue-400" : "px-4 py-3 font-bold text-blue-600"}>
                      {a.term}
                    </td>
                    <td className={isDark ? "px-4 py-3 text-gray-300" : "px-4 py-3 text-gray-700"}>
                      {a.definition}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className={isDark ? "text-center mt-4 text-xs text-gray-500" : "text-center mt-4 text-xs text-gray-400"}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}