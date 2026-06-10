import React from "react";
import { Link } from "react-router-dom";
import { Database, CalendarDays, LineChart, MessageCircle, ShieldCheck, Trophy } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function AboutUs() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pageBg = isDark ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900";
  const panel = isDark ? "bg-zinc-800 border-gray-700" : "bg-white border-gray-200";
  const muted = isDark ? "text-gray-300" : "text-gray-600";
  const softPanel = isDark ? "bg-zinc-900 border-gray-700" : "bg-gray-50 border-gray-200";

  const features = [
    {
      icon: Database,
      title: "Databases",
      text: "Search and compare Madden NFL Mobile player cards and plays as they are released in-game.",
    },
    {
      icon: CalendarDays,
      title: "Calendars",
      text: "Track important promo dates, field pass timing, player drops, boost expirations, and other in-game events.",
    },
    {
      icon: LineChart,
      title: "Team Tools",
      text: "Use tools like the Team Analyzer, theme teams, and comparison charts to make lineup decisions easier.",
    },
    {
      icon: Trophy,
      title: "Pack Opener",
      text: "Open simulated packs for fun, compare pull scores, and compete on the monthly leaderboard when signed in.",
    },
  ];

  return (
    <main className={`min-h-screen px-4 py-10 sm:px-6 ${pageBg}`}>
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 text-center">
          <p className={`mb-3 text-sm font-bold uppercase tracking-wide ${isDark ? "text-yellow-400" : "text-blue-700"}`}>
            Built for the Madden Mobile community
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            About Madden Mobile Gridiron
          </h1>
          <p className={`mx-auto max-w-3xl text-lg leading-8 ${muted}`}>
            Madden Mobile Gridiron is a community-built resource hub for Madden NFL Mobile players who want cleaner
            databases, easier comparisons, useful calendars, and practical tools in one place.
          </p>
        </section>

        <section className={`mb-8 rounded-lg border p-6 shadow-lg sm:p-8 ${panel}`}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <h2 className={`mb-4 text-2xl font-bold ${isDark ? "text-yellow-400" : "text-gray-900"}`}>
                Why this site exists
              </h2>
              <div className={`space-y-4 leading-7 ${muted}`}>
                <p>
                  The goal is simple: make Madden NFL Mobile information easier to find, easier to compare, and easier
                  to use while you are building your team.
                </p>
                <p>
                  Instead of digging through scattered screenshots, posts, spreadsheets, and old notes, mmgridiron.com
                  is meant to bring the most useful everyday resources together: player cards, play data, event
                  calendars, pack information, guides, community links, and lineup tools.
                </p>
                <p>
                  This site is built by the community, for the community. It will keep growing as new cards, events,
                  packs, and ideas are added throughout each Madden Mobile season.
                </p>
              </div>
            </div>

            <div className={`rounded-lg border p-5 ${softPanel}`}>
              <h3 className="mb-3 text-xl font-bold">Quick links</h3>
              <div className="grid gap-3">
                <Link className="rounded bg-blue-600 px-4 py-3 text-center font-bold text-white hover:bg-blue-700" to="/databases">
                  Browse Databases
                </Link>
                <Link className="rounded bg-blue-600 px-4 py-3 text-center font-bold text-white hover:bg-blue-700" to="/calendars">
                  View Calendars
                </Link>
                <Link className="rounded bg-blue-600 px-4 py-3 text-center font-bold text-white hover:bg-blue-700" to="/packs/open">
                  Open Packs
                </Link>
                <Link className="rounded bg-blue-600 px-4 py-3 text-center font-bold text-white hover:bg-blue-700" to="/community">
                  Community
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className={`rounded-lg border p-5 shadow-md ${panel}`}>
              <Icon className={isDark ? "mb-4 text-yellow-400" : "mb-4 text-blue-600"} size={32} />
              <h3 className="mb-2 text-xl font-bold">{title}</h3>
              <p className={`leading-6 ${muted}`}>{text}</p>
            </div>
          ))}
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className={`rounded-lg border p-6 shadow-md ${panel}`}>
            <div className="mb-4 flex items-center gap-3">
              <MessageCircle className={isDark ? "text-yellow-400" : "text-blue-600"} size={28} />
              <h2 className="text-2xl font-bold">Community comments</h2>
            </div>
            <p className={`leading-7 ${muted}`}>
              Comments are tied to a signed-in Discord account so conversations have a real community identity attached
              to them. Reddit verification can be added manually for users who want their Reddit username displayed,
              leaderboard reward eligibility, or a Trusted tag when they qualify.
            </p>
          </div>

          <div className={`rounded-lg border p-6 shadow-md ${panel}`}>
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className={isDark ? "text-yellow-400" : "text-blue-600"} size={28} />
              <h2 className="text-2xl font-bold">Privacy and safety</h2>
            </div>
            <p className={`leading-7 ${muted}`}>
              Sign-ins are handled through the login provider, such as Discord. mmgridiron.com does not ask for, see, or
              store your account password. The site only uses basic profile identity needed for comments, leaderboard
              names, and community verification features.
            </p>
          </div>
        </section>

        <section className={`rounded-lg border p-6 shadow-md ${softPanel}`}>
          <h2 className="mb-3 text-2xl font-bold">Fan-site disclaimer</h2>
          <div className={`space-y-3 leading-7 ${muted}`}>
            <p>
              Madden Mobile Gridiron is an unofficial fan-made website. It is not affiliated with, endorsed by, or
              sponsored by Electronic Arts, EA SPORTS, the NFL, or any related rights holders.
            </p>
            <p>
              Madden, Madden NFL, Madden Mobile, EA SPORTS, NFL team names, player names, logos, and related imagery are
              the property of their respective owners. Site content is provided as a community resource for informational
              and entertainment purposes.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
