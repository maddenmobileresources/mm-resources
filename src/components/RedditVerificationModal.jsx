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
          <div>
            <p className="font-bold">A verified Reddit account qualifies you for:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                Pack Opener Leaderboard rewards, which includes Reddit MM Points awarded to verified Reddit users who finish in the monthly Top 10.
              </li>
              <li>
                A special gold "Trusted" tag attached to your comments if you've earned the Diamond user flair for achieving 32+ Reddit MM Points on the{" "}
                <a
                  href="https://www.reddit.com/r/MaddenMobileForums/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-orange-500 underline"
                >
                  r/MaddenMobileForums
                </a>{" "}
                subreddit.
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold">How to Verify:</p>
            <p>
              Due to strict restrictions with accessing Reddit's API, sign-in via Reddit is handled manually for now.
            </p>
            <ol className="mt-2 list-decimal space-y-2 pl-5">
              <li>
                First, sign in with Discord on https://mmgridiron.com, which you can do via the{" "}
                <a
                  href="/packs/open"
                  className="font-semibold text-orange-500 underline"
                >
                  Pack Opener
                </a>{" "}
                page or via the comment section of a player/play's individual profile page.
              </li>
              <li>
                Then, DM{" "}
                <a
                  href="https://www.reddit.com/user/retired_doctor/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-orange-500 underline"
                >
                  u/retired_doctor
                </a>{" "}
                on Reddit with your exact Discord username.
              </li>
            </ol>
          </div>

          <div>
            <p className="font-bold">Important:</p>
            <p>
              Send your actual Discord account's username, not your display name or server nickname. That is what allows your Reddit account to be matched to the correct Discord login on this site.
            </p>
          </div>

          <p>
            Once verified, your Reddit username will override your Discord username on the Pack Opener Leaderboard, and the "Trusted" tag will only appear in comment sections of those who qualify for it (i.e. has earned 32+ Reddit MM Points on their Reddit account).
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
