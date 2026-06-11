import { useTheme } from "../context/ThemeContext";
import { DatabaseCard, databaseCards } from "./DatabaseCards";

export default function Databases() {
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
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold" }}>Databases</h1>
        <p style={{ fontSize: "1.125rem", color: subText }}>
          Choose a Madden Mobile database to browse.
        </p>
      </header>

      <div
        className="database-card-grid"
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(3, 14rem)",
          justifyItems: "center",
          textAlign: "center",
          maxWidth: "46rem",
          width: "100%",
        }}
      >
        {databaseCards.map(({ to, icon, title, desc }) => (
          <DatabaseCard
            key={to}
            to={to}
            icon={icon}
            title={title}
            desc={desc}
            cardBg={cardBg}
            cardBorder={cardBorder}
            hoverBg={hoverBg}
            cardText={cardText}
            cardSubText={cardSubText}
          />
        ))}
      </div>
    </div>
  );
}
