import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const categories = [
  "All",
  "Promo starts",
  "Promo ends",
  "Field Pass starts",
  "Field Pass ends",
  "New players",
  "Mythic Boost ends",
  "Competitive",
  "Leagues",
  "Spotlight Pass",
  "Point Attack",
  "Other",
];

const categoryColors = {
  "Promo starts": "#ff6b6b",
  "Promo ends": "#ff9f6e",
  "Field Pass starts": "#ffd93d",
  "Field Pass ends": "#f7b733",
  "New players": "#7ee0c2",
  "Mythic Boost ends": "#a78bfa",
  Competitive: "#74c0fc",
  Leagues: "#63e6be",
  "Spotlight Pass": "#c77dff",
  "Point Attack": "#f783ac",
  Other: "#adb5bd",
};

function generateMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const grid = [];
  let week = [];

  for (let i = 0; i < firstDay.getDay(); i += 1) {
    week.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    week.push(new Date(year, month, day));
    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }

  while (week.length && week.length < 7) {
    week.push(null);
  }
  if (week.length) grid.push(week);

  return grid;
}

function DayCell({ date, theme }) {
  return (
    <div
      className={`calendar-day-cell border min-h-[120px] p-1 flex flex-col ${
        theme === "dark" ? "border-gray-600 bg-zinc-800" : "border-black bg-gray-300"
      }`}
    >
      <div className={`text-sm font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
        {date ? date.getDate() : ""}
      </div>
    </div>
  );
}

export default function GenericCalendarMonth({ title, year, monthIndex }) {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const grid = generateMonthGrid(year, monthIndex);

  return (
    <div
      className={`calendar-page p-4 min-h-screen ${
        theme === "dark" ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Link
        to="/calendars"
        className="calendar-back-button inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ← Back to Calendars
      </Link>

      <h1 className="calendar-title text-3xl font-bold text-center mb-6">
        Madden Mobile Content Calendar
      </h1>

      <div
        className={`calendar-filter-panel mb-6 p-4 rounded-lg shadow ${
          theme === "dark" ? "bg-zinc-800 border border-gray-700" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold mb-3">Categories</h2>
        <div className="calendar-category-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`calendar-category-button px-3 py-2 rounded text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "text-black"
                  : theme === "dark"
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
              style={
                selectedCategory === category
                  ? { backgroundColor: category === "All" ? "#facc15" : categoryColors[category] || "#d3d3d3" }
                  : {}
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="calendar-scroll-wrap mb-10">
        <div className={`calendar-month-grid grid grid-cols-7 border ${theme === "dark" ? "border-gray-600" : "border-black"}`}>
          <div
            className="calendar-month-heading col-span-7 text-center font-bold p-2 text-2xl"
            style={{ backgroundColor: "#1f2937", color: "#ffffff" }}
          >
            {title}
          </div>

          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <div
              key={day}
              className={`calendar-day-heading border text-center font-bold p-1 ${
                theme === "dark" ? "border-gray-600 bg-gray-700 text-gray-100" : "border-black bg-gray-200 text-gray-900"
              }`}
            >
              {day}
            </div>
          ))}

          {grid.map((week, weekIndex) =>
            week.map((date, dayIndex) => (
              <DayCell key={date ? date.toISOString() : `empty-${weekIndex}-${dayIndex}`} date={date} theme={theme} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
