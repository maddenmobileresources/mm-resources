import React, { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { DiscordIcon, RedditIcon } from "./IdentityTags";

export default function AuthorContactPopover({ author, isDark, roleColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div ref={wrapperRef} className="author-contact-wrap">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="author-contact-trigger"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {author.name}
      </button>
      <div style={{ color: roleColor, fontSize: "0.9rem" }}>{author.role}</div>

      {isOpen && (
        <div
          className={`author-contact-popover ${isDark ? "author-contact-popover-dark" : "author-contact-popover-light"}`}
          role="dialog"
          aria-label={`${author.name} contact information`}
        >
          <ul className="author-contact-list">
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href="mailto:contact@mmgridiron.com">contact@mmgridiron.com</a>
            </li>
            <li>
              <span className="author-contact-icon author-contact-icon-reddit">
                <RedditIcon />
              </span>
              <a href="https://www.reddit.com/user/retired_doctor/" target="_blank" rel="noreferrer">
                u/retired_doctor
              </a>
            </li>
            <li>
              <span className="author-contact-icon author-contact-icon-discord">
                <DiscordIcon />
              </span>
              <strong>skhip</strong>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
