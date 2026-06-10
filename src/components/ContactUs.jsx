import { AlertTriangle, ExternalLink, Mail, MessageSquare, ShieldAlert } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ContactUs() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const contactEmail = "contact@mmgridiron.com";
  const pageBg = isDark ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900";
  const panel = isDark ? "bg-zinc-800 border-gray-700" : "bg-white border-gray-200";
  const softPanel = isDark ? "bg-zinc-900 border-gray-700" : "bg-gray-50 border-gray-200";
  const muted = isDark ? "text-gray-300" : "text-gray-600";
  const accent = isDark ? "text-yellow-400" : "text-blue-700";

  return (
    <main className={`min-h-screen px-4 py-10 sm:px-6 ${pageBg}`}>
      <div className="mx-auto max-w-5xl">
        <section className="mb-10 text-center">
          <p className={`mb-3 text-sm font-bold uppercase tracking-wide ${accent}`}>
            Contact Madden Mobile Gridiron
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">Contact Us</h1>
          <p className={`mx-auto max-w-3xl text-lg leading-8 ${muted}`}>
            Have a question, correction, suggestion, or site-related issue? Reach out about mmgridiron.com and the
            community resources built here.
          </p>
        </section>

        <section className={`mb-8 rounded-lg border p-6 shadow-lg sm:p-8 ${panel}`}>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className={`rounded-lg border p-6 text-center ${softPanel}`}>
              <Mail className={`mx-auto mb-4 ${accent}`} size={42} />
              <h2 className="mb-2 text-2xl font-bold">Email</h2>
              <p className={`mb-5 ${muted}`}>
                The official contact email is still being finalized. For now, this is the planned contact address:
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex w-full items-center justify-center rounded bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 sm:w-auto"
              >
                {contactEmail}
              </a>
            </div>

            <div>
              <h2 className={`mb-4 text-2xl font-bold ${isDark ? "text-yellow-400" : "text-gray-900"}`}>
                What this contact page is for
              </h2>
              <div className={`space-y-4 leading-7 ${muted}`}>
                <p>
                  Use this page for questions or feedback directly related to Madden Mobile Gridiron, including site
                  bugs, incorrect player/play data, missing calendar entries, guide feedback, community features, or
                  general suggestions.
                </p>
                <p>
                  If you are reporting incorrect data, please include the page link, the specific item that looks wrong,
                  and what you believe it should say. That makes it much easier to review and fix.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: MessageSquare,
              title: "Feedback",
              text: "Suggest improvements, new tools, new guides, or quality-of-life changes for the website.",
            },
            {
              icon: AlertTriangle,
              title: "Corrections",
              text: "Report incorrect player cards, play data, calendar dates, pack info, or guide details.",
            },
            {
              icon: Mail,
              title: "Site issues",
              text: "Let us know if a page is broken, hard to use, missing content, or not displaying correctly.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className={`rounded-lg border p-5 shadow-md ${panel}`}>
              <Icon className={`mb-4 ${accent}`} size={30} />
              <h3 className="mb-2 text-xl font-bold">{title}</h3>
              <p className={`leading-6 ${muted}`}>{text}</p>
            </div>
          ))}
        </section>

        <section className={`rounded-lg border p-6 shadow-md ${isDark ? "border-yellow-700 bg-yellow-950/30" : "border-yellow-300 bg-yellow-50"}`}>
          <div className="mb-4 flex items-center gap-3">
            <ShieldAlert className={isDark ? "text-yellow-300" : "text-yellow-700"} size={30} />
            <h2 className={`text-2xl font-bold ${isDark ? "text-yellow-200" : "text-yellow-900"}`}>
              Not Electronic Arts support
            </h2>
          </div>
          <div className={`space-y-4 leading-7 ${isDark ? "text-yellow-100" : "text-yellow-950"}`}>
            <p>
              This contact page is not a way to contact Electronic Arts, EA SPORTS, or EA Help. Madden Mobile Gridiron
              is a community-ran platform, and contact through this site is strictly for inquiries related to
              mmgridiron.com.
            </p>
            <p>
              For account issues, purchases, missing rewards, bans, bugs inside the game, or any official Madden NFL
              Mobile support request, please contact EA directly through EA Help.
            </p>
            <a
              href="https://help.ea.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-yellow-400 px-4 py-3 font-bold text-black hover:bg-yellow-300"
            >
              Visit EA Help
              <ExternalLink size={18} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
