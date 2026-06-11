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
          className="hidden h-24 w-28 shrink-0 items-center justify-center md:flex"
          style={{
            filter: "drop-shadow(0 0 22px rgba(250,204,21,0.22))",
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 128 128" width="92" height="92" role="img" aria-label="American football field logo">
            <defs>
              <linearGradient id="mmgField" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#052e16" />
              </linearGradient>
            </defs>
            <rect x="14" y="18" width="100" height="92" rx="10" fill="#0f172a" stroke="#facc15" strokeWidth="5" />
            <rect x="22" y="26" width="84" height="76" rx="5" fill="url(#mmgField)" />
            <rect x="22" y="26" width="15" height="76" fill="#1e3a8a" opacity="0.92" />
            <rect x="91" y="26" width="15" height="76" fill="#1e3a8a" opacity="0.92" />
            <path d="M37 26v76M47 26v76M57 26v76M64 26v76M71 26v76M81 26v76M91 26v76" stroke="#f8fafc" strokeWidth="2.4" opacity="0.88" />
            <path d="M41 41h4M41 51h4M41 61h4M41 71h4M41 81h4M83 41h4M83 51h4M83 61h4M83 71h4M83 81h4" stroke="#f8fafc" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M25 31h8M25 97h8M95 31h8M95 97h8" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
            <path d="M14 46h-7v36h7M114 46h7v36h-7" stroke="#facc15" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M52 64c6-11 18-11 24 0-6 11-18 11-24 0Z" fill="#92400e" stroke="#fff7ed" strokeWidth="3" />
            <path d="M59 60h10M58 64h12M59 68h10" stroke="#fff7ed" strokeWidth="2" strokeLinecap="round" />
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

