import { Link, Outlet } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

export default function Layout() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Outlet />
      <footer
        style={{
          width: "100%",
          backgroundColor: "#111111",
          textAlign: "center",
          padding: "1.5rem 1rem",
          fontSize: "0.875rem",
          color: "#aaaaaa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "2rem",
        }}
      >
        <p style={{ margin: 0 }}>Built for the Madden Mobile community, by the community</p>
        <p style={{ maxWidth: "760px", margin: 0, lineHeight: 1.5 }}>
          This website is not endorsed by or affiliated with EA, EA SPORTS, the NFL, or their licensors.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
          <Link to="/about-us" style={{ color: "#ccaa00", textDecoration: "underline" }}>
            About Us
          </Link>
          <Link to="/contact-us" style={{ color: "#ccaa00", textDecoration: "underline" }}>
            Contact Us
          </Link>
          <Link to="/privacy-policy" style={{ color: "#ccaa00", textDecoration: "underline" }}>
            Privacy Policy
          </Link>
          <Link to="/support" style={{ color: "#ccaa00", textDecoration: "underline" }}>
            Support Us
          </Link>
        </div>
      </footer>
    </>
  );
}
