import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import players from "../data/MM26PlayerDatabase";

export default function ThemeTeams() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [showMultipleModal, setShowMultipleModal] = useState(false);
  const [selectedThemes, setSelectedThemes] = useState([]);

  const themeTeams = [
    // Program-based Theme Teams
    { category: "Program", name: "Preseason", subtitle: "Field Pass Theme Team", image: "https://i.imgur.com/YuA9VXx.png" },
    { category: "Program", name: "Opening Drive", subtitle: "Promo Theme Team", image: "https://i.imgur.com/vduOlkZ.png" },
    { category: "Program", name: "Team of the Week", subtitle: "Program Theme Team", image: "https://i.imgur.com/ZWvpzBF.png" },
    { category: "Program", name: "Campus Heroes", subtitle: "Promo Theme Team", image: "https://i.imgur.com/CKhkDvF.png" },
    { category: "Program", name: "NFL Kickoff", subtitle: "Promo Theme Team", image: "https://i.imgur.com/xVylSSq.png" },
    { category: "Program", name: "Back to the Gridiron", subtitle: "Field Pass Theme Team", image: "https://i.imgur.com/mEyFbaQ.png" },
    { category: "Program", name: "Legends", subtitle: "Promo Theme Team", image: "https://i.imgur.com/NqtM3MH.png" },
    { category: "Program", name: "International", subtitle: "Promo Theme Team", image: "https://i.imgur.com/qMYantA.png" },
    { category: "Program", name: "Field of Fear", subtitle: "Field Pass Theme Team", image: "https://i.imgur.com/zi0chNX.png" },
    { category: "Program", name: "Most Feared", subtitle: "Promo Theme Team", image: "https://i.imgur.com/64e6Xhh.png" },
    { category: "Program", name: "Breakouts", subtitle: "Promo Theme Team", image: "https://i.imgur.com/JQ7ibja.png" },
    { category: "Program", name: "Autumn Blitz", subtitle: "Field Pass Theme Team", image: "https://i.imgur.com/YIjzm6S.png" },
    { category: "Program", name: "Feast", subtitle: "Promo Theme Team", image: "https://i.imgur.com/LAL0rGf.png" },
    { category: "Program", name: "GOAT", subtitle: "Promo Theme Team", image: "https://i.imgur.com/EbS12LB.png" },
    { category: "Program", name: "Arctic Blitz", subtitle: "Field Pass Theme Team", image: "https://i.imgur.com/y3Dxcv8.png" },
    { category: "Program", name: "Ultimate Freeze", subtitle: "Promo Theme Team", image: "https://i.imgur.com/JBPnW1Z.png" },
    { category: "Program", name: "What If", subtitle: "Promo Theme Team", image: "https://i.imgur.com/xYaIzTS.png" },
    { category: "Program", name: "Championship Run", subtitle: "Field Pass Theme Team", image: "https://i.imgur.com/poNNVjw.png" },
    { category: "Program", name: "Collector's Series", subtitle: "Promo Theme Team", image: "https://i.imgur.com/CsV2nGA.png" },
    { category: "Program", name: "Super Bowl", subtitle: "Promo Theme Team", image: "https://i.imgur.com/bDojkkj.png" },
    { category: "Program", name: "Glory Road", subtitle: "Field Pass Theme Team", image: "https://i.imgur.com/Ad7qqEg.png" },
    { category: "Program", name: "Team Diamonds", subtitle: "Program Theme Team", image: "https://i.imgur.com/jLOUT7G.png" },
    { category: "Program", name: "Fan Favorites", subtitle: "Promo Theme Team", image: "https://i.imgur.com/PpKa3YP.png" },
    { category: "Program", name: "Team of the Year I", subtitle: "Promo Theme Team", image: "https://i.imgur.com/n5vRbOr.png" },
    { category: "Program", name: "Free Agency", subtitle: "Field Pass Theme Team", image: "https://i.imgur.com/wKcM1eP.png" },
    { category: "Program", name: "Team of the Year II", subtitle: "Promo Theme Team", image: "https://i.imgur.com/7k9PddS.png" },
    { category: "Program", name: "Sugar Rush", subtitle: "Promo Theme Team", image: "https://i.imgur.com/WXScWSa_d.webp?maxwidth=760&fidelity=grand" },
    { category: "Program", name: "Future Stars", subtitle: "Field Pass Theme Team", image: "https://i.imgur.com/EXRhu7t.png" },
    { category: "Program", name: "NFL Draft", subtitle: "Promo Theme Team", image: "https://i.imgur.com/i7D6yrv.png" },
    { category: "Program", name: "Collector's Series II", subtitle: "Promo Theme Team", image: "https://i.imgur.com/JmREXDZ.png" },
    { category: "Program", name: "Offseason", subtitle: "Field Pass Theme Team", image: "https://i.imgur.com/kIzS4my.png" },

    // NFL Teams
    { category: "Team", name: "49ers", subtitle: "San Francisco", image: "https://i.imgur.com/9xtoaXE.png", color: "#AA0000" },
    { category: "Team", name: "Bears", subtitle: "Chicago", image: "https://i.imgur.com/ak5NHbJ.png", color: "#C83803" },
    { category: "Team", name: "Bengals", subtitle: "Cincinnati", image: "https://i.imgur.com/RFcrhZU.png", color: "#FB4F14" },
    { category: "Team", name: "Bills", subtitle: "Buffalo", image: "https://i.imgur.com/tOTOudA.png", color: "#00338D" },
    { category: "Team", name: "Broncos", subtitle: "Denver", image: "https://i.imgur.com/8DFC7xq.png", color: "#FB4F14" },
    { category: "Team", name: "Browns", subtitle: "Cleveland", image: "https://i.imgur.com/iutxdaK.png", color: "#311D00" },
    { category: "Team", name: "Buccaneers", subtitle: "Tampa Bay", image: "https://i.imgur.com/ffLe7Jv.png", color: "#D50A0A" },
    { category: "Team", name: "Cardinals", subtitle: "Arizona", image: "https://i.imgur.com/pY5WeRS.png", color: "#97233F" },
    { category: "Team", name: "Chargers", subtitle: "Los Angeles", image: "https://i.imgur.com/F74HANr.png", color: "#0080C6" },
    { category: "Team", name: "Chiefs", subtitle: "Kansas City", image: "https://i.imgur.com/gILV8WC.png", color: "#E31837" },
    { category: "Team", name: "Colts", subtitle: "Indianapolis", image: "https://i.imgur.com/HoDYe0W.png", color: "#002C5F" },
    { category: "Team", name: "Commanders", subtitle: "Washington", image: "https://i.imgur.com/xdxKXV7.png", color: "#5A1414" },
    { category: "Team", name: "Cowboys", subtitle: "Dallas", image: "https://i.imgur.com/FBujMdv.png", color: "#041E42" },
    { category: "Team", name: "Dolphins", subtitle: "Miami", image: "https://i.imgur.com/vzf79eQ.png", color: "#008e97" },
    { category: "Team", name: "Eagles", subtitle: "Philadelphia", image: "https://i.imgur.com/wZQ8mKQ.png", color: "#017959" },
    { category: "Team", name: "Falcons", subtitle: "Atlanta", image: "https://i.imgur.com/sPq8iGz.png", color: "#a71930" },
    { category: "Team", name: "Giants", subtitle: "New York", image: "https://i.imgur.com/Ae55iBB.png", color: "#0B2265" },
    { category: "Team", name: "Jaguars", subtitle: "Jacksonville", image: "https://i.imgur.com/6A2fhHf.png", color: "#006778" },
    { category: "Team", name: "Jets", subtitle: "New York", image: "https://i.imgur.com/T5vCxDJ.png", color: "#125740" },
    { category: "Team", name: "Lions", subtitle: "Detroit", image: "https://i.imgur.com/9Tdognd.png", color: "#0076B6" },
    { category: "Team", name: "Packers", subtitle: "Green Bay", image: "https://i.imgur.com/TFZ22T4.png", color: "#203731" },
    { category: "Team", name: "Panthers", subtitle: "Carolina", image: "https://i.imgur.com/6m0sgjB.png", color: "#0085CA" },
    { category: "Team", name: "Patriots", subtitle: "New England", image: "https://i.imgur.com/dxnoSLC.png", color: "#002244" },
    { category: "Team", name: "Raiders", subtitle: "Las Vegas", image: "https://i.imgur.com/UswbWja.png", color: "#000000" },
    { category: "Team", name: "Rams", subtitle: "Los Angeles", image: "https://i.imgur.com/O7Nqptk.png", color: "#003594" },
    { category: "Team", name: "Ravens", subtitle: "Baltimore", image: "https://i.imgur.com/bve62ti.png", color: "#241773" },
    { category: "Team", name: "Saints", subtitle: "New Orleans", image: "https://i.imgur.com/nDgka1c.png", color: "#D3BC8D" },
    { category: "Team", name: "Seahawks", subtitle: "Seattle", image: "https://i.imgur.com/NsVDwnq.png", color: "#002244" },
    { category: "Team", name: "Steelers", subtitle: "Pittsburgh", image: "https://i.imgur.com/ubZjdpw.png", color: "#FFB612" },
    { category: "Team", name: "Texans", subtitle: "Houston", image: "https://i.imgur.com/CjBGfKG.png", color: "#a71930" },
    { category: "Team", name: "Titans", subtitle: "Tennessee", image: "https://i.imgur.com/oVUahtQ.png", color: "#4b92db" },
    { category: "Team", name: "Vikings", subtitle: "Minnesota", image: "https://i.imgur.com/PFzTtIx.png", color: "#8812e6" },

    // Divisions
    { category: "Division", name: "AFC North", subtitle: "Division Theme Team", image: "https://i.imgur.com/L1N9xXb.png", color: "#c60c32" },
    { category: "Division", name: "AFC East", subtitle: "Division Theme Team", image: "https://i.imgur.com/mFh4YFv.png", color: "#c60c32" },
    { category: "Division", name: "AFC South", subtitle: "Division Theme Team", image: "https://i.imgur.com/9Q204yU.png", color: "#c60c32" },
    { category: "Division", name: "AFC West", subtitle: "Division Theme Team", image: "https://i.imgur.com/5YLM1QQ.png", color: "#c60c32" },
    { category: "Division", name: "NFC North", subtitle: "Division Theme Team", image: "https://i.imgur.com/HUPINks.png", color: "#013369" },
    { category: "Division", name: "NFC East", subtitle: "Division Theme Team", image: "https://i.imgur.com/WhRs0pV.png", color: "#013369" },
    { category: "Division", name: "NFC South", subtitle: "Division Theme Team", image: "https://i.imgur.com/Ty1GoVe.png", color: "#013369" },
    { category: "Division", name: "NFC West", subtitle: "Division Theme Team", image: "https://i.imgur.com/gtTFkSt.png", color: "#013369" },

    // Conferences
    { category: "Conference", name: "AFC", subtitle: "Conference Theme Team", image: "https://i.imgur.com/pVwbAvV.png", color: "#c60c32" },
    { category: "Conference", name: "NFC", subtitle: "Conference Theme Team", image: "https://i.imgur.com/wH7S2ds.png", color: "#013369" },
  ];

  // ── Same mappings as ThemeTeamDetail ──────────────────────────────────────
  const nflStructure = {
    "afc-north": ["Bengals", "Browns", "Ravens", "Steelers"],
    "afc-south": ["Colts", "Jaguars", "Texans", "Titans"],
    "afc-east": ["Bills", "Dolphins", "Jets", "Patriots"],
    "afc-west": ["Broncos", "Chargers", "Chiefs", "Raiders"],
    "nfc-north": ["Bears", "Lions", "Packers", "Vikings"],
    "nfc-south": ["Buccaneers", "Falcons", "Panthers", "Saints"],
    "nfc-east": ["Cowboys", "Eagles", "Giants", "Commanders"],
    "nfc-west": ["Cardinals", "49ers", "Rams", "Seahawks"],
    "afc": ["Bengals","Browns","Ravens","Steelers","Colts","Jaguars","Texans","Titans","Bills","Dolphins","Jets","Patriots","Broncos","Chargers","Chiefs","Raiders"],
    "nfc": ["Bears","Lions","Packers","Vikings","Buccaneers","Falcons","Panthers","Saints","Cowboys","Eagles","Giants","Commanders","Cardinals","49ers","Rams","Seahawks"],
  };

  const teamMappings = {
    "49ers":"49ers","bears":"Bears","bengals":"Bengals","bills":"Bills","broncos":"Broncos",
    "browns":"Browns","buccaneers":"Buccaneers","cardinals":"Cardinals","chargers":"Chargers",
    "chiefs":"Chiefs","colts":"Colts","commanders":"Commanders","cowboys":"Cowboys",
    "dolphins":"Dolphins","eagles":"Eagles","falcons":"Falcons","giants":"Giants",
    "jaguars":"Jaguars","jets":"Jets","lions":"Lions","packers":"Packers","panthers":"Panthers",
    "patriots":"Patriots","raiders":"Raiders","rams":"Rams","ravens":"Ravens","saints":"Saints",
    "seahawks":"Seahawks","steelers":"Steelers","texans":"Texans","titans":"Titans","vikings":"Vikings",
  };

  const programMappings = {
    "preseason": "Preseason Field Pass",
    "opening-drive": "Opening Drive Promo",
    "team-of-the-week": "Team of the Week Program",
    "campus-heroes": "Campus Heroes Promo",
    "nfl-kickoff": "NFL Kickoff Promo",
    "back-to-the-gridiron": "Back to the Gridiron Field Pass",
    "legends": "Legends Promo",
    "international": "International Promo",
    "field-of-fear": "Field of Fear Field Pass",
    "most-feared": "Most Feared Promo",
    "breakouts": "Breakouts Promo",
    "autumn-blitz": "Autumn Blitz Field Pass",
    "feast": "Feast Promo",
    "goat": "GOAT Promo",
    "arctic-blitz": "Arctic Blitz Field Pass",
    "ultimate-freeze": "Ultimate Freeze Promo",
    "what-if": "What If Promo",
    "championship-run": "Championship Run Field Pass",
    "collectors-series": "Collector's Series Promo",
    "super-bowl": "Super Bowl Promo",
    "glory-road": "Glory Road Field Pass",
    "team-diamonds": "Team Diamonds Program",
    "fan-favorites": "Fan Favorites Promo",
    "team-of-the-year-i": "Team of the Year I Promo",
    "free-agency": "Free Agency Field Pass",
    "team-of-the-year-ii": "Team of the Year II Promo",
    "sugar-rush": "Sugar Rush Promo",
    "future-stars": "Future Stars Field Pass",
    "nfl-draft": "NFL Draft Promo",
    "collectors-series-ii": "Collector's Series II Promo",
    "offseason": "Offseason Field Pass",
  };

  const positionGroups = {
    offense: ["QB", "HB", "FB", "WR", "TE", "OT", "OG", "C"],
    defense: ["DE", "DT", "LB", "MLB", "CB", "S"],
    specialTeams: ["K", "P", "KR", "PR"],
  };

  const toRouteName = (name) =>
    name.toLowerCase().replace(/'/g, "").replace(/'/g, "").replace(/\s+/g, "-");

  // ── Calculate OVR dynamically from the player database ───────────────────
  const calculateOVR = (team) => {
    const routeName = toRouteName(team.name);
    const category = team.category.toLowerCase();

    let filteredPlayers = [];
    if (category === "team") {
      const teamName = teamMappings[routeName];
      filteredPlayers = players.filter(p => p.team === teamName);
    } else if (category === "division") {
      const divTeams = nflStructure[routeName] || [];
      filteredPlayers = players.filter(p => divTeams.includes(p.team));
    } else if (category === "conference") {
      const confTeams = nflStructure[routeName] || [];
      filteredPlayers = players.filter(p => confTeams.includes(p.team));
    } else if (category === "program") {
      const programName = programMappings[routeName];
      filteredPlayers = players.filter(p => p.program === programName);
    }

    // Group by position and sum the top OVR at each position
    const topByPosition = {};
    filteredPlayers.forEach(player => {
      const pos = player.position;
      if (!topByPosition[pos] || player.ovr > topByPosition[pos]) {
        topByPosition[pos] = player.ovr;
      }
    });

    return Object.values(topByPosition).reduce((sum, ovr) => sum + ovr, 0);
  };

  // Pre-compute OVRs once so cards don't recalculate on every render
  const teamOVRs = useMemo(() => {
    const map = {};
    themeTeams.forEach(team => {
      map[`${team.category}-${team.name}`] = calculateOVR(team);
    });
    return map;
  }, []);

  const getOvrColor = (ovr) => {
  if (ovr > 0) return "#22c55e";
  return "#94a3b8"; // gray only if no players at all
};

  const filteredTeams = filter === "All"
    ? [...themeTeams].sort((a, b) => {
        const order = { "Team": 1, "Division": 2, "Conference": 3, "Program": 4 };
        return order[a.category] - order[b.category];
      })
    : themeTeams.filter(team => team.category === filter);

  const handleTeamClick = (team) => {
    navigate(`/theme-teams/${team.category.toLowerCase()}/${toRouteName(team.name)}`);
  };

  const handleThemeSelection = (team) => {
    const themeId = `${team.category}-${team.name}`;
    if (selectedThemes.some(t => `${t.category}-${t.name}` === themeId)) {
      setSelectedThemes(selectedThemes.filter(t => `${t.category}-${t.name}` !== themeId));
    } else if (selectedThemes.length < 3) {
      setSelectedThemes([...selectedThemes, team]);
    }
  };

  const isThemeSelected = (team) =>
    selectedThemes.some(t => t.category === team.category && t.name === team.name);

  const handleViewMultiTeam = () => {
    if (selectedThemes.length >= 2) {
      const themeParams = selectedThemes
        .map(t => `${t.category.toLowerCase()}:${toRouteName(t.name)}`)
        .join(',');
      navigate(`/theme-teams/multi/${themeParams}`);
    }
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${
      theme === "dark" ? "bg-zinc-900 text-gray-100" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Theme Teams</h1>
          <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Build your ultimate theme team
          </p>
        </div>

        {/* Filter Section — label changed to "Select Theme(s):" */}
        <div className="mb-8">
          <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
            Select Theme(s):
          </h2>
          <div className="flex flex-wrap gap-3">
            {["All", "Team", "Division", "Conference", "Program"].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  filter === filterOption
                    ? "bg-yellow-500 text-black shadow-lg"
                    : theme === "dark"
                      ? "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {filterOption}
              </button>
            ))}
            <button
              onClick={() => setShowMultipleModal(true)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                theme === "dark"
                  ? "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              Multiple
            </button>
          </div>
        </div>

        {/* Theme Teams Grid — 5 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredTeams.map((team, index) => {
            const ovr = teamOVRs[`${team.category}-${team.name}`] ?? 0;
            return (
              <div
                key={index}
                onClick={() => handleTeamClick(team)}
                className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  theme === "dark" ? "bg-zinc-800" : "bg-white shadow-md"
                }`}
                style={{
                  borderLeft: team.color ? `4px solid ${team.color}` : "none",
                }}
              >
                {/* Image Banner */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className={`absolute inset-0 items-center justify-center hidden ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-zinc-700 to-zinc-900"
                        : "bg-gradient-to-br from-gray-200 to-gray-400"
                    }`}
                  >
                    <div className={`text-6xl font-bold opacity-20 ${
                      theme === "dark" ? "text-gray-600" : "text-gray-400"
                    }`}>
                      {team.name.charAt(0)}
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium mb-1 truncate ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {team.subtitle}
                      </p>
                      <h3 className="text-sm font-bold mb-1 leading-tight">{team.name}</h3>
                    </div>
                    {ovr > 0 && (
                      <div
                        className="flex flex-col items-center justify-center w-12 h-12 rounded-full border-4 flex-shrink-0"
                        style={{ borderColor: getOvrColor(ovr) }}
                      >
                        <span className="text-xs font-bold leading-none" style={{ color: getOvrColor(ovr) }}>
                          {ovr}
                        </span>
                        <span className="text-[7px] font-semibold" style={{ color: getOvrColor(ovr) }}>
                          OVR
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Multiple Selection Modal */}
      {showMultipleModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`max-w-6xl w-full h-[90vh] rounded-xl shadow-2xl flex flex-col ${
            theme === "dark" ? "bg-zinc-800" : "bg-white"
          }`}>
            <div className={`flex-shrink-0 p-6 border-b ${theme === "dark" ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-200"}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Select Theme Teams</h2>
                <button
                  onClick={() => { setShowMultipleModal(false); setSelectedThemes([]); }}
                  className={`text-2xl font-bold ${theme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"}`}
                >
                  ×
                </button>
              </div>
              <p className={`mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Choose up to 3 from below
              </p>
              <button
                onClick={handleViewMultiTeam}
                disabled={selectedThemes.length < 2}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  selectedThemes.length >= 2
                    ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg"
                    : theme === "dark"
                      ? "bg-zinc-700 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                View Theme Team
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {[...themeTeams]
                  .sort((a, b) => {
                    const order = { "Team": 1, "Division": 2, "Conference": 3, "Program": 4 };
                    return order[a.category] - order[b.category];
                  })
                  .map((team, index) => {
                    const selected = isThemeSelected(team);
                    const disabled = !selected && selectedThemes.length >= 3;
                    return (
                      <button
                        key={index}
                        onClick={() => handleThemeSelection(team)}
                        disabled={disabled}
                        className={`rounded-lg border-2 transition-all duration-200 text-left overflow-hidden ${
                          selected
                            ? "border-blue-500 bg-blue-500/20"
                            : disabled
                              ? theme === "dark"
                                ? "border-zinc-700 bg-zinc-900/50 opacity-40 cursor-not-allowed"
                                : "border-gray-200 bg-gray-100 opacity-40 cursor-not-allowed"
                              : theme === "dark"
                                ? "border-zinc-700 bg-zinc-700/50 hover:border-zinc-600"
                                : "border-gray-300 bg-gray-50 hover:border-gray-400"
                        }`}
                      >
                        <div className="relative h-16 w-full overflow-hidden">
                          <img
                            src={team.image}
                            alt={team.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextSibling.style.display = "flex";
                            }}
                          />
                          <div className={`absolute inset-0 items-center justify-center hidden ${
                            theme === "dark" ? "bg-zinc-700" : "bg-gray-200"
                          }`}>
                            <div className={`text-2xl font-bold opacity-30 ${disabled ? "opacity-20" : ""}`}>
                              {team.name.charAt(0)}
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <p className={`text-xs font-medium mb-0.5 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>
                            {team.category}
                          </p>
                          <h4 className="font-bold text-sm">{team.name}</h4>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}