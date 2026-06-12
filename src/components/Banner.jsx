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
          <img
            src="/brand/mmgridiron-logo-icon.png"
            alt=""
            className="h-[92px] w-[92px] object-contain"
          />
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

