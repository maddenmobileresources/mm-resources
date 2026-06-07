import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Guides() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "#18181B" : "#f9fafb";
  const textColor = isDark ? "#f5f5f5" : "#111827";
  const subText = isDark ? "#aaa" : "#4b5563";

  const cardBg = "#2a2a2a";
  const cardBorder = "#444";
  const hoverBg = "#333";
  const cardText = "#f5f5f5";
  const cardSubText = "#aaa";

  const guides = [
    {
      to: "/guides/events",
      icon: <img src="https://i.imgur.com/vfZ2ctc.png" alt="Events" width={40} height={40} />,
      title: "Events",
      desc: "A walkthrough of different in-game events and how to maximize rewards.",
    },
    {
      to: "/guides/competitive",
      icon: <img src="https://i.imgur.com/LavpUWC.png" alt="Competitive" width={40} height={40} />,
      title: "Competitive",
      desc: "Master competitive game modes and climb the rankings.",
    },
    {
      to: "/guides/leagues",
      icon: <img src="https://i.imgur.com/IGYAJFV.png" alt="Leagues" width={40} height={40} />,
      title: "Leagues",
      desc: "Learn strategies for league-based competitions and tournaments.",
    },
    {
      to: "/guides/team-building",
      icon: <img src="https://i.imgur.com/EHnL3Fw.png" alt="Team Building" width={40} height={40} />,
      title: "Team Building",
      desc: "Build the ultimate team with chemistry, evolution, and player optimization.",
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
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold" }}>
          Madden Mobile Guides & Tips
        </h1>
        <p style={{ fontSize: "1.125rem", color: subText }}>
          Explore helpful guides for mastering different aspects of Madden Mobile.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(2, 1fr)",
          justifyItems: "center",
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        {guides.map(({ to, icon, title, desc }) => (
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