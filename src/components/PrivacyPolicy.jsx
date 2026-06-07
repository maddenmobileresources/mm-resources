import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function DailyArena() {
  const { theme } = useTheme();

  const Section = ({ title, children }) => (
    <div className="mb-8">
      <h2 className={`text-2xl font-bold mb-4 pb-2 border-b-2 ${
        theme === "dark" ? "border-gray-600 text-yellow-400" : "border-gray-300 text-gray-900"
      }`}>
        {title}
      </h2>
      <div className={`space-y-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
        {children}
      </div>
    </div>
  );

  const BulletList = ({ items }) => (
    <ul className="list-disc list-inside space-y-2 ml-4">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-5xl mx-auto">
        <h1 className={`text-4xl font-bold text-center mb-2 ${
          theme === "dark" ? "text-yellow-400" : "text-gray-900"
        }`}>
          Most Feared Promo Guide
        </h1>
        
        <p className={`text-center text-sm mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Last Updated: October 28, 2025
        </p>

        <div className={`rounded-lg shadow-lg p-8 ${
          theme === "dark" ? "bg-zinc-800 border border-gray-700" : "bg-white"
        }`}>
          
          {/* Duration Section */}
          <Section title="Duration">
            <p><strong>Starts:</strong> October 17th @ 10:30am ET</p>
            <p><strong>Ends:</strong> November 3rd @ 10:30am ET</p>
          </Section>

          {/* Vamp Bailey Section */}
          <Section title="Vamp Bailey">
            <p>There's 21 variations of Vamp Bailey ranging from Uncommon → Mythic Rarity.</p>
            <p>You build/upgrade Vamp Bailey's card using <strong>Night Essence</strong>.</p>
            <p>See the chart below for how to obtain each variation of Vamp Bailey's card (Note: Trade costs are not cumulative):</p>
            
            <div className={`my-4 p-4 rounded ${theme === "dark" ? "bg-zinc-700" : "bg-gray-100"}`}>
              <p className="text-sm italic">Chart showing Vamp Bailey variations and costs would be displayed here</p>
            </div>

            <BulletList items={[
              "Obtain the first 6x Vamp Bailey player cards to earn 500x Training Points & a Logo (collectible via Most Feared Player Albums).",
              "The Player Boosts on Vamp Bailey are permanent in duration (i.e. they do not expire at any point).",
              "You can view your progress toward obtaining the different Vamp Bailey cards via the Essence Meter located in the \"Cathedral\" tab on the Most Feared promo page or via Most Feared promo Player Albums."
            ]} />
          </Section>

          {/* Night Essence Section */}
          <Section title="Night Essence">
            <p>You can earn Night Essence in a variety of different ways including:</p>
            <BulletList items={[
              "Completing Dungeon Crawl nodes/events (see the \"Dungeon Crawl\" section below for more information).",
              "Playing Potion Blitz Events to reveal Potion Recipes (see the \"Potion Blitz\" section below for more information).",
              "Completing player trades (see the \"Trades\" section below for more information).",
              "Collecting \"Lunar Essence\" (see the \"Cathedral\" section below for more information).",
              "Completing Goals",
              "Watching Ads"
            ]} />
          </Section>

          {/* Cathedral Section */}
          <Section title="Cathedral">
            <div className={`my-4 p-4 rounded ${theme === "dark" ? "bg-zinc-700" : "bg-gray-100"}`}>
              <p className="text-sm italic">Cathedral interface image would be displayed here</p>
            </div>

            <BulletList items={[
              "Here is where you can access the trades to build/upgrade Vamp Bailey, which you can do by selecting the button with the Vamp Bailey icon.",
              "You can track progress toward completing the 4x Most Feared promo goals on this page as well.",
              "Complete all 4x Goals to unlock the middle Boss Challenge for bonus rewards.",
              "The button with the purple potion icon is one of the locations where you can obtain Night Essence.",
              "You do this by collecting Lunar Essence (blue potion). 1x Lunar Essence exchanges for 1x Night Essence.",
              "You collect Lunar Essence like you would Stamina where it recharges over time (1 Lunar Essence every 50 seconds).",
              "Similar to stamina, Lunar Essence caps at 600x where you'll need to collect it once it hits that cap before you can accrue more."
            ]} />
          </Section>

          {/* Potion Blitz Section */}
          <Section title="Potion Blitz">
            <div className={`my-4 p-4 rounded ${theme === "dark" ? "bg-zinc-700" : "bg-gray-100"}`}>
              <p className="text-sm italic">Potion Blitz interface image would be displayed here</p>
            </div>

            <p><strong>All 6 events:</strong></p>
            <BulletList items={[
              "Cost: 30x Promo Stamina",
              "Reward: 60x Most Feared Tokens + 30x Most Feared Points",
              "There's a special 7th event that unlocks on Halloween."
            ]} />

            <p className="mt-4">Each of the 6 events are numbered 1-6.</p>
            <p>There's 34x Potion Recipe combination codes in total that will be revealed over the course of the promo (2x each day).</p>
            <p>You can see these combination codes by clicking on the cauldron.</p>

            <div className={`my-4 p-4 rounded ${theme === "dark" ? "bg-zinc-900 border border-gray-600" : "bg-blue-50 border border-blue-200"}`}>
              <p className="font-semibold mb-2">How to Enter Codes:</p>
              <BulletList items={[
                "To enter each of these codes, you have to play the corresponding numbered event.",
                "For example, to enter Potion 1's code of 1111 you have to play Potion Blitz Event 1 4x.",
                "For example, to enter the code of 1234 you have to play Potion Blitz Event 1 once, then Potion Blitz Event 2 once, then Potion Blitz Event 3 once, then finally Potion Blitz Event 4 once."
              ]} />
            </div>

            <div className={`my-4 p-4 rounded ${theme === "dark" ? "bg-yellow-900 border border-yellow-600" : "bg-yellow-50 border border-yellow-300"}`}>
              <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Important Note:</p>
              <p className={theme === "dark" ? "text-yellow-100" : "text-yellow-900"}>
                You can auto-play the events to enter each digit of the code, but you should do it one play at a time for stamina efficiency purposes. If you use the scroll bar to auto the event more than once at a given time, that will only register a single digit. So, auto-playing Event 1 4x at once using the scroll bar will only register one "1" instead of "1111".
              </p>
            </div>

            <p>Once the code is successfully entered, you'll unlock rewards from the cauldron.</p>
            <BulletList items={[
              "The cauldron rewards 1x Potion Recipe collectible and 1,715x Night Essence (that are used strictly to obtain Vamp Bailey cards).",
              "To keep track of which Potion Recipes you've already successfully completed, navigate to your Item Inventory where you'll find Potion Recipe collectibles.",
              "You do not have to enter the 34x total Potion codes in sequential order (Potion 1 → Potion 2 → Potion 3, etc...); you can enter them in any order you want.",
              "Technically, you can unveil all the Potion codes on Day 1 of the promo via simply guessing each of the 34x codes. Or you can wait until all Potion combination codes are revealed in-game."
            ]} />

            <p className={`mt-4 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
              <a href="#" className="hover:underline">Click here for all the Potion Recipe codes.</a>
            </p>
          </Section>

          {/* Dungeon Crawl Section */}
          <Section title="Dungeon Crawl">
            <div className={`my-4 p-4 rounded ${theme === "dark" ? "bg-zinc-700" : "bg-gray-100"}`}>
              <p className="text-sm italic">Dungeon Crawl map image would be displayed here</p>
            </div>

            <BulletList items={[
              "At each day's reset upon logging in, you receive 7x Exploration Stamina, which is used to unlock/play the Dungeon Crawl nodes/events.",
              "Most Feared ends on November 3rd @ 10:30am ET. So, the maximum amount of Exploration Stamina one can earn over the course of the 17 day promo, which started October 17th @ 10:30am ET, is 119x Exploration Stamina.",
              "There are a total of 48 nodes/events you can unlock rewards from in the Dungeon Crawl. These 48 nodes will cost in total 86x Exploration Stamina and 3x Treasure Keys.",
              "You earn the aforementioned 3x Treasure Keys by defeating the 3x Mini-Boss Challenges (1x Treasure Key per Challenge). These Mini-Boss Challenges are otherwise known as \"East/West/North Altar\" on the Dungeon Crawl map.",
              "You then use these 3x Treasure Keys to unlock the 3x Treasure Chest nodes that each reward \"Vampire's Spoils\" (aka 3x 84+ OVR UC+ MF Players).",
              "The earliest one can unlock/complete all nodes is Day 13/17 of the promo.",
              "If you play all 17 days of the promo, you'll have an excess of 33x Exploration Stamina leftover after unlocking/completing all 48 Dungeon Crawl nodes. So, over 4 days worth of Exploration Stamina leftover (which will have no use)."
            ]} />
          </Section>

          {/* Trades Section */}
          <Section title="Trades">
            <p>Completing various Most Feared player trades rewards not only the player(s) itself, but also a varying amount of Night Essence, which goes toward building Vamp Bailey.</p>
            <p className="mt-4">Here's a breakdown of how much Night Essence you can earn via completing different player trades:</p>
            
            <div className={`my-4 p-4 rounded ${theme === "dark" ? "bg-zinc-700" : "bg-gray-100"}`}>
              <p className="text-sm italic">Trade rewards breakdown table would be displayed here</p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}