const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const routeMonthCodes = {
  January: "jan",
  February: "feb",
  March: "mar",
  April: "apr",
  May: "may",
  June: "jun",
  July: "jul",
  August: "aug",
  September: "sept",
  October: "oct",
  November: "nov",
  December: "dec",
};

const existingMm26Paths = {
  "August 2025": "/calendars/aug25",
  "September 2025": "/calendars/sept25",
  "October 2025": "/calendars/oct25",
  "November 2025": "/calendars/nov25",
  "December 2025": "/calendars/dec25",
};

function makeMonth(monthIndex, year, pathPrefix = "/calendars") {
  const name = monthNames[monthIndex];
  const shortYear = String(year).slice(-2);
  const routeCode = `${routeMonthCodes[name]}${shortYear}`;
  const title = `${name} ${year}`;
  const existingPath = existingMm26Paths[title];

  return {
    name,
    title,
    year,
    monthIndex,
    path: existingPath || `${pathPrefix}/${routeCode}`,
    routeCode,
    hasCustomEvents: Boolean(existingPath),
  };
}

function makeRange(startYear, startMonthIndex, endYear, endMonthIndex, pathPrefix) {
  const months = [];
  let year = startYear;
  let monthIndex = startMonthIndex;

  while (year < endYear || (year === endYear && monthIndex <= endMonthIndex)) {
    months.push(makeMonth(monthIndex, year, pathPrefix));
    monthIndex += 1;
    if (monthIndex > 11) {
      monthIndex = 0;
      year += 1;
    }
  }

  return months;
}

export const calendarSeasons = [
  {
    name: "MM27",
    label: "Madden NFL 27 Mobile",
    path: "/calendars/mm27",
    image: "https://i.imgur.com/4OzjJJY.jpeg",
    months: [],
  },
  {
    name: "MM26",
    label: "Madden NFL 26 Mobile",
    path: "/calendars/mm26",
    image: "https://i.imgur.com/GET5Pur.jpeg",
    months: makeRange(2025, 7, 2026, 7, "/calendars"),
  },
  {
    name: "MM25",
    label: "Madden NFL 25 Mobile",
    path: "/calendars/mm25",
    image: "https://i.imgur.com/8nGhpSI.png",
    months: makeRange(2024, 7, 2025, 7, "/calendars/mm25"),
  },
  {
    name: "MM24",
    label: "Madden NFL 24 Mobile",
    path: "/calendars/mm24",
    image: "https://i.imgur.com/PV20g7a.png",
    months: makeRange(2023, 7, 2024, 7, "/calendars/mm24"),
  },
  {
    name: "MM23",
    label: "Madden NFL 23 Mobile",
    path: "/calendars/mm23",
    image: "https://i.imgur.com/JVABfw6.jpeg",
    months: makeRange(2022, 7, 2023, 7, "/calendars/mm23"),
  },
  {
    name: "MM22",
    label: "Madden NFL 22 Mobile",
    path: "/calendars/mm22",
    image: "https://i.imgur.com/qRB69dn.jpeg",
    months: makeRange(2021, 7, 2022, 7, "/calendars/mm22"),
  },
];

export const calendarMonthRoutes = calendarSeasons
  .flatMap((season) => season.months)
  .filter((month) => !month.hasCustomEvents);

export const calendarSearchPages = calendarSeasons.flatMap((season) => [
  {
    title: `${season.label} Calendar`,
    path: season.path,
    keywords: ["calendar", season.name.toLowerCase(), season.label.toLowerCase(), "schedule", "events"],
  },
  ...season.months.map((month) => ({
    title: `${month.title} Calendar`,
    path: month.path,
    keywords: [
      "calendar",
      month.name.toLowerCase(),
      String(month.year),
      season.name.toLowerCase(),
      "schedule",
      "events",
      "start",
      "ends",
      "boost",
      "expires",
      "promo",
      "duration",
    ],
  })),
]);
