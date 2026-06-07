import { useTheme } from "../context/ThemeContext";
import { DatabaseCard, databaseCards } from "./DatabaseCards";

export default function Home() {
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
  const homeCards = [
    ...databaseCards,
    {
      to: "/calendars",
      icon: <img src="https://i.imgur.com/egn68zm.png" alt="Event Schedule" width={40} height={40} />,
      title: "Event Schedule",
      desc: "View the event schedule in any timezone and set reminders for future events",
    },
    {
      to: "/packs",
      icon: <img src="https://i.imgur.com/I3XeEAc.png" alt="Pack Contents" width={40} height={40} />,
      title: "Pack Contents",
      desc: "View current and upcoming marketplace packs, costs, probabilities, and limits",
    },
    {
      to: "/guides",
      icon: <img src="https://i.imgur.com/Lucm7XZ.png" alt="Guides" width={40} height={40} />,
      title: "Guides",
      desc: "Read in-depth strategy and gameplay guides to improve your Madden Mobile team",
    },
    {
      to: "/theme-teams",
      icon: <img src="https://i.imgur.com/xVylSSq.png" alt="Theme Teams" width={40} height={40} />,
      title: "Theme Teams",
      desc: "Explore theme team builds and find the best players for your favorite NFL franchise",
    },
    {
      to: "/team-analyzer",
      icon: <img src="https://i.imgur.com/jeL7lWU.jpeg" alt="Team Analyzer" width={40} height={40} />,
      title: "Team Analyzer",
      desc: "Build your lineup, calculate boosted Team OVR, and preview player upgrades",
    },
    {
      to: "/news",
      icon: <img src="https://i.imgur.com/wHMo6hX.png" alt="News" width={40} height={40} />,
      title: "News",
      desc: "Stay updated with the latest Madden Mobile news, updates, and patch notes",
    },
    {
      to: "/faq",
      icon: <img src="https://i.imgur.com/2PsnDb4.png" alt="FAQ" width={40} height={40} />,
      title: "FAQ",
      desc: "Find answers to the most commonly asked Madden Mobile questions",
    },
    {
      to: "/community",
      icon: <img src="https://i.imgur.com/LavpUWC.png" alt="Community" width={40} height={40} />,
      title: "Community",
      desc: "Connect with the Madden Mobile community to chat, trade, and share tips",
    },
    {
      to: "/packs/open",
      icon: <img src="https://i.imgur.com/GT9XmjD.png" alt="Pack Opener" width={40} height={40} />,
      title: "Pack Opener",
      desc: "Open simulated packs and qualify for this month's Top 10 Leaderboard",
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
      {/* Title */}
      <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <h1 style={{ fontSize: "2.25rem", fontWeight: "bold" }}>
            Madden Mobile Resources
          </h1>
        </div>
        <p style={{ fontSize: "1.125rem", color: subText }}>
          All your players, calendars, and packs in one place
        </p>
      </header>

      {/* Grid of cards */}
      <div
        className="home-card-grid"
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(8, 7rem)",
          justifyContent: "center",
          justifyItems: "center",
          textAlign: "center",
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        {homeCards.map(({ to, icon, title, desc }, index) => (
          <div key={to} className={`home-card-grid-item home-card-${index + 1}`}>
            <DatabaseCard
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
          </div>
        ))}
      </div>
    </div>
  );
}
