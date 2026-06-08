import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, ChevronDown, ChevronRight, Search, Menu, X, House } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ALL_PAGES = [
  { title: "Databases", path: "/databases", keywords: ["databases", "database", "players", "plays", "stats", "playbook"] },
  { title: "Player Database", path: "/players", keywords: ["players", "database", "stats", "ovr", "program", "team", "boost", "card", "starter", "uncommon", "common", "rare", "epic", "iconic", "mythic", "marvel", "dual", "height", "weight", "position", "archetype", "core", "compare"] },
  { title: "Play Database", path: "/plays", keywords: ["plays", "database", "offensive", "defensive", "scheme", "run", "short", "long", "pass", "action", "pa", "route", "budget", "yards", "compare"] },
  { title: "Event Schedule", path: "/calendars", keywords: ["calendars", "events", "schedule", "timezone", "start", "ends", "boost", "expires", "promo", "duration"] },
  { title: "Madden NFL 27 Mobile Calendar", path: "/calendars/mm27", keywords: ["calendar", "mm27", "madden nfl 27 mobile", "schedule", "events"] },
  { title: "Madden NFL 26 Mobile Calendar", path: "/calendars/mm26", keywords: ["calendar", "mm26", "madden nfl 26 mobile", "schedule", "events"] },
  { title: "Madden NFL 25 Mobile Calendar", path: "/calendars/mm25", keywords: ["calendar", "mm25", "madden nfl 25 mobile", "schedule", "events"] },
  { title: "Madden NFL 24 Mobile Calendar", path: "/calendars/mm24", keywords: ["calendar", "mm24", "madden nfl 24 mobile", "schedule", "events"] },
  { title: "Madden NFL 23 Mobile Calendar", path: "/calendars/mm23", keywords: ["calendar", "mm23", "madden nfl 23 mobile", "schedule", "events"] },
  { title: "Madden NFL 22 Mobile Calendar", path: "/calendars/mm22", keywords: ["calendar", "mm22", "madden nfl 22 mobile", "schedule", "events"] },
  { title: "August 2025 Calendar", path: "/calendars/aug25", keywords: ["calendar", "august", "2025", "schedule", "events", "start", "ends", "boost", "expires", "promo", "duration"] },
  { title: "September 2025 Calendar", path: "/calendars/sept25", keywords: ["calendar", "september", "2025", "schedule", "events", "start", "ends", "boost", "expires", "promo", "duration"] },
  { title: "October 2025 Calendar", path: "/calendars/oct25", keywords: ["calendar", "october", "2025", "schedule", "events", "start", "ends", "boost", "expires", "promo", "duration"] },
  { title: "November 2025 Calendar", path: "/calendars/nov25", keywords: ["calendar", "november", "2025", "schedule", "events", "start", "ends", "boost", "expires", "promo", "duration"] },
  { title: "December 2025 Calendar", path: "/calendars/dec25", keywords: ["calendar", "december", "2025", "schedule", "events", "start", "ends", "boost", "expires", "promo", "duration"] },
  { title: "Pack Contents", path: "/packs", keywords: ["packs", "probabilities", "costs", "limits", "players", "odds", "purchase"] },
  { title: "Pack Opener", path: "/packs/open", keywords: ["packs", "opener", "open", "score", "leaderboard", "monthly", "simulator"] },
  { title: "Core Rare Player Pack", path: "/packs/core-rare-player-pack", keywords: ["packs", "rare", "player", "core"] },
  { title: "Core Epic Player Pack", path: "/packs/core-epic-player-pack", keywords: ["packs", "epic", "player", "core"] },
  { title: "Core Iconic Player Pack", path: "/packs/core-iconic-player-pack", keywords: ["packs", "iconic", "player", "core"] },
  { title: "Pro Pack", path: "/packs/pro-pack", keywords: ["packs", "player", "pro"] },
  { title: "All-Pro Pack", path: "/packs/all-pro-pack", keywords: ["packs", "player", "all-pro"] },
  { title: "Madden Pack", path: "/packs/madden-pack", keywords: ["packs", "player", "madden"] },
  { title: "Basic Trait Pack", path: "/packs/basic-trait-pack", keywords: ["packs", "player", "trait", "basic"] },
  { title: "Premium Trait Pack", path: "/packs/premium-trait-pack", keywords: ["packs", "player", "trait", "premium"] },
  { title: "Guides", path: "/guides", keywords: ["guides", "strategy", "tips", "gameplay", "walkthrough", "promo", "players", "rewards", "unlocks"] },
  { title: "Events Guide", path: "/guides/events", keywords: ["guides", "events", "rewards", "gameplay", "walkthrough", "promo", "players"] },
  { title: "Field Pass Guide", path: "/guides/events/field-pass", keywords: ["guides", "field pass", "vip", "free", "iconic select", "rewards", "progression", "milestone", "journey", "gates"] },
  { title: "Promos Guide", path: "/guides/events/promos", keywords: ["guides", "promos", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "Opening Drive Promo", path: "/guides/events/promos/opening-drive", keywords: ["promo", "opening drive", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "Campus Heroes Promo", path: "/guides/events/promos/campus-heroes", keywords: ["promo", "campus heroes", "college", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "NFL Kickoff Promo", path: "/guides/events/promos/nfl-kickoff", keywords: ["promo", "nfl kickoff", "season", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "Legends Promo", path: "/guides/events/promos/legends", keywords: ["promo", "legends", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "International Promo", path: "/guides/events/promos/international", keywords: ["promo", "international", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "Most Feared Promo", path: "/guides/events/promos/most-feared", keywords: ["promo", "most feared", "halloween", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "Breakouts Promo", path: "/guides/events/promos/breakouts", keywords: ["promo", "breakouts", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "Record Breakers Promo", path: "/guides/events/promos/record-breakers", keywords: ["promo", "record breakers", "myles garrett", "cam little", "sacks", "field goals", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "Feast Promo", path: "/guides/events/promos/feast", keywords: ["promo", "feast", "thanksgiving", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "GOAT Promo", path: "/guides/events/promos/goat", keywords: ["promo", "goat", "greatest", "rewards", "unlocks", "events", "trades", "cosmetics", "logos", "uniforms", "banners", "nameplates", "players"] },
  { title: "Spotlight Pass Guide", path: "/guides/events/spotlight-pass", keywords: ["guides", "spotlight pass", "keys", "traits", "milestone", "touchdown trail", "endzone fever", "jigsaw", "bingo"] },
  { title: "Point Attack Guide", path: "/guides/events/point-attack", keywords: ["guides", "point attack", "rewards", "timer", "passing", "rushing", "leaderboard"] },
  { title: "Team of the Week Guide", path: "/guides/events/team-of-the-week", keywords: ["guides", "team of the week", "nfl", "totw", "wednesday"] },
  { title: "Competitive Guide", path: "/guides/competitive", keywords: ["guides", "competitive", "gameplay", "leaderboard", "head to head", "h2h", "arena", "daily", "unlimited", "draft", "champions", "vs", "versus", "milestone"] },
  { title: "Daily Arena Guide", path: "/guides/competitive/daily-arena", keywords: ["guides", "competitive", "gameplay", "daily arena", "rewards", "leaderboard"] },
  { title: "Unlimited Arena Guide", path: "/guides/competitive/unlimited-arena", keywords: ["guides", "competitive", "rewards", "unlimited arena", "leaderboard"] },
  { title: "VS Guide", path: "/guides/competitive/vs", keywords: ["guides", "vs", "versus", "head to head", "h2h", "streak", "bomb", "gameplay"] },
  { title: "Leagues Guide", path: "/guides/leagues", keywords: ["guides", "leagues", "tournaments", "lvl", "leaderboard", "siege", "bench", "promotion", "ranking"] },
  { title: "League vs. League Guide", path: "/guides/leagues/league-vs-league", keywords: ["guides", "league vs league", "ppd", "rewards", "lvl", "bench", "promotion", "ranking"] },
  { title: "Siege Guide", path: "/guides/leagues/siege", keywords: ["guides", "siege", "league", "board", "rewards", "leaderboard", "ppd", "bonus", "zones", "mods"] },
  { title: "Team Building Guide", path: "/guides/team-building", keywords: ["guides", "team building", "boosts", "optimization", "ovr", "lineup"] },
  { title: "Team Analyzer", path: "/team-analyzer", keywords: ["team", "analyzer", "ovr", "boosted", "lineup", "upgrade", "position", "calculator"] },
  { title: "Dual Players Guide", path: "/guides/team-building/dual-players", keywords: ["guides", "dual players", "positions", "boosts", "lineup"] },
  { title: "Evolution Guide", path: "/guides/team-building/evolution", keywords: ["guides", "evolution", "upgrade", "boost", "player", "evo"] },
  { title: "Traits Guide", path: "/guides/team-building/traits", keywords: ["guides", "traits", "performance", "boost", "player", "equip"] },
  { title: "Season Team Training Guide", path: "/guides/team-building/season-team-training", keywords: ["guides", "season team training", "stt", "ttp", "ovr", "marvel", "trade", "upgrade", "lineup"] },
  { title: "Playbooks Guide", path: "/guides/team-building/playbooks", keywords: ["guides", "playbooks", "offensive", "defensive", "strategies", "down", "yards", "run", "short pass", "long pass", "play action pass", "pa"] },
  { title: "Player Stats Guide", path: "/guides/team-building/stats", keywords: ["guides", "stats", "position", "players", "card", "expires", "boost", "ends"] },
  { title: "Acronyms Guide", path: "/guides/acronyms", keywords: ["acronyms", "abbreviations", "terms", "glossary", "slang", "mm", "ovr", "stt", "ttp", "h2h", "lvl", "motd", "cc", "f2p", "p2w"] },
  { title: "Theme Teams", path: "/theme-teams", keywords: ["theme teams", "nfl", "division", "conference", "promo", "field pass", "team", "players", "lineup", "ovr"] },
  { title: "News", path: "/news", keywords: ["news", "updates", "patch notes", "events", "sneak peek", "camera", "motd", "reveal"] },
  { title: "FAQ", path: "/faq", keywords: ["faq", "questions", "answers", "help", "frequently", "currencies", "coins", "player", "traits", "evolution", "evo", "stats", "stt", "training", "dual", "playbooks", "events", "competitive", "leagues", "trades", "packs", "web store"] },
  { title: "Community", path: "/community", keywords: ["community", "discord", "chat", "reddit", "youtube", "videos", "content creator", "cc", "twitch", "stream", "sponsored"] },
  { title: "About Us", path: "/about", keywords: ["about", "us", "team", "bio"] },
  { title: "Contact Us", path: "/contact", keywords: ["contact", "us", "support", "inquiry", "discord", "reddit", "email", "feedback", "suggestions", "complaints"] },
  { title: "Privacy Policy", path: "/privacy-policy", keywords: ["privacy", "policy"] },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openGuidesSubmenu, setOpenGuidesSubmenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const submenuTimeout = useRef(null);
  const guidesSubmenuTimeout = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const bgColor = isDark ? "#1f2937" : "#f9fafb";
  const textColor = isDark ? "#f5f5f5" : "#111827";
  const hoverColor = isDark ? "#facc15" : "#b45309";
  const borderColor = isDark ? "#374151" : "#d1d5db";

  const linkClasses = ({ isActive }) => ({
    color: isActive ? "#000" : textColor,
    backgroundColor: isActive ? "#facc15" : "transparent",
    fontWeight: isActive ? "bold" : "normal",
    borderRadius: "0.25rem",
    padding: "4px 8px",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "color 0.2s, background-color 0.2s",
  });

  const isCalendarsActive = location.pathname.startsWith("/calendars");
  const isPacksActive = location.pathname.startsWith("/packs") && location.pathname !== "/packs/open";
  const isPlayersActive = location.pathname.startsWith("/players");
  const isPlaysActive = location.pathname.startsWith("/plays");
  const isDatabasesActive = location.pathname.startsWith("/databases") || isPlayersActive || isPlaysActive;
  const isGuidesActive = location.pathname.startsWith("/guides");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
        setOpenSubmenu(null);
        setOpenGuidesSubmenu(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(submenuTimeout.current);
      clearTimeout(guidesSubmenuTimeout.current);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
    setOpenSubmenu(null);
    setOpenGuidesSubmenu(null);
  }, [location.pathname]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const lower = query.toLowerCase();
    const results = ALL_PAGES.filter(
      (page) =>
        page.title.toLowerCase().includes(lower) ||
        page.keywords.some((kw) => kw.toLowerCase().includes(lower))
    );
    setSearchResults(results);
    setShowResults(true);
  };

  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <nav
      ref={menuRef}
      className={`site-navbar ${isMobileMenuOpen ? "site-navbar-open" : ""}`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: bgColor,
        color: textColor,
        display: "flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.75rem 1rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <button
        type="button"
        className="site-menu-toggle"
        onClick={() => {
          setIsMobileMenuOpen((current) => !current);
          setOpenMenu(null);
          setOpenSubmenu(null);
          setOpenGuidesSubmenu(null);
        }}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
        style={{
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${borderColor}`,
          borderRadius: "0.375rem",
          backgroundColor: isDark ? "#374151" : "white",
          color: textColor,
          padding: "7px 9px",
          cursor: "pointer",
        }}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Home */}
      <NavLink
        to="/"
        className="site-home-link"
        style={{ ...linkClasses({ isActive: location.pathname === "/" }), display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        end
        aria-label="Home"
        title="Home"
      >
        <House className="site-home-icon" size={20} />
        <span className="site-home-text">Home</span>
      </NavLink>

      {/* Databases Dropdown */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <button
          onClick={() => {
            navigate("/databases");
            setOpenMenu(null);
            setOpenSubmenu(null);
          }}
          style={{
            ...linkClasses({ isActive: isDatabasesActive }),
            backgroundColor: isDatabasesActive ? "#facc15" : "transparent",
          }}
        >
          Databases
        </button>
        <button
          onClick={() => {
            setOpenMenu(openMenu === "databases" ? null : "databases");
            setOpenSubmenu(null);
          }}
          style={{ background: "none", border: "none", cursor: "pointer", color: textColor }}
        >
          <ChevronDown
            size={16}
            style={{
              transition: "transform 0.2s",
              transform: openMenu === "databases" ? "rotate(180deg)" : "rotate(0)",
            }}
          />
        </button>
        {openMenu === "databases" && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "4px",
              width: "11rem",
              backgroundColor: isDark ? "#2d3748" : "white",
              border: `1px solid ${borderColor}`,
              borderRadius: "0.375rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              overflow: "visible",
            }}
          >
            {[
              { name: "Players", path: "/players", submenu: "database-players" },
              { name: "Plays", path: "/plays", submenu: "database-plays" },
            ].map((database) => (
              <div
                key={database.name}
                style={{ position: "relative" }}
                onMouseEnter={() => {
                  clearTimeout(submenuTimeout.current);
                  setOpenSubmenu(database.submenu);
                }}
                onMouseLeave={() => {
                  submenuTimeout.current = setTimeout(() => setOpenSubmenu(null), 150);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    fontSize: "0.875rem",
                    color: textColor,
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onClick={() => {
                    navigate(database.path);
                    setOpenMenu(null);
                    setOpenSubmenu(null);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <span>{database.name}</span>
                  <ChevronRight size={14} />
                </div>
                {openSubmenu === database.submenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "100%",
                      marginLeft: "4px",
                      width: "11rem",
                      backgroundColor: isDark ? "#2d3748" : "white",
                      border: `1px solid ${borderColor}`,
                      borderRadius: "0.375rem",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      overflow: "hidden",
                    }}
                    onMouseEnter={() => clearTimeout(submenuTimeout.current)}
                    onMouseLeave={() => {
                      submenuTimeout.current = setTimeout(() => setOpenSubmenu(null), 150);
                    }}
                  >
                    <NavLink
                      to={database.path}
                      onClick={() => {
                        setOpenMenu(null);
                        setOpenSubmenu(null);
                      }}
                      style={{
                        display: "block",
                        padding: "8px 12px",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        color: textColor,
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      MM26
                    </NavLink>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calendars Dropdown with Nested Submenu */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <button
          onClick={() => navigate("/calendars")}
          style={{
            ...linkClasses({ isActive: isCalendarsActive }),
            backgroundColor: isCalendarsActive ? "#facc15" : "transparent",
          }}
        >
          Calendars
        </button>
        <button
          onClick={() => {
            setOpenMenu(openMenu === "calendars" ? null : "calendars");
            setOpenSubmenu(null);
          }}
          style={{ background: "none", border: "none", cursor: "pointer", color: textColor }}
        >
          <ChevronDown
            size={16}
            style={{
              transition: "transform 0.2s",
              transform: openMenu === "calendars" ? "rotate(180deg)" : "rotate(0)",
            }}
          />
        </button>
        {openMenu === "calendars" && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "4px",
              width: "11rem",
              backgroundColor: isDark ? "#2d3748" : "white",
              border: `1px solid ${borderColor}`,
              borderRadius: "0.375rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              overflow: "visible",
            }}
          >
            {[
              { name: "MM27", path: "/calendars/mm27" },
              { name: "MM26", path: "/calendars/mm26", submenu: "mm26" },
              { name: "MM25", path: "/calendars/mm25" },
              { name: "MM24", path: "/calendars/mm24" },
              { name: "MM23", path: "/calendars/mm23" },
              { name: "MM22", path: "/calendars/mm22" },
            ].map((season) => (
              <div
                key={season.name}
                style={{ position: "relative" }}
                onMouseEnter={() => {
                  if (!season.submenu) return;
                  clearTimeout(submenuTimeout.current);
                  setOpenSubmenu(season.submenu);
                }}
                onMouseLeave={() => {
                  if (!season.submenu) return;
                  submenuTimeout.current = setTimeout(() => setOpenSubmenu(null), 150);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    fontSize: "0.875rem",
                    color: textColor,
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onClick={() => {
                    navigate(season.path);
                    setOpenMenu(null);
                    setOpenSubmenu(null);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <span>{season.name}</span>
                  {season.submenu && <ChevronRight size={14} />}
                </div>
                {season.submenu && openSubmenu === season.submenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "100%",
                      marginLeft: "4px",
                      width: "11rem",
                      backgroundColor: isDark ? "#2d3748" : "white",
                      border: `1px solid ${borderColor}`,
                      borderRadius: "0.375rem",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      overflow: "hidden",
                    }}
                    onMouseEnter={() => clearTimeout(submenuTimeout.current)}
                    onMouseLeave={() => {
                      submenuTimeout.current = setTimeout(() => setOpenSubmenu(null), 150);
                    }}
                  >
                    {[
                      { name: "August 2025", path: "/calendars/aug25" },
                      { name: "September 2025", path: "/calendars/sept25" },
                      { name: "October 2025", path: "/calendars/oct25" },
                      { name: "November 2025", path: "/calendars/nov25" },
                      { name: "December 2025", path: "/calendars/dec25" },
                    ].map((month) => (
                      <NavLink
                        key={month.name}
                        to={month.path}
                        onClick={() => {
                          setOpenMenu(null);
                          setOpenSubmenu(null);
                        }}
                        style={{
                          display: "block",
                          padding: "8px 12px",
                          fontSize: "0.875rem",
                          textDecoration: "none",
                          color: textColor,
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        {month.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Packs Dropdown */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <button
          onClick={() => navigate("/packs")}
          style={{
            ...linkClasses({ isActive: isPacksActive }),
            backgroundColor: isPacksActive ? "#facc15" : "transparent",
          }}
        >
          Packs
        </button>
        <button
          onClick={() => setOpenMenu(openMenu === "packs" ? null : "packs")}
          style={{ background: "none", border: "none", cursor: "pointer", color: textColor }}
        >
          <ChevronDown
            size={16}
            style={{
              transition: "transform 0.2s",
              transform: openMenu === "packs" ? "rotate(180deg)" : "rotate(0)",
            }}
          />
        </button>
        {openMenu === "packs" && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "4px",
              width: "13rem",
              backgroundColor: isDark ? "#2d3748" : "white",
              border: `1px solid ${borderColor}`,
              borderRadius: "0.375rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              overflow: "hidden",
            }}
          >
            {[
              { name: "Core Rare Player Pack", path: "/packs/core-rare-player-pack" },
              { name: "Core Epic Player Pack", path: "/packs/core-epic-player-pack" },
              { name: "Core Iconic Player Pack", path: "/packs/core-iconic-player-pack" },
              { name: "Pro Pack", path: "/packs/pro-pack" },
              { name: "All-Pro Pack", path: "/packs/all-pro-pack" },
              { name: "Madden Pack", path: "/packs/madden-pack" },
              { name: "Basic Trait Pack", path: "/packs/basic-trait-pack" },
              { name: "Premium Trait Pack", path: "/packs/premium-trait-pack" },
            ].map((pack) => (
              <NavLink
                key={pack.name}
                to={pack.path}
                onClick={() => setOpenMenu(null)}
                style={{
                  display: "block",
                  padding: "8px 12px",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  color: textColor,
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {pack.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Guides Dropdown with Nested Submenus */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <button
          onClick={() => navigate("/guides")}
          style={{
            ...linkClasses({ isActive: isGuidesActive }),
            backgroundColor: isGuidesActive ? "#facc15" : "transparent",
          }}
        >
          Guides
        </button>
        <button
          onClick={() => {
            setOpenMenu(openMenu === "guides" ? null : "guides");
            setOpenGuidesSubmenu(null);
          }}
          style={{ background: "none", border: "none", cursor: "pointer", color: textColor }}
        >
          <ChevronDown
            size={16}
            style={{
              transition: "transform 0.2s",
              transform: openMenu === "guides" ? "rotate(180deg)" : "rotate(0)",
            }}
          />
        </button>
        {openMenu === "guides" && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "4px",
              width: "11rem",
              backgroundColor: isDark ? "#2d3748" : "white",
              border: `1px solid ${borderColor}`,
              borderRadius: "0.375rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              overflow: "visible",
            }}
          >
            {/* Events */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => {
                clearTimeout(guidesSubmenuTimeout.current);
                setOpenGuidesSubmenu("events");
              }}
              onMouseLeave={() => {
                guidesSubmenuTimeout.current = setTimeout(() => setOpenGuidesSubmenu(null), 150);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  fontSize: "0.875rem",
                  color: textColor,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onClick={() => {
                  navigate("/guides/events");
                  setOpenMenu(null);
                  setOpenGuidesSubmenu(null);
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span>Events</span>
                <ChevronRight size={14} />
              </div>
              {openGuidesSubmenu === "events" && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "100%",
                    marginLeft: "4px",
                    width: "12rem",
                    backgroundColor: isDark ? "#2d3748" : "white",
                    border: `1px solid ${borderColor}`,
                    borderRadius: "0.375rem",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                  }}
                  onMouseEnter={() => clearTimeout(guidesSubmenuTimeout.current)}
                  onMouseLeave={() => {
                    guidesSubmenuTimeout.current = setTimeout(() => setOpenGuidesSubmenu(null), 150);
                  }}
                >
                  {[
                    { name: "Field Pass", path: "/guides/events/field-pass" },
                    { name: "Promos", path: "/guides/events/promos" },
                    { name: "Spotlight Pass", path: "/guides/events/spotlight-pass" },
                    { name: "Point Attack", path: "/guides/events/point-attack" },
                    { name: "Team of the Week", path: "/guides/events/team-of-the-week" },
                  ].map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setOpenMenu(null);
                        setOpenGuidesSubmenu(null);
                      }}
                      style={{
                        display: "block",
                        padding: "8px 12px",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        color: textColor,
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Competitive */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => {
                clearTimeout(guidesSubmenuTimeout.current);
                setOpenGuidesSubmenu("competitive");
              }}
              onMouseLeave={() => {
                guidesSubmenuTimeout.current = setTimeout(() => setOpenGuidesSubmenu(null), 150);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  fontSize: "0.875rem",
                  color: textColor,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onClick={() => {
                  navigate("/guides/competitive");
                  setOpenMenu(null);
                  setOpenGuidesSubmenu(null);
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span>Competitive</span>
                <ChevronRight size={14} />
              </div>
              {openGuidesSubmenu === "competitive" && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "100%",
                    marginLeft: "4px",
                    width: "12rem",
                    backgroundColor: isDark ? "#2d3748" : "white",
                    border: `1px solid ${borderColor}`,
                    borderRadius: "0.375rem",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                  }}
                  onMouseEnter={() => clearTimeout(guidesSubmenuTimeout.current)}
                  onMouseLeave={() => {
                    guidesSubmenuTimeout.current = setTimeout(() => setOpenGuidesSubmenu(null), 150);
                  }}
                >
                  {[
                    { name: "Daily Arena", path: "/guides/competitive/daily-arena" },
                    { name: "Unlimited Arena", path: "/guides/competitive/unlimited-arena" },
                    { name: "VS", path: "/guides/competitive/vs" },
                  ].map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setOpenMenu(null);
                        setOpenGuidesSubmenu(null);
                      }}
                      style={{
                        display: "block",
                        padding: "8px 12px",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        color: textColor,
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Leagues */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => {
                clearTimeout(guidesSubmenuTimeout.current);
                setOpenGuidesSubmenu("leagues");
              }}
              onMouseLeave={() => {
                guidesSubmenuTimeout.current = setTimeout(() => setOpenGuidesSubmenu(null), 150);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  fontSize: "0.875rem",
                  color: textColor,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onClick={() => {
                  navigate("/guides/leagues");
                  setOpenMenu(null);
                  setOpenGuidesSubmenu(null);
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span>Leagues</span>
                <ChevronRight size={14} />
              </div>
              {openGuidesSubmenu === "leagues" && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "100%",
                    marginLeft: "4px",
                    width: "12rem",
                    backgroundColor: isDark ? "#2d3748" : "white",
                    border: `1px solid ${borderColor}`,
                    borderRadius: "0.375rem",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                  }}
                  onMouseEnter={() => clearTimeout(guidesSubmenuTimeout.current)}
                  onMouseLeave={() => {
                    guidesSubmenuTimeout.current = setTimeout(() => setOpenGuidesSubmenu(null), 150);
                  }}
                >
                  {[
                    { name: "League vs. League", path: "/guides/leagues/league-vs-league" },
                    { name: "Siege", path: "/guides/leagues/siege" },
                  ].map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setOpenMenu(null);
                        setOpenGuidesSubmenu(null);
                      }}
                      style={{
                        display: "block",
                        padding: "8px 12px",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        color: textColor,
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Team Building */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => {
                clearTimeout(guidesSubmenuTimeout.current);
                setOpenGuidesSubmenu("teambuilding");
              }}
              onMouseLeave={() => {
                guidesSubmenuTimeout.current = setTimeout(() => setOpenGuidesSubmenu(null), 150);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  fontSize: "0.875rem",
                  color: textColor,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onClick={() => {
                  navigate("/guides/team-building");
                  setOpenMenu(null);
                  setOpenGuidesSubmenu(null);
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span>Team Building</span>
                <ChevronRight size={14} />
              </div>
              {openGuidesSubmenu === "teambuilding" && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "100%",
                    marginLeft: "4px",
                    width: "13rem",
                    backgroundColor: isDark ? "#2d3748" : "white",
                    border: `1px solid ${borderColor}`,
                    borderRadius: "0.375rem",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                  }}
                  onMouseEnter={() => clearTimeout(guidesSubmenuTimeout.current)}
                  onMouseLeave={() => {
                    guidesSubmenuTimeout.current = setTimeout(() => setOpenGuidesSubmenu(null), 150);
                  }}
                >
                  {[
                    { name: "Dual Players", path: "/guides/team-building/dual-players" },
                    { name: "Evolution", path: "/guides/team-building/evolution" },
                    { name: "Traits", path: "/guides/team-building/traits" },
                    { name: "Season Team Training", path: "/guides/team-building/season-team-training" },
                    { name: "Playbooks", path: "/guides/team-building/playbooks" },
                    { name: "Player Stats", path: "/guides/team-building/stats" },
                  ].map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setOpenMenu(null);
                        setOpenGuidesSubmenu(null);
                      }}
                      style={{
                        display: "block",
                        padding: "8px 12px",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        color: textColor,
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Acronyms - direct link, no flyout needed */}
            <NavLink
              to="/guides/acronyms"
              onClick={() => {
                setOpenMenu(null);
                setOpenGuidesSubmenu(null);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                fontSize: "0.875rem",
                textDecoration: "none",
                color: textColor,
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Acronyms
            </NavLink>
          </div>
        )}
      </div>

      {/* Theme Teams */}
      <NavLink to="/theme-teams" style={linkClasses}>
        Theme Teams
      </NavLink>

      {/* Team Analyzer */}
      <NavLink to="/team-analyzer" style={linkClasses}>
        Team Analyzer
      </NavLink>

      {/* News */}
      <NavLink to="/news" style={linkClasses}>
        News
      </NavLink>

      {/* FAQ */}
      <NavLink to="/faq" style={linkClasses}>
        FAQ
      </NavLink>

      {/* Community */}
      <NavLink to="/community" style={linkClasses}>
        Community
      </NavLink>

      {/* Pack Opener */}
      <NavLink to="/packs/open" style={linkClasses}>
        Pack Opener
      </NavLink>

      {/* Search Bar */}
      <div ref={searchRef} className="site-navbar-search" style={{ position: "relative", marginLeft: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: isDark ? "#374151" : "white",
            border: `1px solid ${borderColor}`,
            borderRadius: "0.375rem",
            padding: "4px 8px",
            gap: "0.5rem",
          }}
        >
          <Search size={16} color={isDark ? "#aaa" : "#6b7280"} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="navbar-search"
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: textColor,
              fontSize: "0.875rem",
              width: "118px",
            }}
          />
        </div>

        {showResults && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "4px",
              width: "260px",
              backgroundColor: isDark ? "#2d3748" : "white",
              border: `1px solid ${borderColor}`,
              borderRadius: "0.375rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              overflow: "hidden",
              maxHeight: "320px",
              overflowY: "auto",
              zIndex: 100,
            }}
          >
            {searchResults.length === 0 ? (
              <div
                style={{
                  padding: "10px 12px",
                  fontSize: "0.875rem",
                  color: isDark ? "#aaa" : "#6b7280",
                }}
              >
                No results found.
              </div>
            ) : (
              searchResults.map((result) => (
                <div
                  key={result.path}
                  onClick={() => handleResultClick(result.path)}
                  style={{
                    display: "block",
                    padding: "8px 12px",
                    fontSize: "0.875rem",
                    color: textColor,
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDark ? "#374151" : "#f3f4f6")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div style={{ fontWeight: "600" }}>{result.title}</div>
                  <div style={{ fontSize: "0.75rem", color: isDark ? "#aaa" : "#6b7280" }}>{result.path}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Theme Toggle Button */}
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="site-navbar-theme-button"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "#facc15",
          color: "#111",
          border: "none",
          borderRadius: "0.375rem",
          padding: "6px 12px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fde047")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#facc15")}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
        <span>{isDark ? "Light" : "Dark"}</span>
      </button>
    </nav>
  );
}
