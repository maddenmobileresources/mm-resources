import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const categoryColors = {
  "Promo starts": "#ff6b6b",
  "Promo ends": "#ffa07a",
  "Field Pass starts": "#ffd700",
  "Field Pass ends": "#ffed4e",
  "New players release": "#98d8c8",
  "Mythic Boost ends": "#ff69b4",
  "Competitive": "#87ceeb",
  "Leagues": "#9370db",
  "Spotlight Pass": "#dda0dd",
  "Point Attack": "#f4a460",
  "Other": "#d3d3d3"
};

const events = {
  "2025-08-01": [
    { title: "LvL season ends", category: "Leagues" },
    { title: "New LvL season starts", category: "Leagues" },
    { title: "Bingo minigame starts", category: "Other" }
  ],
  "2025-08-05": [
    { title: "Summer Promo starts", category: "Promo starts" },
    { title: "New players available", category: "New players release" }
  ],
  "2025-08-12": [
    { title: "Tournament begins", category: "Competitive" }
  ],
  "2025-08-15": [
    { title: "Field Pass Season 2 starts", category: "Field Pass starts" }
  ],
  "2025-08-20": [
    { title: "Summer Promo ends", category: "Promo ends" }
  ],
  "2025-08-25": [
    { title: "Mythic Boost expires", category: "Mythic Boost ends" }
  ]
};

function generateMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const grid = [];
  let week = [];

  for (let i = 0; i < first.getDay(); i++) week.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    grid.push(week);
  }
  return grid;
}

function DayCell({ date, eventsForDay, theme, selectedCategory }) {
  const filteredEvents = selectedCategory === "All"
    ? eventsForDay
    : eventsForDay?.filter(ev => ev.category === selectedCategory);

  return (
    <div className={`calendar-day-cell border min-h-[120px] p-1 flex flex-col ${
      theme === "dark"
        ? "border-gray-600 bg-zinc-800"
        : "border-black bg-gray-300"
    }`}>
      <div className={`text-sm font-bold ${
        theme === "dark" ? "text-gray-100" : "text-gray-900"
      }`}>
        {date ? date.getDate() : ""}
      </div>
      <div className="calendar-event-list mt-1 text-xs space-y-1">
        {filteredEvents?.map((ev, i) => (
          <div
            key={i}
            className="calendar-event-pill px-1 py-0.5 rounded text-black font-medium"
            style={{ backgroundColor: categoryColors[ev.category] || "#d3d3d3" }}
          >
            • {ev.title}
          </div>
        ))}
      </div>
    </div>
  );
}

function MonthCalendar({ year, month, theme, selectedCategory }) {
  const grid = generateMonthGrid(year, month);
  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

  return (
    <div className="calendar-scroll-wrap mb-10">
      <div className={`calendar-month-grid grid grid-cols-7 border ${
        theme === "dark" ? "border-gray-600" : "border-black"
      }`}>
        {/* Month/Year Header Row */}
        <div
  className="calendar-month-heading col-span-7 text-center font-bold p-2 text-2xl"
          style={{ backgroundColor: "#1f2937", color: "#ffffff" }}
        >
          {monthName} {year}
        </div>

        {/* Day Headers */}
        {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((day, i) => (
          <div key={i} className={`calendar-day-heading border text-center font-bold p-1 ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-gray-100"
              : "border-black bg-gray-200 text-gray-900"
          }`}>
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {grid.map((week, i) =>
          week.map((date, j) => {
            const key = date
              ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
              : `empty-${i}-${j}`;
            return (
              <DayCell
                key={key}
                date={date}
                eventsForDay={date ? events[key] : []}
                theme={theme}
                selectedCategory={selectedCategory}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default function Aug25() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Promo starts",
    "Promo ends",
    "Field Pass starts",
    "Field Pass ends",
    "New players release",
    "Mythic Boost ends",
    "Competitive",
    "Leagues",
    "Spotlight Pass",
    "Point Attack",
    "Other"
  ];

  return (
    <div className={`calendar-page p-4 min-h-screen ${
      theme === "dark" ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="calendar-back-button inline-block mt-[-8px] mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        ← Back to Calendars Homepage
      </button>

      <h1 className="calendar-title text-3xl font-bold text-center mb-6 mt-[-52px]">
        Madden Mobile Content Calendar
      </h1>

      {/* Filter and Disclaimer Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6 justify-between">
        {/* Left: Categories Filter */}
        <div className={`calendar-filter-panel p-4 rounded-lg ${
          theme === "dark" ? "bg-zinc-800" : "bg-white"
        } shadow-md`}>
          <h2 className="text-xl font-bold mb-3">Categories</h2>
          <div className="calendar-category-grid grid grid-cols-4 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`calendar-category-button px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#fbbf24] text-black"
                    : theme === "dark"
                    ? "bg-zinc-700 text-gray-100 hover:bg-zinc-600"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Time Disclaimer */}
        <div className={`p-4 rounded-lg ${
          theme === "dark" ? "bg-zinc-800" : "bg-white"
        } shadow-md flex-1 max-w-xl`}>
          <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            <strong>Note:</strong> All of these events occur at 10:30am ET with the exception of the following:
          </p>
          <ul className={`mt-2 ml-4 text-sm space-y-1 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            <li>• League Siege season starts at 3pm ET</li>
            <li>• League Siege season ends at 1pm ET</li>
            <li>• LvL season starts at 1pm ET</li>
            <li>• LvL season ends at 11am ET</li>
          </ul>
        </div>
      </div>

      <MonthCalendar year={2025} month={7} theme={theme} selectedCategory={selectedCategory} />
    </div>
  );
}
