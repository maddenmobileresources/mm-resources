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
  const homeDatabaseCards = databaseCards.map((card) =>
    card.title === "Pack Database"
      ? {
          ...card,
          icon: <img src="https://i.imgur.com/I3XeEAc.png" alt="Pack Database" width={40} height={40} />,
        }
      : card
  );
  const homeCards = [
    ...homeDatabaseCards,
    {
      to: "/calendars",
      icon: <img src="https://i.imgur.com/egn68zm.png" alt="Event Schedule" width={40} height={40} />,
      title: "Event Schedule",
      desc: "View calendars of all the important events and dates as they happen in-game",
    },
    {
      to: "/defensive-strategy",
      icon: <img src="https://i.imgur.com/Ybg4ePs.png" alt="Defensive Strategy" width={40} height={40} />,
      title: "Defensive Strategy",
      desc: "Review defensive plays ranked by collected interception data",
    },
    {
      to: "/guides",
      icon: <img src="https://i.imgur.com/Lucm7XZ.png" alt="Guides" width={40} height={40} />,
      title: "Guides",
      desc: "Read in-depth walkthroughs to various events and features",
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
      desc: "Stay informed on the latest Madden Mobile updates as they are officially announced",
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
      desc: "Connect with the Madden Mobile community on various different platforms",
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
            Madden Mobile Gridiron
          </h1>
        </div>
        <p style={{ fontSize: "1.125rem", color: subText }}>
          Home for all things Madden NFL Mobile
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
