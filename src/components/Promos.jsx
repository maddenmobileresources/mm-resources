import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Promos() {
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

  const promoGuides = [
    {
      to: "/guides/events/promos/opening-drive",
      icon: <img src="https://i.imgur.com/vduOlkZ.png" alt="Opening Drive" width={40} height={40} />,
      title: "Opening Drive",
    },
    {
      to: "/guides/events/promos/campus-heroes",
      icon: <img src="https://i.imgur.com/CKhkDvF.png" alt="Campus Heroes" width={40} height={40} />,
      title: "Campus Heroes",
    },
    {
      to: "/guides/events/promos/nfl-kickoff",
      icon: <img src="https://i.imgur.com/xVylSSq.png" alt="NFL Kickoff" width={40} height={40} />,
      title: "NFL Kickoff",
    },
    {
      to: "/guides/events/promos/legends",
      icon: <img src="https://i.imgur.com/NqtM3MH.png" alt="Legends" width={40} height={40} />,
      title: "Legends",
    },
    {
      to: "/guides/events/promos/international",
      icon: <img src="https://i.imgur.com/qMYantA.png" alt="International" width={40} height={40} />,
      title: "International",
    },
    {
      to: "/guides/events/promos/most-feared",
      icon: <img src="https://i.imgur.com/64e6Xhh.png" alt="Most Feared" width={40} height={40} />,
      title: "Most Feared",
    },
    {
      to: "/guides/events/promos/breakouts",
      icon: <img src="https://i.imgur.com/JQ7ibja.png" alt="Breakouts" width={40} height={40} />,
      title: "Breakouts",
    },
    {
      to: "/guides/events/promos/record-breakers",
      icon: <img src="https://i.imgur.com/B2jpIA5.png" alt="Record Breakers" width={40} height={40} />,
      title: "Record Breakers",
    },
    {
      to: "/guides/events/promos/feast",
      icon: <img src="https://i.imgur.com/LAL0rGf.png" alt="Feast" width={40} height={40} />,
      title: "Feast",
    },
    {
      to: "/guides/events/promos/goat",
      icon: <img src="https://i.imgur.com/EbS12LB.png" alt="GOAT" width={40} height={40} />,
      title: "GOAT",
    },
    {
      to: "/guides/events/promos/ultimate-freeze",
      icon: <img src="https://i.imgur.com/JBPnW1Z.png" alt="Ultimate Freeze" width={40} height={40} />,
      title: "Ultimate Freeze",
    },
    {
      to: "/guides/events/promos/what-if",
      icon: <img src="https://i.imgur.com/xYaIzTS.png" alt="What If" width={40} height={40} />,
      title: "What If",
    },
    {
      to: "/guides/events/promos/collectors-series",
      icon: <img src="https://i.imgur.com/CsV2nGA.png" alt="Collector's Series" width={40} height={40} />,
      title: "Collector's Series",
    },
    {
      to: "/guides/events/promos/super-bowl",
      icon: <img src="https://i.imgur.com/bDojkkj.png" alt="Super Bowl" width={40} height={40} />,
      title: "Super Bowl",
    },
    {
      to: "/guides/events/promos/fan-favorites",
      icon: <img src="https://i.imgur.com/PpKa3YP.png" alt="Fan Favorites" width={40} height={40} />,
      title: "Fan Favorites",
    },
    {
      to: "/guides/events/promos/team-of-the-year-i",
      icon: <img src="https://i.imgur.com/n5vRbOr.png" alt="Team of the Year I" width={40} height={40} />,
      title: "Team of the Year I",
    },
    {
      to: "/guides/events/promos/team-of-the-year-ii",
      icon: <img src="https://i.imgur.com/7k9PddS.png" alt="Team of the Year II" width={40} height={40} />,
      title: "Team of the Year II",
    },
    {
      to: "/guides/events/promos/sugar-rush",
      icon: <img src="https://i.imgur.com/WXScWSa.png" alt="Sugar Rush" width={40} height={40} />,
      title: "Sugar Rush",
    },
    {
      to: "/guides/events/promos/nfl-draft",
      icon: <img src="https://i.imgur.com/i7D6yrv.png" alt="NFL Draft" width={40} height={40} />,
      title: "NFL Draft",
    },
    {
      to: "/guides/events/promos/collectors-series-ii",
      icon: <img src="https://i.imgur.com/JmREXDZ.png" alt="Collector's Series II" width={40} height={40} />,
      title: "Collector's Series II",
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
          onClick={() => navigate("/guides/events")}
          className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          ← Back to Events Homepage
        </button>
      </div>

      <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold" }}>
          Promo Guides
        </h1>
        <p style={{ fontSize: "1.125rem", color: subText }}>
          Learn about limited-time promotional events and how to get exclusive players.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          justifyItems: "center",
          textAlign: "center",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        {promoGuides.map(({ to, icon, title }) => (
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
                marginTop: "0.75rem",
              }}
            >
              {title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}