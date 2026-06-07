import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function TeamBuilding() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const bgColor = isDark ? "#18181B" : "#f9fafb";
  const textColor = isDark ? "#f5f5f5" : "#111827";
  const subText = isDark ? "#aaa" : "#4b5563";

  // Cards are now identical in both light and dark mode
  const cardBg = "#2a2a2a";
  const cardBorder = "#444";
  const hoverBg = "#333";
  const cardText = "#f5f5f5";
  const cardSubText = "#aaa";

  const topRowGuides = [
    {
      to: "/guides/team-building/dual-players",
      icon: <img src="https://i.imgur.com/HZFRdau.png" alt="Dual Players" width={40} height={40} />,
      title: "Dual Players",
      desc: "Optimize your lineup with players that can play multiple positions.",
    },
    {
      to: "/guides/team-building/evolution",
      icon: <img src="https://i.imgur.com/0vdgmn2.png" alt="Evolution" width={40} height={40} />,
      title: "Evolution",
      desc: "Learn how to evolve your players to unlock their full potential.",
    },
    {
      to: "/guides/team-building/traits",
      icon: <img src="https://i.imgur.com/3epZkae.png" alt="Traits" width={40} height={40} />,
      title: "Traits",
      desc: "Understand player traits and how they impact performance on the field.",
    },
  ];

  const bottomRowGuides = [
    {
      to: "/guides/team-building/season-team-training",
      icon: <img src="https://i.imgur.com/yk2lySM.png" alt="Season Team Training" width={40} height={40} />,
      title: "Season Team Training",
      desc: "Maximize your team's overall rating through strategic training methods.",
    },
    {
      to: "/guides/team-building/playbooks",
      icon: <img src="https://i.imgur.com/BF6wfZ4.png" alt="Playbooks" width={40} height={40} />,
      title: "Playbooks",
      desc: "Choose the right playbook and offensive/defensive schemes for your team.",
    },
    {
      to: "/guides/team-building/stats",
      icon: <img src="https://i.imgur.com/FVXBTJD.png" alt="Player Stats" width={40} height={40} />,
      title: "Player Stats",
      desc: "Understand which player stats matter most for each position.",
    },
  ];

  const cardStyle = {
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
  };

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
          Team Building Guides
        </h1>
        <p style={{ fontSize: "1.125rem", color: subText }}>
          Build the ultimate team with chemistry, evolution, and player optimization.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
        {/* Top Row - 3 items */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          {topRowGuides.map(({ to, icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              style={cardStyle}
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

        {/* Bottom Row - 3 items */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          {bottomRowGuides.map(({ to, icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              style={cardStyle}
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
    </div>
  );
}