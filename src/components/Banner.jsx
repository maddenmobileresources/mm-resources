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
          <svg viewBox="0 0 128 128" width="92" height="92" role="img" aria-label="Madden Mobile Gridiron phone field logo">
            <defs>
              <linearGradient id="mmgField" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#052e16" />
              </linearGradient>
            </defs>
            <rect x="34" y="6" width="60" height="116" rx="14" fill="#020617" stroke="#facc15" strokeWidth="5" />
            <rect x="41" y="16" width="46" height="96" rx="6" fill="url(#mmgField)" />
            <rect x="41" y="16" width="46" height="14" fill="#1e3a8a" opacity="0.95" />
            <rect x="41" y="98" width="46" height="14" fill="#1e3a8a" opacity="0.95" />
            <path d="M41 30h46M41 98h46" stroke="#f8fafc" strokeWidth="3" />
            <path d="M41 44h46M41 54h46M41 64h46M41 74h46M41 84h46" stroke="#f8fafc" strokeWidth="1.8" opacity="0.78" />
            <path d="M53 39h5M70 39h5M53 49h5M70 49h5M53 59h5M70 59h5M53 69h5M70 69h5M53 79h5M70 79h5M53 89h5M70 89h5" stroke="#f8fafc" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M55 14v-7h18v7M55 114v7h18v-7" stroke="#facc15" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M45 64c8-13 30-13 38 0-8 13-30 13-38 0Z" fill="#f97316" stroke="#facc15" strokeWidth="2.5" />
            <path d="M56 58h16M54 64h20M56 70h16" stroke="#7c2d12" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
            <text x="64" y="69" fill="#020617" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="Arial, sans-serif">MMG</text>
            <circle cx="64" cy="116.5" r="2.4" fill="#334155" />
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

