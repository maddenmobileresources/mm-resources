import React from "react";

export default function RedditVerificationModal({ isOpen, onClose, isDark }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-4 py-6">
      <div
        className={`w-full max-w-lg rounded-lg border p-5 shadow-2xl ${
          isDark
            ? "border-slate-700 bg-zinc-900 text-gray-100"
            : "border-gray-200 bg-white text-gray-900"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reddit-verification-title"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="reddit-verification-title" className="text-xl font-bold">
              Reddit Verification
            </h2>
            <p className={`mt-1 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Reddit sign-in is handled manually for now.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`rounded px-2 py-1 text-xl font-bold leading-none ${
              isDark ? "text-gray-300 hover:bg-zinc-800" : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-label="Close Reddit verification information"
          >
            X
          </button>
        </div>

        <div className={`space-y-4 text-sm leading-relaxed ${isDark ? "text-gray-200" : "text-gray-700"}`}>
          <p>
            First, sign in with Discord on this website. Then DM the site admin on Reddit with your exact Discord username.
          </p>

          <div>
            <p className="font-bold">Important:</p>
            <p>
              Send your actual Discord username, not your display name and not a server nickname. That is what allows your Reddit account to be matched to the correct Discord login on this site.
            </p>
          </div>

          <div>
            <p className="font-bold">A verified Reddit account qualifies you for:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                Pack Opener Leaderboard rewards, which are Reddit MM Points awarded to verified Reddit users who finish in the monthly Top 10.
              </li>
              <li>
                A special Trusted comment tag if you have the Diamond user flair for reaching 32+ Reddit MM Points on r/MaddenMobileForums.
              </li>
            </ul>
          </div>

          <p>
            Once verified, your Reddit username can override your Discord username on the Pack Opener Leaderboard. The Trusted tag only appears in comment sections.
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
