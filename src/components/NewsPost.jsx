import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { newsPosts } from "../data/newsPosts";

export default function NewsPost() {
  const { postId } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const post = newsPosts.find((item) => item.id === postId);

  const pageBg = isDark ? "#18181B" : "#f9fafb";
  const textColor = isDark ? "#f5f5f5" : "#111827";
  const mutedText = isDark ? "#cbd5e1" : "#4b5563";
  const cardBg = isDark ? "#27272a" : "#ffffff";
  const cardBorder = isDark ? "#3f3f46" : "#e5e7eb";

  if (!post) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: pageBg, color: textColor, padding: "2rem 1rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <Link to="/news" style={{ color: "#facc15", fontWeight: 700, textDecoration: "none" }}>
            Back to News
          </Link>
          <div style={{ marginTop: "2rem", backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "0.75rem", padding: "2rem" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>Article not found</h1>
            <p style={{ color: mutedText }}>This news post may have moved or may not exist yet.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: pageBg, color: textColor, padding: "2rem 1rem" }}>
      <article style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Link to="/news" style={{ color: "#facc15", fontWeight: 700, textDecoration: "none" }}>
          Back to News
        </Link>

        <header style={{ marginTop: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ color: "#facc15", fontWeight: 700, marginBottom: "0.75rem" }}>{post.category}</div>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.25rem)", lineHeight: 1.05, marginBottom: "1rem" }}>
            {post.title}
          </h1>
          <p style={{ color: mutedText, fontSize: "1rem" }}>{post.date}</p>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1.25rem" }}>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${cardBorder}`,
              }}
            />
            <div>
              <div style={{ fontWeight: 800 }}>{post.author.name}</div>
              <div style={{ color: mutedText, fontSize: "0.9rem" }}>{post.author.role}</div>
            </div>
          </div>
        </header>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            style={{
              width: "100%",
              maxHeight: "460px",
              objectFit: "cover",
              borderRadius: "0.75rem",
              border: `1px solid ${cardBorder}`,
              marginBottom: "1.5rem",
            }}
          />
        )}

        <div style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: "0.75rem", padding: "clamp(1.25rem, 4vw, 2rem)" }}>
          {(post.content || []).map((block, index) => {
            if (typeof block === "string") {
              return (
                <p key={index} style={{ color: mutedText, fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.1rem" }}>
                  {block}
                </p>
              );
            }

            if (block.type === "heading") {
              return (
                <h2 key={index} style={{ color: textColor, fontSize: "1.65rem", margin: "2rem 0 0.85rem" }}>
                  {block.text}
                </h2>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={index} style={{ color: mutedText, fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.25rem", paddingLeft: "1.4rem" }}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            if (block.type === "image") {
              return (
                <figure key={index} style={{ margin: "1.5rem 0" }}>
                  <img
                    src={block.src}
                    alt={block.alt || ""}
                    style={{
                      width: "100%",
                      borderRadius: "0.75rem",
                      border: `1px solid ${cardBorder}`,
                      display: "block",
                    }}
                  />
                  {block.caption && (
                    <figcaption style={{ color: mutedText, fontSize: "0.9rem", marginTop: "0.5rem", textAlign: "center" }}>
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          })}

          {post.originalUrl && (
            <p style={{ borderTop: `1px solid ${cardBorder}`, color: mutedText, marginTop: "2rem", paddingTop: "1rem" }}>
              Originally published before mmgridiron.com launched.{" "}
              <a href={post.originalUrl} target="_blank" rel="noreferrer" style={{ color: "#facc15", fontWeight: 700 }}>
                View original post
              </a>
              .
            </p>
          )}
        </div>
      </article>
    </main>
  );
}
