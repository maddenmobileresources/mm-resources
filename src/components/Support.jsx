import { ExternalLink, HeartHandshake, Info, ShieldCheck, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const paypalDonationUrl = "";

export default function Support() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const hasDonationLink = Boolean(paypalDonationUrl);

  const pageBg = isDark ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900";
  const panel = isDark ? "bg-zinc-800 border-gray-700" : "bg-white border-gray-200";
  const softPanel = isDark ? "bg-zinc-900 border-gray-700" : "bg-gray-50 border-gray-200";
  const muted = isDark ? "text-gray-300" : "text-gray-600";
  const accent = isDark ? "text-yellow-400" : "text-blue-700";

  return (
    <main className={`min-h-screen px-4 py-10 sm:px-6 ${pageBg}`}>
      <div className="mx-auto max-w-5xl">
        <section className="mb-10 text-center">
          <p className={`mb-3 text-sm font-bold uppercase tracking-wide ${accent}`}>Support the site</p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">Support Madden Mobile Gridiron</h1>
          <p className={`mx-auto max-w-3xl text-lg leading-8 ${muted}`}>
            Madden Mobile Gridiron is a community-ran resource built to make Madden NFL Mobile information easier to
            find, compare, and use.
          </p>
        </section>

        <section className={`mb-8 rounded-lg border p-6 shadow-lg sm:p-8 ${panel}`}>
          <h2 className="mb-4 text-2xl font-bold">How to best support us</h2>
          <p className={`mb-6 leading-7 ${muted}`}>
            The best way to support Madden Mobile Gridiron is simply to keep using the site as a continued Madden NFL
            Mobile resource. Every visit, correction, suggestion, and shared link helps make the site more useful for
            the community.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            <div className={`rounded-lg border p-5 ${softPanel}`}>
              <h3 className="mb-2 text-xl font-bold">Use the resource</h3>
              <p className={`leading-7 ${muted}`}>
                Using the databases, calendars, guides, pack tools, and other site features helps show what is valuable
                and worth continuing to improve.
              </p>
            </div>
            <div className={`rounded-lg border p-5 ${softPanel}`}>
              <h3 className="mb-2 text-xl font-bold">Share feedback</h3>
              <p className={`leading-7 ${muted}`}>
                Corrections, missing data, bug reports, and feature ideas help keep this community resource accurate and
                easier for everyone to use.
              </p>
            </div>
            <div className={`rounded-lg border p-5 ${softPanel}`}>
              <h3 className="mb-2 text-xl font-bold">Optional support</h3>
              <p className={`leading-7 ${muted}`}>
                If ads are enabled, normal site traffic may help support the site through ad monetization. Optional
                PayPal donations are also appreciated, but never required.
              </p>
            </div>
          </div>
        </section>

        <section className={`mb-8 rounded-lg border p-6 shadow-lg sm:p-8 ${panel}`}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <HeartHandshake className={accent} size={34} />
                <h2 className="text-2xl font-bold">Optional donations</h2>
              </div>
              <div className={`space-y-4 leading-7 ${muted}`}>
                <p>
                  Donations help support the continued development and maintenance of mmgridiron.com, including domain
                  costs, site tools, database work, new features, bug fixes, and the time needed to keep this resource
                  updated for the community.
                </p>
                <p>
                  Donations are completely optional. They do not unlock in-game Madden NFL Mobile perks, EA benefits,
                  competitive advantages, Pack Opener leaderboard advantages, or anything connected to Electronic Arts.
                </p>
              </div>
            </div>

            <div className={`rounded-lg border p-6 text-center ${softPanel}`}>
              <WalletCards className={`mx-auto mb-4 ${accent}`} size={42} />
              <h3 className="mb-3 text-2xl font-bold">Donate with PayPal</h3>
              <p className={`mb-5 leading-6 ${muted}`}>
                Payments are handled by PayPal. This website does not see or store your card, bank, or PayPal login
                information.
              </p>
              {hasDonationLink ? (
                <a
                  href={paypalDonationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700 sm:w-auto"
                >
                  Support MMGridiron
                  <ExternalLink size={18} />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex w-full cursor-not-allowed items-center justify-center rounded bg-gray-500 px-5 py-3 font-bold text-white opacity-80 sm:w-auto"
                >
                  PayPal link coming soon
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-2">
          <div className={`rounded-lg border p-6 shadow-md ${panel}`}>
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className={accent} size={28} />
              <h2 className="text-2xl font-bold">Where support goes</h2>
            </div>
            <ul className={`list-disc space-y-2 pl-6 leading-7 ${muted}`}>
              <li>Domain and website-related costs.</li>
              <li>Database updates, corrections, and maintenance.</li>
              <li>New site tools, guides, calendars, and community features.</li>
              <li>Development time spent improving this community resource.</li>
            </ul>
          </div>

          <div className={`rounded-lg border p-6 shadow-md ${panel}`}>
            <div className="mb-4 flex items-center gap-3">
              <Info className={accent} size={28} />
              <h2 className="text-2xl font-bold">Important disclaimer</h2>
            </div>
            <div className={`space-y-4 leading-7 ${muted}`}>
              <p>
                Madden Mobile Gridiron is unofficial and community-ran. Donations do not go to Electronic Arts, EA
                SPORTS, the NFL, or any related rights holders.
              </p>
              <p>
                Donations are for supporting mmgridiron.com only. They are not purchases of in-game currency, Madden
                Cash, packs, players, points, official rewards, or account services.
              </p>
            </div>
          </div>
        </section>

        <section className={`rounded-lg border p-6 shadow-md ${softPanel}`}>
          <h2 className="mb-3 text-2xl font-bold">Questions before donating?</h2>
          <p className={`mb-5 leading-7 ${muted}`}>
            If you have questions about donations, site costs, or what support is used for, feel free to reach out first.
          </p>
          <Link className="inline-flex rounded bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700" to="/contact-us">
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  );
}
