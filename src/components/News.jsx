// src/components/News.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { newsPosts } from "../data/newsPosts";

export default function News() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "#18181B" : "#f9fafb";
  const textColor = isDark ? "#f5f5f5" : "#111827";
  const cardBg = isDark ? "#2a2a2a" : "white";
  const cardBorder = isDark ? "#444" : "#e5e7eb";
  const hoverBg = isDark ? "#333" : "#f3f4f6";
  const subText = isDark ? "#aaa" : "#4b5563";
  const inputBg = isDark ? "#1f1f1f" : "white";
  const inputBorder = isDark ? "#444" : "#d1d5db";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(newsPosts.map((post) => post.category)))];
  const filteredPosts = newsPosts
    .filter(
      (post) =>
        (category === "All" || post.category === category) &&
        post.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bgColor,
        color: textColor,
        padding: "2rem 1rem",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "3rem", maxWidth: "1280px", margin: "0 auto 3rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          News & Announcements
        </h1>
        <p style={{ fontSize: "1.125rem", color: subText }}>
          Original Madden NFL Mobile updates, recaps, and community-focused articles.
        </p>
      </header>

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 300px)", gap: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                style={{
                  backgroundColor: cardBg,
                  borderRadius: "0.75rem",
                  border: `1px solid ${cardBorder}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  transition: "all 0.2s ease-out",
                }}
              >
                {post.imageUrl && (
                  <Link to={`/news/${post.id}`}>
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      style={{ width: "100%", height: "14rem", objectFit: "cover" }}
                    />
                  </Link>
                )}
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
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
                      <div style={{ fontWeight: "600", color: textColor }}>{post.author.name}</div>
                      <div style={{ fontSize: "0.875rem", color: subText }}>{post.author.role}</div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      fontSize: "0.875rem",
                      color: subText,
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span>{post.date}</span>
                    <span style={{ color: "#facc15", fontWeight: "500" }}>{post.category}</span>
                  </div>
                  <Link to={`/news/${post.id}`} style={{ textDecoration: "none", color: textColor }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.75rem" }}>
                      {post.title}
                    </h2>
                  </Link>
                  <p style={{ color: subText, marginBottom: "1rem", lineHeight: 1.6 }}>{post.excerpt}</p>
                  <Link
                    to={`/news/${post.id}`}
                    style={{ display: "inline-block", color: "#facc15", fontWeight: "600", textDecoration: "none" }}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}

            {filteredPosts.length === 0 && (
              <div style={{ textAlign: "center", padding: "3rem 0", color: subText }}>
                No posts found.
              </div>
            )}
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ backgroundColor: cardBg, padding: "1.25rem", borderRadius: "0.75rem", border: `1px solid ${cardBorder}`, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem", color: textColor }}>
                Search
              </h3>
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                style={{
                  width: "100%",
                  border: `1px solid ${inputBorder}`,
                  borderRadius: "0.375rem",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: inputBg,
                  color: textColor,
                  outline: "none",
                }}
              />
            </div>

            <div style={{ backgroundColor: cardBg, padding: "1.25rem", borderRadius: "0.75rem", border: `1px solid ${cardBorder}`, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem", color: textColor }}>
                Categories
              </h3>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.375rem",
                    marginBottom: "0.25rem",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: category === cat ? "#facc15" : "transparent",
                    color: category === cat ? "#000" : textColor,
                    fontWeight: category === cat ? "600" : "normal",
                  }}
                  onMouseEnter={(event) => {
                    if (category !== cat) event.currentTarget.style.backgroundColor = hoverBg;
                  }}
                  onMouseLeave={(event) => {
                    if (category !== cat) event.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ backgroundColor: cardBg, padding: "1.25rem", borderRadius: "0.75rem", border: `1px solid ${cardBorder}`, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem", color: textColor }}>
                Recent Posts
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {newsPosts.slice(0, 3).map((post) => (
                  <li key={post.id}>
                    <Link to={`/news/${post.id}`} style={{ color: "#facc15", fontSize: "0.875rem", textDecoration: "none" }}>
                      {post.title}
                    </Link>
                    <div style={{ fontSize: "0.75rem", color: subText, marginTop: "0.125rem" }}>{post.date}</div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
