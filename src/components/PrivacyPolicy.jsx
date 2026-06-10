import { AlertTriangle, Cookie, Database, ExternalLink, Lock, Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function PrivacyPolicy() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pageBg = isDark ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900";
  const panel = isDark ? "bg-zinc-800 border-gray-700" : "bg-white border-gray-200";
  const softPanel = isDark ? "bg-zinc-900 border-gray-700" : "bg-gray-50 border-gray-200";
  const muted = isDark ? "text-gray-300" : "text-gray-600";
  const accent = isDark ? "text-yellow-400" : "text-blue-700";
  const linkClass = isDark ? "text-blue-300 hover:text-blue-200 underline" : "text-blue-700 hover:text-blue-900 underline";

  const Section = ({ icon: Icon, title, children }) => (
    <section className={`rounded-lg border p-6 shadow-md ${panel}`}>
      <div className="mb-4 flex items-center gap-3">
        <Icon className={accent} size={28} />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className={`space-y-4 leading-7 ${muted}`}>{children}</div>
    </section>
  );

  return (
    <main className={`min-h-screen px-4 py-10 sm:px-6 ${pageBg}`}>
      <div className="mx-auto max-w-5xl">
        <section className="mb-10 text-center">
          <p className={`mb-3 text-sm font-bold uppercase tracking-wide ${accent}`}>Privacy Policy</p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
            Madden Mobile Gridiron Privacy Policy
          </h1>
          <p className={`mx-auto max-w-3xl text-lg leading-8 ${muted}`}>
            This page explains what information mmgridiron.com may collect, how it is used, and what choices you have
            when using this community-ran website.
          </p>
          <p className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Last updated: June 10, 2026</p>
        </section>

        <div className="mb-8 grid gap-5 md:grid-cols-3">
          <div className={`rounded-lg border p-5 text-center ${softPanel}`}>
            <Lock className={`mx-auto mb-3 ${accent}`} size={30} />
            <h3 className="mb-2 text-lg font-bold">No passwords</h3>
            <p className={muted}>We do not ask for or store your Discord, Reddit, or EA account password.</p>
          </div>
          <div className={`rounded-lg border p-5 text-center ${softPanel}`}>
            <Database className={`mx-auto mb-3 ${accent}`} size={30} />
            <h3 className="mb-2 text-lg font-bold">Community data</h3>
            <p className={muted}>Comments, leaderboard entries, and usernames may be stored to run site features.</p>
          </div>
          <div className={`rounded-lg border p-5 text-center ${softPanel}`}>
            <Cookie className={`mx-auto mb-3 ${accent}`} size={30} />
            <h3 className="mb-2 text-lg font-bold">Ads and cookies</h3>
            <p className={muted}>Ads may use cookies or similar technology once monetization is enabled.</p>
          </div>
        </div>

        <div className="space-y-6">
          <Section icon={ShieldCheck} title="Who we are">
            <p>
              Madden Mobile Gridiron, available at mmgridiron.com, is an unofficial community resource website for
              Madden NFL Mobile players. The site provides databases, calendars, guides, pack tools, comments, and other
              community features.
            </p>
            <p>
              Madden Mobile Gridiron is not affiliated with, endorsed by, sponsored by, or operated by Electronic Arts,
              EA SPORTS, the NFL, or any related rights holders.
            </p>
          </Section>

          <Section icon={Database} title="Information we may collect">
            <p>Depending on how you use the site, we may collect or store the following:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Basic account identity from login providers, such as your Discord username and account ID.</li>
              <li>Optional manually verified Reddit username information when you request Reddit verification.</li>
              <li>Comments you post on player or play profile pages.</li>
              <li>Pack Opener leaderboard entries, including score, pack details, username display, and submission time.</li>
              <li>Trusted-user status or similar community labels when manually assigned by site staff.</li>
              <li>Basic technical information normally sent by browsers, such as device, browser, approximate location, and IP address, through hosting, analytics, security, or advertising services.</li>
            </ul>
            <p>
              We do not ask for your EA account login, Discord password, Reddit password, payment card information, or
              other sensitive account credentials.
            </p>
          </Section>

          <Section icon={Lock} title="Login providers">
            <p>
              Sign-in is handled by third-party providers such as Discord. When you sign in, the provider may share basic
              profile information with this site so we can attach comments, leaderboard submissions, or verification
              status to your community identity.
            </p>
            <p>
              Reddit verification is currently handled manually. If you DM the site admin on Reddit for verification,
              your Reddit username may be stored alongside your Discord identity so it can be displayed in comments or
              used for leaderboard reward eligibility.
            </p>
          </Section>

          <Section icon={Cookie} title="Cookies, local storage, and ads">
            <p>
              The site may use cookies, local storage, or similar browser technologies to remember preferences such as
              light/dark mode, keep you signed in, support community features, prevent abuse, and improve the website.
            </p>
            <p>
              Madden Mobile Gridiron may run advertisements for monetization. Advertising partners may use cookies,
              device identifiers, or similar technologies to display ads, measure performance, prevent fraud, and
              personalize or limit advertising depending on your region and settings.
            </p>
            <p>
              If services such as Google AdSense or another ad network are added, those services may collect information
              under their own privacy policies. You can usually manage cookies through your browser settings.
            </p>
          </Section>

          <Section icon={ShieldCheck} title="How we use information">
            <p>Information collected through the site may be used to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Operate comments, voting, community tags, and leaderboard features.</li>
              <li>Display usernames and verified Reddit information where applicable.</li>
              <li>Prevent spam, abuse, fake scores, duplicate submissions, and misuse of community features.</li>
              <li>Fix bugs, improve site performance, and understand which pages or tools are useful.</li>
              <li>Respond to contact requests, corrections, or feedback.</li>
              <li>Support advertising, analytics, hosting, and security services.</li>
            </ul>
          </Section>

          <Section icon={ExternalLink} title="Third-party services and links">
            <p>
              The site may rely on third-party services for hosting, database storage, authentication, security,
              analytics, advertising, images, embedded content, and external community links. Examples may include
              Cloudflare, Supabase, Discord, Reddit, Imgur, and future advertising providers.
            </p>
            <p>
              Clicking links to third-party websites takes you away from mmgridiron.com. Those websites have their own
              terms and privacy policies, and this policy does not control how they collect or use information.
            </p>
          </Section>

          <Section icon={Database} title="Data retention and removal">
            <p>
              Comments, leaderboard entries, verification status, and moderation records may be kept for as long as they
              are useful for operating the site, preserving community context, preventing abuse, or maintaining monthly
              leaderboard history.
            </p>
            <p>
              If you want a comment or account-linked site data reviewed for removal, use the{" "}
              <Link className={linkClass} to="/contact-us">
                Contact Us
              </Link>{" "}
              page. Some information may be retained when needed for security, abuse prevention, or site integrity.
            </p>
          </Section>

          <Section icon={Mail} title="Children's privacy">
            <p>
              This site is intended for a general Madden Mobile community audience and is not designed to knowingly
              collect personal information from children. If a parent or guardian believes a child has submitted personal
              information through this site, they can contact us so the issue can be reviewed.
            </p>
          </Section>

          <section className={`rounded-lg border p-6 shadow-md ${isDark ? "border-yellow-700 bg-yellow-950/30" : "border-yellow-300 bg-yellow-50"}`}>
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className={isDark ? "text-yellow-300" : "text-yellow-700"} size={30} />
              <h2 className={`text-2xl font-bold ${isDark ? "text-yellow-200" : "text-yellow-900"}`}>
                Not Electronic Arts support
              </h2>
            </div>
            <div className={`space-y-4 leading-7 ${isDark ? "text-yellow-100" : "text-yellow-950"}`}>
              <p>
                mmgridiron.com is not a way to contact Electronic Arts, EA SPORTS, or EA Help. For account issues,
                purchases, missing rewards, bans, in-game bugs, or official Madden NFL Mobile support, contact EA
                directly through{" "}
                <a href="https://help.ea.com/en/" target="_blank" rel="noopener noreferrer" className="font-bold underline">
                  EA Help
                </a>
                .
              </p>
            </div>
          </section>

          <Section icon={Mail} title="Contact">
            <p>
              Questions about this policy or site-related privacy requests can be sent through the{" "}
              <Link className={linkClass} to="/contact-us">
                Contact Us
              </Link>{" "}
              page.
            </p>
            <p>
              This policy may be updated as the site changes, especially as advertising, analytics, or additional
              community features are added.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
