import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Calendars() {
  const { theme } = useTheme();

  // Calendar months data
  const months = [
    { name: "December", year: 2025, route: "/calendars/dec25" },
    { name: "November", year: 2025, route: "/calendars/nov25" },
    { name: "October", year: 2025, route: "/calendars/oct25" },
    { name: "September", year: 2025, route: "/calendars/sept25" },
    { name: "August", year: 2025, route: "/calendars/aug25" }
  ];

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <h1 className="text-3xl font-bold text-center mb-2">
        Madden Mobile Content Calendar
      </h1>
      
      <p className={`text-center mb-8 max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        Here, you'll find all the important dates surrounding the game including event schedules, player drops, boost durations and much more.
      </p>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map((month) => (
          <Link
            key={month.route}
            to={month.route}
            className={`group rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
              theme === "dark" 
                ? "bg-zinc-800 border border-gray-700 hover:border-blue-500" 
                : "bg-white hover:border-blue-400 border border-gray-200"
            }`}
          >
            <div className="bg-[#1f2937] text-white text-center py-4">
              <h3 className="text-2xl font-bold">{month.name} {month.year}</h3>
            </div>
            
            {/* Calendar Image */}
            <div className="w-full h-64">
              <img
                src="https://i.imgur.com/VcgunYT.png"
                alt={`${month.name} ${month.year} Calendar`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Footer */}
            <div className={`p-4 text-center ${
              theme === "dark" ? "bg-zinc-800" : "bg-white"
            }`}>
              <p className={`font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                View Calendar
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}