import React from "react";

export default function HeaderBanner() {
  return (
    <div
      className="w-full text-white shadow-md"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(250,204,21,0.18), transparent 28%), linear-gradient(90deg, #111827 0%, #0f172a 42%, #111827 100%)",
        borderBottom: "1px solid rgba(148,163,184,0.28)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center gap-5 sm:px-6 md:justify-between">
        <div className="flex min-w-0 flex-col leading-none">
          <div className="text-3xl font-black tracking-tight drop-shadow-lg sm:text-5xl">
            <span style={{ color: "#facc15" }}>mm</span>
            <span style={{ color: "#f8fafc" }}>gridiron</span>
            <span style={{ color: "#f97316" }}>.com</span>
          </div>
        </div>

        <div
          className="hidden h-24 w-28 shrink-0 items-center justify-center rounded-full md:flex"
          style={{
            background: "linear-gradient(180deg, rgba(34,197,94,0.2), rgba(15,23,42,0.62))",
            border: "1px solid rgba(250,204,21,0.42)",
            boxShadow: "0 0 30px rgba(250,204,21,0.16)",
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 120 120" width="82" height="82" role="img" aria-label="Football field icon">
            <rect x="18" y="16" width="84" height="88" rx="14" fill="#14532d" stroke="#facc15" strokeWidth="5" />
            <line x1="60" y1="20" x2="60" y2="100" stroke="#f8fafc" strokeWidth="4" strokeDasharray="8 8" />
            <line x1="30" y1="34" x2="90" y2="34" stroke="#f8fafc" strokeWidth="3" opacity="0.85" />
            <line x1="30" y1="86" x2="90" y2="86" stroke="#f8fafc" strokeWidth="3" opacity="0.85" />
            <path d="M39 60c9-17 33-17 42 0-9 17-33 17-42 0Z" fill="#92400e" stroke="#f8fafc" strokeWidth="3" />
            <path d="M51 55h18M51 60h18M51 65h18" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="hidden min-w-0 flex-col items-start text-right md:flex">
          <h1 className="text-2xl font-serif font-bold tracking-wide drop-shadow-lg lg:text-4xl">
            Madden Mobile Gridiron
          </h1>
        </div>
      </div>
    </div>
  );
}

