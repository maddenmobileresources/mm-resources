import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { calendarSeasons } from "../data/calendarData";

export default function CalendarSeason({ seasonName }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const season = calendarSeasons.find((item) => item.name === seasonName);

  if (!season) return null;

  return (
    <main className={`min-h-screen px-6 py-10 ${isDark ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-2 text-4xl font-bold">{season.label} Calendar</h1>
        <p className={`mx-auto mb-10 max-w-2xl text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Choose a month to browse.
        </p>

        {season.months.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {season.months.map((month) => (
              <Link
                key={month.path}
                to={month.path}
                className={`group overflow-hidden rounded-lg border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-2xl ${
                  isDark ? "border-gray-700 bg-zinc-800 text-gray-100" : "border-gray-200 bg-white text-gray-900"
                }`}
              >
                <div className="bg-[#1f2937] px-4 py-4 text-center text-white">
                  <h3 className="text-2xl font-bold">{month.title}</h3>
                </div>
                <div className="h-48 w-full">
                  <img
                    src={season.image}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    aria-hidden="true"
                  />
                </div>
                <div className={`p-4 text-center ${isDark ? "bg-zinc-800" : "bg-white"}`}>
                  <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>View Calendar</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`mx-auto max-w-xl rounded-lg border p-8 ${isDark ? "border-gray-700 bg-zinc-800" : "border-gray-300 bg-white"}`}>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>Monthly calendars for this season will be added here.</p>
          </div>
        )}
      </div>
    </main>
  );
}
