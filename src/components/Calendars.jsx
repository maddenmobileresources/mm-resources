import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const calendarSeasons = [
  { label: "Madden NFL 27 Mobile", path: "/calendars/mm27", image: "https://i.imgur.com/4OzjJJY.jpeg" },
  { label: "Madden NFL 26 Mobile", path: "/calendars/mm26", image: "https://i.imgur.com/GET5Pur.jpeg" },
  { label: "Madden NFL 25 Mobile", path: "/calendars/mm25", image: "https://i.imgur.com/8nGhpSI.png" },
  { label: "Madden NFL 24 Mobile", path: "/calendars/mm24", image: "https://i.imgur.com/PV20g7a.png" },
  { label: "Madden NFL 23 Mobile", path: "/calendars/mm23", image: "https://i.imgur.com/JVABfw6.jpeg" },
  { label: "Madden NFL 22 Mobile", path: "/calendars/mm22", image: "https://i.imgur.com/qRB69dn.jpeg" },
];

export default function Calendars() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className={`min-h-screen px-6 py-10 ${isDark ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="mb-2 text-4xl font-bold">Calendars</h1>
        <p className={`mx-auto mb-10 max-w-2xl text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Choose a Madden Mobile season calendar to browse.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {calendarSeasons.map((season) => (
            <Link
              key={season.path}
              to={season.path}
              className={`group flex min-h-44 flex-col items-center justify-center rounded-lg border p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl ${
                isDark ? "border-gray-700 bg-zinc-800 text-gray-100" : "border-gray-300 bg-white text-gray-900"
              }`}
            >
              <img
                src={season.image}
                alt=""
                className="mb-4 h-16 w-16 rounded object-cover"
                loading="lazy"
                aria-hidden="true"
              />
              <span className="text-xl font-bold">{season.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
