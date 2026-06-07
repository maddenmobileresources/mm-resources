import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Playbooks() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "#18181B" : "#f9fafb";
  const textColor = isDark ? "#f5f5f5" : "#111827";
  const cardBg = isDark ? "#2a2a2a" : "white";
  const subText = isDark ? "#aaa" : "#4b5563";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bgColor,
        color: textColor,
        padding: "60px 24px 48px",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Playbook Guide
          </h1>
          <p style={{ fontSize: "1.125rem", color: subText }}>
            Choose the right playbook and offensive/defensive schemes for your team.
          </p>
        </header>

        <div
          style={{
            backgroundColor: cardBg,
            padding: "2rem",
            borderRadius: "0.75rem",
            border: `1px solid ${isDark ? "#444" : "#ccc"}`,
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            Coming Soon
          </h2>
          <p style={{ color: subText }}>
            This guide is currently under development. Check back soon for comprehensive playbook strategies and recommendations!
          </p>
        </div>
      </div>
    </div>
  );
}