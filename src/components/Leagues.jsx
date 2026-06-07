import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Leagues() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const bgColor = isDark ? "#18181B" : "#f9fafb";
  const textColor = isDark ? "#f5f5f5" : "#111827";
  const subText = isDark ? "#aaa" : "#4b5563";

  const cardBg = "#2a2a2a";
  const cardBorder = "#444";
  const hoverBg = "#333";
  const cardText = "#f5f5f5";
  const cardSubText = "#aaa";

  const leaguesGuides = [
    {
      to: "/guides/leagues/league-vs-league",
      icon: <img src="https://i.imgur.com/GzV0f9i.png" alt="League vs. League" width={40} height={40} />,
      title: "League vs. League",
      desc: "Team up with your league to compete against other leagues for exclusive rewards.",
    },
    {
      to: "/guides/leagues/siege",
      icon: <img src="https://i.imgur.com/O9LQe2A.png" alt="Siege" width={40} height={40} />,
      title: "Siege",
      desc: "Master Siege mode strategy and coordination with your league members.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bgColor,
        color: textColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 24px 48px",
        transition: "background-color 0.3s, color 0.3s",
        position: "relative",
      }}
    >
      {/* Back Button */}
      <div style={{ position: "absolute", top: "24px", left: "24px" }}>
        <button
          onClick={() => navigate("/guides")}
          className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          ← Back to Guides Homepage
        </button>
      </div>

      <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold" }}>
          League Guides
        </h1>
        <p style={{ fontSize: "1.125rem", color: subText }}>
          Learn strategies for league-based competitions and tournaments.
        </p>
      </header>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        {leaguesGuides.map(({ to, icon, title, desc }) => (
          <Link
            key={to}
            to={to}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: `1px solid ${cardBorder}`,
              borderRadius: "0.75rem",
              padding: "1.5rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              width: "14rem",
              backgroundColor: cardBg,
              transition: "all 0.2s ease-out",
              textDecoration: "none",
              color: cardText,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = cardBg)}
          >
            {icon}
            <span
              style={{
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontSize: "0.875rem",
                marginBottom: "0.25rem",
                marginTop: "0.75rem",
              }}
            >
              {title}
            </span>
            <p style={{ fontSize: "0.875rem", color: cardSubText }}>{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}