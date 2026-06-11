import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const categoryConfig = {
  players: {
    title: "Player Database",
    subtitle: "Choose a player database to browse.",
    to: "/players",
    buttonLabel: "Madden NFL 26 Mobile",
    description: "Search and compare every player card released in MM26",
    icon: <img src="https://i.imgur.com/ZjkXbgB.png" alt="Madden NFL 26 Mobile Player Database" width={40} height={40} />,
  },
  plays: {
    title: "Playbook Database",
    subtitle: "Choose a playbook database to browse.",
    to: "/plays",
    buttonLabel: "Madden NFL 26 Mobile",
    description: "Search and compare every offensive play released in MM26",
    icon: <img src="https://i.imgur.com/ZjkXbgB.png" alt="Madden NFL 26 Mobile Playbook Database" width={40} height={40} />,
  },
};

export default function DatabaseCategory({ type }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const config = categoryConfig[type] ?? categoryConfig.players;

  const bgColor = isDark ? "#18181B" : "#f9fafb";
  const textColor = isDark ? "#f5f5f5" : "#111827";
  const subText = isDark ? "#aaa" : "#4b5563";
  const cardBg = "#2a2a2a";
  const cardBorder = "#444";
  const hoverBg = "#333";

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
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold" }}>{config.title}</h1>
        <p style={{ fontSize: "1.125rem", color: subText }}>{config.subtitle}</p>
      </header>

      <Link
        to={config.to}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: `1px solid ${cardBorder}`,
          borderRadius: "0.75rem",
          padding: "1.5rem",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          width: "14rem",
          minHeight: "12.5rem",
          justifyContent: "flex-start",
          backgroundColor: cardBg,
          transition: "all 0.2s ease-out",
          textDecoration: "none",
          color: "#f5f5f5",
          textAlign: "center",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = cardBg)}
      >
        <div
          style={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "0.75rem",
          }}
        >
          {config.icon}
        </div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "2.25rem",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontSize: "0.875rem",
            marginBottom: "0.25rem",
            lineHeight: 1.2,
          }}
        >
          {config.buttonLabel}
        </span>
        <p style={{ fontSize: "0.875rem", color: "#aaa" }}>{config.description}</p>
      </Link>
    </div>
  );
}
