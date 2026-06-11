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
          <svg viewBox="0 0 128 128" width="88" height="88" role="img" aria-label="Madden Mobile Gridiron logo">
            <defs>
              <linearGradient id="mmgShieldGold" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="48%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="mmgField" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="55%" stopColor="#166534" />
                <stop offset="100%" stopColor="#052e16" />
              </linearGradient>
            </defs>
            <path
              d="M64 8 111 25v38c0 29-18 48-47 57-29-9-47-28-47-57V25L64 8Z"
              fill="#0f172a"
              stroke="url(#mmgShieldGold)"
              strokeWidth="6"
            />
            <path d="M64 20 98 32v29c0 21-12 35-34 43-22-8-34-22-34-43V32L64 20Z" fill="url(#mmgField)" />
            <path d="M64 23v78" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="8 8" opacity="0.86" />
            <path d="M38 42h52M38 58h52M38 74h52" stroke="#e2e8f0" strokeWidth="2.5" opacity="0.72" />
            <path d="M45 35v-8h38v8M45 93v8h38v-8" stroke="#facc15" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M40 63c10-18 38-18 48 0-10 18-38 18-48 0Z"
              fill="#92400e"
              stroke="#fff7ed"
              strokeWidth="4"
            />
            <path d="M55 57h18M53 63h22M55 69h18" stroke="#fff7ed" strokeWidth="3" strokeLinecap="round" />
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

