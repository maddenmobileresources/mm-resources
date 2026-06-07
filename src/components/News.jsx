// src/components/News.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const allNewsPosts = [
  {
    id: "season-12-launch",
    title: "Season 12 Launch: What's New",
    date: "October 1, 2025",
    category: "Updates",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      role: "Community Manager"
    },
    excerpt:
      "Season 12 is here! Explore new player programs, updated meta, and limited-time events to kickstart your squad.",
    imageUrl:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    content: `Full article content here…`,
  },
  {
    id: "patch-12-1-notes",
    title: "Patch 12.1 Notes & Fixes",
    date: "September 25, 2025",
    category: "Patch Notes",
    author: {
      name: "Mike Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=12",
      role: "Lead Developer"
    },
    excerpt:
      "This update brings gameplay tweaks, UI fixes, and quality-of-life improvements to Madden Mobile.",
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    content: `Full patch notes…`,
  },
  {
    id: "halloween-blitz-teaser",
    title: "Get Ready for Halloween Blitz",
    date: "October 10, 2025",
    category: "Events",
    author: {
      name: "Emma Chen",
      avatar: "https://i.pravatar.cc/150?img=5",
      role: "Content Creator"
    },
    excerpt:
      "A spooky special event is coming — check out teaser info on rewards, challenges, and more!",
    imageUrl:
      "https://images.unsplash.com/photo-1601924638867-3ec9f9f1d6a8?auto=format&fit=crop&w=1200&q=80",
    content: `Full event teaser…`,
  },
];

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

  const filteredPosts = allNewsPosts.filter(
    (post) =>
      (category === "All" || post.category === category) &&
      post.title.toLowerCase().includes(search.toLowerCase())
  );

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
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "3rem", maxWidth: "1280px", margin: "0 auto 3rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
          News & Announcements
        </h1>
        <p style={{ fontSize: "1.125rem", color: subText }}>
          Stay up to date with the latest Madden Mobile updates, patches, and events.
        </p>
      </header>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>
          {/* Main blog section */}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.15)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {post.imageUrl && (
                  <Link to={`/news/${post.id}`}>
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      style={{
                        width: "100%",
                        height: "14rem",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                )}
                <div style={{ padding: "1.5rem" }}>
                  {/* Author info section */}
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
                      fontSize: "0.875rem",
                      color: subText,
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span>{post.date}</span>
                    <span
                      style={{
                        color: "#facc15",
                        fontWeight: "500",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <Link
                    to={`/news/${post.id}`}
                    style={{
                      textDecoration: "none",
                      color: textColor,
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "0.75rem",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#facc15")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
                    >
                      {post.title}
                    </h2>
                  </Link>
                  <p style={{ color: subText, marginBottom: "1rem" }}>{post.excerpt}</p>
                  <Link
                    to={`/news/${post.id}`}
                    style={{
                      display: "inline-block",
                      color: "#facc15",
                      fontWeight: "600",
                      textDecoration: "none",
                      transition: "text-decoration 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}

            {filteredPosts.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 0",
                  color: subText,
                }}
              >
                No posts found.
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Search */}
            <div
              style={{
                backgroundColor: cardBg,
                padding: "1.25rem",
                borderRadius: "0.75rem",
                border: `1px solid ${cardBorder}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem", color: textColor }}>
                Search
              </h3>
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  border: `1px solid ${inputBorder}`,
                  borderRadius: "0.375rem",
                  padding: "0.5rem 0.75rem",
                  backgroundColor: inputBg,
                  color: textColor,
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#facc15")}
                onBlur={(e) => (e.currentTarget.style.borderColor = inputBorder)}
              />
            </div>

            {/* Categories */}
            <div
              style={{
                backgroundColor: cardBg,
                padding: "1.25rem",
                borderRadius: "0.75rem",
                border: `1px solid ${cardBorder}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem", color: textColor }}>
                Categories
              </h3>
              {["All", "Updates", "Patch Notes", "Events"].map((cat) => (
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
                    transition: "all 0.2s",
                    backgroundColor: category === cat ? "#facc15" : "transparent",
                    color: category === cat ? "#000" : textColor,
                    fontWeight: category === cat ? "600" : "normal",
                  }}
                  onMouseEnter={(e) => {
                    if (category !== cat) {
                      e.currentTarget.style.backgroundColor = hoverBg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (category !== cat) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Recent Posts */}
            <div
              style={{
                backgroundColor: cardBg,
                padding: "1.25rem",
                borderRadius: "0.75rem",
                border: `1px solid ${cardBorder}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "0.75rem", color: textColor }}>
                Recent Posts
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {allNewsPosts.slice(0, 3).map((post) => (
                  <li key={post.id}>
                    <Link
                      to={`/news/${post.id}`}
                      style={{
                        color: "#facc15",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        transition: "text-decoration 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                    >
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