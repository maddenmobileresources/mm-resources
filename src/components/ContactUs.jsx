import { useTheme } from "../context/ThemeContext";

export default function ContactUs() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const darkCard = "flex items-center gap-4 p-5 rounded-lg bg-zinc-800 hover:bg-zinc-700";
  const lightCard = "flex items-center gap-4 p-5 rounded-lg bg-white shadow-md hover:bg-gray-50";
  const darkText = "text-sm text-blue-400 underline";
  const lightText = "text-sm text-blue-600 underline";

  return (
    <div className={isDark ? "p-6 min-h-screen bg-[#18181B] text-gray-100" : "p-6 min-h-screen bg-gray-50 text-gray-900"}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Contact Us</h1>
        <p className={isDark ? "text-center mb-8 text-gray-400" : "text-center mb-8 text-gray-600"}>
          Have a question, suggestion, or just want to connect? Reach out to us through any of the platforms below.
        </p>
        <div className="space-y-4">
          <a href="mailto:yourteam@email.com" className={isDark ? darkCard : lightCard}>
            <span className="text-3xl">✉️</span>
            <div>
              <p className="font-bold text-lg">Email</p>
              <p className={isDark ? darkText : lightText}>yourteam@email.com</p>
            </div>
          </a>
          <a href="https://discord.gg/yourserver" target="_blank" rel="noopener noreferrer" className={isDark ? darkCard : lightCard}>
            <span className="text-3xl">💬</span>
            <div>
              <p className="font-bold text-lg">Discord</p>
              <p className={isDark ? darkText : lightText}>discord.gg/yourserver</p>
            </div>
          </a>
          <a href="https://reddit.com/r/yoursubreddit" target="_blank" rel="noopener noreferrer" className={isDark ? darkCard : lightCard}>
            <span className="text-3xl">🔴</span>
            <div>
              <p className="font-bold text-lg">Reddit</p>
              <p className={isDark ? darkText : lightText}>r/yoursubreddit</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}