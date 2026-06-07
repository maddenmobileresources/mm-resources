import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Events() {
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

  const topRowGuides = [
    {
      to: "/guides/events/field-pass",
      icon: <img src="https://i.imgur.com/f90IByJ.png" alt="Field Pass" width={40} height={40} />,
      title: "Field Pass",
      desc: "Complete guide to maximizing your Field Pass rewards and progression.",
    },
    {
      to: "/guides/events/promos",
      icon: <img src="https://i.imgur.com/qa53Lvi.png" alt="Promos" width={40} height={40} />,
      title: "Promos",
      desc: "Learn about limited-time promotional events and how to get exclusive players.",
    },
    {
      to: "/guides/events/spotlight-pass",
      icon: <img src="https://i.imgur.com/eS9I9tj.png" alt="Spotlight Pass" width={40} height={40} />,
      title: "Spotlight Pass",
      desc: "Optimize your Spotlight Pass strategy to unlock premium content.",
    },
    {
      to: "/guides/events/point-attack",
      icon: <img src="https://i.imgur.com/stqBMaS.png" alt="Point Attack" width={40} height={40} />,
      title: "Point Attack",
      desc: "Master Point Attack events to earn valuable rewards efficiently.",
    },
  ];

  const bottomRowGuides = [
    {
      to: "/guides/events/team-of-the-week",
      icon: <img src="https://i.imgur.com/ZWvpzBF.png" alt="Team of the Week" width={40} height={40} />,
      title: "Team of the Week",
      desc: "Earn weekly standout players based on real NFL performances.",
    },
    {
      to: "/guides/events/team-diamonds",
      icon: <img src="https://i.imgur.com/jLOUT7G.png" alt="Team Diamonds" width={40} height={40} />,
      title: "Team Diamonds",
      desc: "Earn weekly standout players not based on real NFL performances.",
    },
    {
      to: "/guides/events/madden-heroes",
      icon: <img src="https://i.imgur.com/5Xoq6i0.png" alt="Madden Heroes" width={40} height={40} />,
      title: "Madden Heroes",
      desc: "Earn exclusive players by participating in special Madden Heroes events.",
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
          Event Guides
        </h1>
        <p style={{ fontSize: "1.125rem", color: subText }}>
          Master different event types to maximize your rewards.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
        {/* Top Row */}
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

        {/* Bottom Row */}
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
    </div>
  );
}