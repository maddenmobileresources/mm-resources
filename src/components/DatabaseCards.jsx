import { Link } from "react-router-dom";

export const databaseCards = [
  {
    to: "/databases/players",
    icon: <img src="https://i.imgur.com/X110E3t.png" alt="Player Database" width={40} height={40} />,
    title: "Player Database",
    desc: "Search and compare every player card released in-game",
  },
  {
    to: "/databases/plays",
    icon: <img src="https://i.imgur.com/knTaSn4.png" alt="Playbook Database" width={40} height={40} />,
    title: "Playbook Database",
    desc: "Search and compare every offensive play released in-game",
  },
  {
    to: "/packs",
    icon: <img src="https://i.imgur.com/p8rcT3Y.png" alt="Pack Database" width={40} height={40} />,
    title: "Pack Database",
    desc: "View the contents of various packs available in-game",
  },
];

export function DatabaseCard({ to, icon, title, desc, cardBg, cardBorder, hoverBg, cardText, cardSubText }) {
  return (
    <Link
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
        height: "12.5rem",
        justifyContent: "flex-start",
        backgroundColor: cardBg,
        transition: "all 0.2s ease-out",
        textDecoration: "none",
        color: cardText,
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
        <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
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
        {title}
      </span>
      <p style={{ fontSize: "0.875rem", color: cardSubText }}>{desc}</p>
    </Link>
  );
}
