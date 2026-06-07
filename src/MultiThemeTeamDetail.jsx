import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import players from "./data/MM26PlayerDatabase";

export default function MultiThemeTeamDetail() {
  const { theme } = useTheme();
  const { themes } = useParams();
  const navigate = useNavigate();

  // Parse the themes parameter
  const parseThemes = () => {
    return themes.split(',').map(t => {
      const [category, name] = t.split(':');
      return { category, name };
    });
  };

  const selectedThemes = parseThemes();

  // NFL Division/Conference mappings
  const nflStructure = {
    "afc-north": ["Bengals", "Browns", "Ravens", "Steelers"],
    "afc-south": ["Colts", "Jaguars", "Texans", "Titans"],
    "afc-east": ["Bills", "Dolphins", "Jets", "Patriots"],
    "afc-west": ["Broncos", "Chargers", "Chiefs", "Raiders"],
    "nfc-north": ["Bears", "Lions", "Packers", "Vikings"],
    "nfc-south": ["Buccaneers", "Falcons", "Panthers", "Saints"],
    "nfc-east": ["Cowboys", "Eagles", "Giants", "Commanders"],
    "nfc-west": ["Cardinals", "49ers", "Rams", "Seahawks"],
    "afc": ["Bengals", "Browns", "Ravens", "Steelers", "Colts", "Jaguars", "Texans", "Titans", "Bills", "Dolphins", "Jets", "Patriots", "Broncos", "Chargers", "Chiefs", "Raiders"],
    "nfc": ["Bears", "Lions", "Packers", "Vikings", "Buccaneers", "Falcons", "Panthers", "Saints", "Cowboys", "Eagles", "Giants", "Commanders", "Cardinals", "49ers", "Rams", "Seahawks"]
  };

  // Team name mappings
  const teamMappings = {
    "49ers": "49ers",
    "bears": "Bears",
    "bengals": "Bengals",
    "bills": "Bills",
    "broncos": "Broncos",
    "browns": "Browns",
    "buccaneers": "Buccaneers",
    "cardinals": "Cardinals",
    "chargers": "Chargers",
    "chiefs": "Chiefs",
    "colts": "Colts",
    "commanders": "Commanders",
    "cowboys": "Cowboys",
    "dolphins": "Dolphins",
    "eagles": "Eagles",
    "falcons": "Falcons",
    "giants": "Giants",
    "jaguars": "Jaguars",
    "jets": "Jets",
    "lions": "Lions",
    "packers": "Packers",
    "panthers": "Panthers",
    "patriots": "Patriots",
    "raiders": "Raiders",
    "rams": "Rams",
    "ravens": "Ravens",
    "saints": "Saints",
    "seahawks": "Seahawks",
    "steelers": "Steelers",
    "texans": "Texans",
    "titans": "Titans",
    "vikings": "Vikings"
  };

  // Program name mappings
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
    "offseason": "Offseason Field Pass"
  };

  // Get players for a single theme
  const getThemePlayers = (themeCategory, themeName) => {
    switch(themeCategory) {
      case "team":
        const teamName = teamMappings[themeName];
        return players.filter(p => p.team === teamName);
      case "division":
        const divisionTeams = nflStructure[themeName] || [];
        return players.filter(p => divisionTeams.includes(p.team));
      case "conference":
        const conferenceTeams = nflStructure[themeName] || [];
        return players.filter(p => conferenceTeams.includes(p.team));
      case "program":
        const programName = programMappings[themeName];
        return players.filter(p => p.program === programName);
      default:
        return [];
    }
  };

  // Get all players from selected themes
  const getCombinedPlayers = () => {
    const allPlayers = [];
    selectedThemes.forEach(({ category, name }) => {
      const themePlayers = getThemePlayers(category, name);
      allPlayers.push(...themePlayers);
    });
    
    // Remove duplicates based on player ID
    const uniquePlayers = Array.from(
      new Map(allPlayers.map(p => [p.id, p])).values()
    );
    
    return uniquePlayers;
  };

  // Position groupings
  const positionGroups = {
    offense: ["QB", "HB", "FB", "WR", "TE", "OT", "OG", "C"],
    defense: ["DE", "DT", "LB", "MLB", "CB", "S"],
    specialTeams: ["K", "P", "KR", "PR"]
  };

  // Organize players by position and get top 5 per position (highest OVR)
  const organizePlayersByPosition = (filteredPlayers) => {
    const organized = {
      offense: {},
      defense: {},
      specialTeams: {}
    };

    // Initialize empty arrays for each position
    Object.entries(positionGroups).forEach(([group, positions]) => {
      positions.forEach(pos => {
        organized[group][pos] = [];
      });
    });

    // Group players by position
    filteredPlayers.forEach(player => {
      const pos = player.position;
      if (positionGroups.offense.includes(pos)) {
        organized.offense[pos].push(player);
      } else if (positionGroups.defense.includes(pos)) {
        organized.defense[pos].push(player);
      } else if (positionGroups.specialTeams.includes(pos)) {
        organized.specialTeams[pos].push(player);
      }
    });

    // Sort by OVR and take top 5 for each position
    Object.keys(organized).forEach(group => {
      Object.keys(organized[group]).forEach(pos => {
        organized[group][pos] = organized[group][pos]
          .sort((a, b) => b.ovr - a.ovr)
          .slice(0, 5);
      });
    });

    return organized;
  };

  const combinedPlayers = getCombinedPlayers();
  const organizedPlayers = organizePlayersByPosition(combinedPlayers);

  // Calculate team OVR
  const calculateTeamOVR = () => {
    let totalOVR = 0;
    
    Object.values(organizedPlayers).forEach(group => {
      Object.values(group).forEach(playersList => {
        if (playersList.length > 0) {
          totalOVR += playersList[0].ovr;
        }
      });
    });
    
    return totalOVR;
  };

  // Get display name
  const getDisplayName = () => {
    const themeNames = selectedThemes.map(({ category, name }) => {
      if (category === "team") {
        return teamMappings[name];
      } else if (category === "program") {
        return programMappings[name];
      } else if (category === "division") {
        return name.split('-').map(w => w.toUpperCase() === 'AFC' || w.toUpperCase() === 'NFC' ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      } else if (category === "conference") {
        return name.toUpperCase();
      }
      return name;
    });
    
    return `Theme Team: ${themeNames.join(' + ')}`;
  };

  return (
    <div className={`p-4 min-h-screen ${theme === "dark" ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <button
        onClick={() => navigate("/theme-teams")}
        className="inline-block mt-[-8px] mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        ← Back to Theme Teams Homepage
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{getDisplayName()}</h1>
        <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          OVR: {calculateTeamOVR()}
        </p>
      </div>

      {/* Offense Grid */}
      <div className={`mb-8 rounded-lg shadow-md p-6 border-2 ${
        theme === "dark" ? "bg-zinc-800 border-blue-500" : "bg-white border-blue-600"
      }`}>
        <h3 className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-blue-400" : "text-blue-600"
        }`}>
          Offense
        </h3>
        {Object.entries(organizedPlayers.offense).map(([position, playersList]) => {
          if (playersList.length === 0) return null;
          return (
            <div key={position} className="mb-6">
              <h4 className="font-bold text-base mb-3">{position}</h4>
              <div className="flex flex-wrap gap-3">
                {playersList.map((player, idx) => (
                  <div 
                    key={`${position}-${player.id}-${idx}`}
                    className={`p-3 rounded border w-[180px] flex-shrink-0 ${
                      theme === 'dark' ? 'bg-zinc-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <img
                      src={player.image}
                      alt={player.name}
                      className={`w-full h-30 object-contain mb-2 rounded ${
                        theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
                      }`}
                    />
                    <p className="font-bold text-sm mb-1.5">{player.name}</p>
                    <div className="text-xs space-y-0.5">
                      <p><strong>OVR:</strong> {player.ovr}</p>
                      <p><strong>Rarity:</strong> {player.rarity}</p>
                      <p><strong>Program:</strong> {player.program}</p>
                      <p><strong>Position:</strong> {player.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Defense Grid */}
      <div className={`mb-8 rounded-lg shadow-md p-6 border-2 ${
        theme === "dark" ? "bg-zinc-800 border-red-500" : "bg-white border-red-600"
      }`}>
        <h3 className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-red-400" : "text-red-600"
        }`}>
          Defense
        </h3>
        {Object.entries(organizedPlayers.defense).map(([position, playersList]) => {
          if (playersList.length === 0) return null;
          return (
            <div key={position} className="mb-6">
              <h4 className="font-bold text-base mb-3">{position}</h4>
              <div className="flex flex-wrap gap-3">
                {playersList.map((player, idx) => (
                  <div 
                    key={`${position}-${player.id}-${idx}`}
                    className={`p-3 rounded border w-[180px] flex-shrink-0 ${
                      theme === 'dark' ? 'bg-zinc-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <img
                      src={player.image}
                      alt={player.name}
                      className={`w-full h-30 object-contain mb-2 rounded ${
                        theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
                      }`}
                    />
                    <p className="font-bold text-sm mb-1.5">{player.name}</p>
                    <div className="text-xs space-y-0.5">
                      <p><strong>OVR:</strong> {player.ovr}</p>
                      <p><strong>Rarity:</strong> {player.rarity}</p>
                      <p><strong>Program:</strong> {player.program}</p>
                      <p><strong>Position:</strong> {player.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Special Teams Grid */}
      <div className={`rounded-lg shadow-md p-6 border-2 ${
        theme === "dark" ? "bg-zinc-800 border-green-500" : "bg-white border-green-600"
      }`}>
        <h3 className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-green-400" : "text-green-600"
        }`}>
          Special Teams
        </h3>
        {Object.entries(organizedPlayers.specialTeams).map(([position, playersList]) => {
          if (playersList.length === 0) return null;
          return (
            <div key={position} className="mb-6">
              <h4 className="font-bold text-base mb-3">{position}</h4>
              <div className="flex flex-wrap gap-3">
                {playersList.map((player, idx) => (
                  <div 
                    key={`${position}-${player.id}-${idx}`}
                    className={`p-3 rounded border w-[180px] flex-shrink-0 ${
                      theme === 'dark' ? 'bg-zinc-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                    }`}
                  >
                    <img
                      src={player.image}
                      alt={player.name}
                      className={`w-full h-30 object-contain mb-2 rounded ${
                        theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
                      }`}
                    />
                    <p className="font-bold text-sm mb-1.5">{player.name}</p>
                    <div className="text-xs space-y-0.5">
                      <p><strong>OVR:</strong> {player.ovr}</p>
                      <p><strong>Rarity:</strong> {player.rarity}</p>
                      <p><strong>Program:</strong> {player.program}</p>
                      <p><strong>Position:</strong> {player.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}