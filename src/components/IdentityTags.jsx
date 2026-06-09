import React from "react";

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 fill-current">
      <path d="M19.5 5.2A16 16 0 0 0 15.7 4l-.2.4c1.4.4 2 .9 2.7 1.5a11 11 0 0 0-4.6-1.4h-.2a12 12 0 0 0-5.1 1.4c.8-.6 1.5-1.1 2.8-1.5L10.9 4a16 16 0 0 0-3.8 1.2C4.7 8.8 4.2 12.3 4.4 15.8a15 15 0 0 0 4.6 2.3l.9-1.4a6 6 0 0 1-1.4-.7l.3-.2a9.7 9.7 0 0 0 8.4 0l.3.2c-.4.3-.9.5-1.4.7l.9 1.4a15 15 0 0 0 4.6-2.3c.3-4.1-.6-7.6-2.1-10.6ZM9.2 14.1c-.8 0-1.4-.7-1.4-1.5s.6-1.5 1.4-1.5 1.4.7 1.4 1.5-.6 1.5-1.4 1.5Zm5.6 0c-.8 0-1.4-.7-1.4-1.5s.6-1.5 1.4-1.5 1.4.7 1.4 1.5-.6 1.5-1.4 1.5Z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 fill-current">
      <path d="M20.9 11.1a2.4 2.4 0 0 0-4-.9 10 10 0 0 0-4.3-1l.7-3.1 2.2.5a1.8 1.8 0 1 0 .3-1.2l-3-.7a.7.7 0 0 0-.8.5l-.9 4a10 10 0 0 0-4.1 1 2.4 2.4 0 1 0-2.6 3.9v.3c0 2.9 3.4 5.2 7.6 5.2s7.6-2.3 7.6-5.2v-.3a2.4 2.4 0 0 0 1.3-3Zm-12.7 3a1.4 1.4 0 1 1 2.8 0 1.4 1.4 0 0 1-2.8 0Zm7.6 2.7c-.8.8-2.1 1.1-3.8 1.1s-3-.4-3.8-1.1a.5.5 0 0 1 .7-.8c.6.5 1.6.8 3.1.8s2.5-.3 3.1-.8a.5.5 0 0 1 .7.8Zm-1-1.4a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z" />
    </svg>
  );
}

export function IdentityTags({ profile, fallbackDiscordName, compact = false }) {
  const discordName = profile?.discordUsername || profile?.discordDisplayName || fallbackDiscordName;
  const redditName = profile?.redditVerified && profile?.redditUsername ? profile.redditUsername : "";
  const isTrusted = Boolean(profile?.trusted);

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {discordName && (
        <span className={`inline-flex items-center gap-1 rounded-md bg-[#5865F2] px-2 py-1 font-bold leading-none text-white ${compact ? "text-[10px]" : "text-xs"}`}>
          <DiscordIcon />
          {discordName}
        </span>
      )}
      {redditName && (
        <span className={`inline-flex items-center gap-1 rounded-md bg-[#FF4500] px-2 py-1 font-bold leading-none text-white ${compact ? "text-[10px]" : "text-xs"}`}>
          <RedditIcon />
          u/{redditName}
        </span>
      )}
      {isTrusted && (
        <span className={`inline-flex items-center rounded-md bg-[#f5a400] px-2 py-1 font-bold leading-none text-gray-950 ${compact ? "text-[10px]" : "text-xs"}`}>
          Trusted
        </span>
      )}
    </span>
  );
}
