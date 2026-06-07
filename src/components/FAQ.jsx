import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function FAQ() {
  const { theme } = useTheme();
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const sections = [
    {
      id: "currencies",
      title: "I. Currencies/Resources",
      questions: [
        {
          id: "q1",
          question: "What are Silver and Gold Keys for?",
          answer: "Silver and Gold Keys are used to acquire Traits. Specifically, Silver Keys are used to open Basic Trait packs, which reward Tier I (Uncommon) traits with a chance at a Tier II (Rare) trait, while Gold Keys are used to open Premium Trait packs, which reward Tier I (Uncommon) traits with a chance at a Tier II (Rare) and Tier III (Epic) trait. To use these Keys, navigate to Trades → Core → Player Traits."
        },
        {
          id: "q2",
          question: "What are Coins used for?",
          answer: "Now that Coins are no longer needed to train/rank up your team, you can now allocate your Coins toward purchasing packs. Specifically, Coins are used to purchase various player packs in the Store, in addition to acquiring Basic Trait packs, which you can access by navigating to Trades → Core → Player Traits."
        },
        {
          id: "q3",
          question: "What do I do with my old MM25 player cards?",
          answer: "You can trade in your MM25 players for various resources by navigating to Trades → Core → Legacy."
        },
        {
          id: "q4",
          question: "Where do I use my Play It Forward (PIF) Tokens from MM25 at?",
          answer: "Your Play It Forward (PIF) Tokens earned during MM25 can be redeemed via the Core section of the Store where you'll find several different offers that cost strictly PIF Tokens."
        },
        {
          id: "q5",
          question: "What do I do with the Saquon Barkley Badge(s) I have?",
          answer: "Currently, there's two different Saquon Barkley Badges that you can have in your item inventory. The first Saquon Barkley Badge is the badge you were able to earn from playing all the Cover Reveal events in MM25. This badge upgrades the art on the Preseason Field Pass Saquon Barkley cards, which you can acquire via the Preseason Field Pass trades. As long as you have this badge, it upgrades the art automatically where you don't have to exchange the badge in the process of acquiring the Saquon Barkley card(s). The second Saquon Barkley Badge is the badge you were given upon logging into MM26 for the very first time. This badge cannot be used now. Eventually, during the NFL Kickoff Event in September, you'll be able to upgrade the art on the Saquon Barkley Preseason Field Pass card again using this second badge."
        },
        {
          id: "q6",
          question: "Why am I not getting credited with promo Tokens I'm supposed to earn from completing promo Daily Goals?",
          answer: "It seems you may be confusing promo Tokens with promo Points. Promo Points and promo Tokens are two different currencies. When completing your Daily Goals in-game, you are earning Points, not Tokens. Promo points function the same as Field Pass Points that go toward unlocking Field Pass point milestones. The only difference is that promo points go toward achieving promo-specific point milestones. You can see your progress and claim these milestone rewards by navigating to the promo's Event Pass located on the Events & Core page in-game."
        }
      ]
    },
    {
      id: "traits",
      title: "II. Player Traits",
      questions: [
        {
          id: "q7",
          question: "What are traits? How do they work?",
          answer: "The 24 Player Traits currently available in-game provide special abilities and skill bonuses to players on the field. These traits improve the probability of specific actions succeeding in the game, such as spin moves or trucking. A couple of the traits provide a direct stat boost to cards, but the vast majority of these traits are about certain conditions (e.g. 'Increase passing success on 1st down pass plays.'). As you acquire these traits, you can apply/unapply them to your players as you see fit."
        },
        {
          id: "q8",
          question: "How do I acquire traits?",
          answer: "Traits are acquired via Coins, Madden Cash, Silver Keys, and Gold Keys. Coins and Silver Keys are used to acquire Basic Trait Packs, which reward Tier I (Uncommon) traits with a chance at a Tier II (Rare) trait. Madden Cash and Gold Keys are used to acquire Premium Trait Packs, which reward Tier I (Uncommon) traits with a chance at a Tier II (Rare) and Tier III (Epic) trait. To use these currencies to acquire traits, navigate to Trades → Core → Player Traits."
        },
        {
          id: "q9",
          question: "How do I obtain Silver and Gold Keys?",
          answer: "Silver and Gold Keys can be obtained from a variety of different areas of the game including Field Pass Milestone and Journey rewards, Core Journey rewards, and Goals."
        },
        {
          id: "q10",
          question: "Why isn't there a way to acquire traits in bulk?",
          answer: "There is. Instead of acquiring traits via the Core Store where you can only purchase the offers individually one at a time, acquire them via trades by navigating to Trades → Core → Player Traits. These trades are identical to the Store offers and have a slider where you can obtain the rewards in bulk."
        },
        {
          id: "q11",
          question: "How do I apply/unapply traits?",
          answer: "Just simply navigate to your Players, select the player card you want to apply the trait(s) to, click the 'Traits' button below the card, click on one of the slots next to the card, click on one of the traits shown in the Inventory section, then finally select the 'Equip' button. To unapply the trait(s), simply follow the above steps, but instead of selecting the 'Equip' button as the final step, there will be an 'Unequip' button to select. The number of traits you can apply to a given player card depends on that player card's tier/rarity; the higher the player card's tier/rarity, the more traits you can apply to that player. Uncommon & Rare player cards have one trait slot, Epic player cards have two trait slots, and Iconic+ player cards have three trait slots."
        },
        {
          id: "q12",
          question: "How do Trait Tiers/Rarities work?",
          answer: "Just like player cards, traits have a tier/rarity. There's Tier I (Uncommon), Tier II (Rare), Tier III (Epic), Tier IV (Iconic), and Tier V (Mythic) traits. The higher the tier/rarity of the trait, the higher the strength and frequency of the bonuses. However, it is important to note that the trait's tier cannot exceed the player card's tier when applying it. So, while you can apply a Tier I Uncommon trait to an Iconic player card, you cannot apply a Tier IV Iconic trait to an Uncommon player card, for example."
        },
        {
          id: "q13",
          question: "How can I upgrade traits?",
          answer: "Navigate to Trades → Player Trait Upgrades (at the bottom) → Upgrade. You'll need at least 5 copies of a specific trait to upgrade it to the next tier (e.g. 5x Tier I Quick Cuts traits → 1x Tier II Quick Cuts traits). As long as you have at least 5 copies of a specific trait, all you need to do is click on the trait inside the trade under 'Inventory', then select the highlighted 'Upgrade' button."
        },
        {
          id: "q14",
          question: "Where can I see a list of all the different traits?",
          answer: "Navigate to your Items by clicking the button toward the top of your screen, then select the 'Trait Tokens' tab toward the top of the screen. This lists all the different traits starting from highest tier/rarity (Tier V Mythic) to lowest tier/rarity (Tier I Uncommon). If you own any of the traits, it'll show you how many you have underneath the given trait's icon."
        },
        {
          id: "q15",
          question: "How do I know that traits are actually working during gameplay?",
          answer: "You'll see a unique pop-up message in real time toward the right-side of your screen while playing, which notifies you when a special ability is activated during gameplay."
        },
        {
          id: "q16",
          question: "Will I lose the assigned traits on a player when I exchange that player?",
          answer: "No, traits and cards are separate from one another (i.e. traits are not preset to cards). So, if you exchange a player, that player card's applied traits will just go back to your bench/items. You will not lose those traits to the exchange."
        },
        {
          id: "q17",
          question: "Do traits expire?",
          answer: "No, traits do not expire like Mythic+ stat boosts do, for example. The traits you acquire and apply to players will be valid throughout the entirety of MM26."
        },
        {
          id: "q18",
          question: "Why do the traits applied to Special Teams players impact non-Special Teams positions?",
          answer: "This is intended. Most likely to make Special Teams traits more useful since you're rarely using your Special Teams players in any actual gameplay outside of your Kicker and Kick Returner."
        }
      ]
    },
    {
      id: "evolution",
      title: "III. Player Evolution (EVO)",
      questions: [
        {
          id: "q19",
          question: "What is Player Evo? How do I Evo my players?",
          answer: "Player Evolution allows you to permanently increase the base OVR of any player card that you own at any time. For example, you can take an S1 Iconic player card that you own and Evo it during S5 to make that S1 Iconic now on par with an S5 Iconic in terms of OVR. To Evo a player, all you need to do is select that player card via your Items or My Team screen, select the 'Evolve' button underneath the player card, select which player you want to use in the Evo process, then click the highlighted 'Evolve' button toward the right-side of the screen."
        },
        {
          id: "q20",
          question: "Which players can I use to Evo?",
          answer: "When Evo'ing a player, you can only Evo them using a player that has a higher base OVR than the player being Evo'd. Most importantly, the player being used to Evo another player must be the same tier/rarity (Uncommon, Rare, Epic, etc…) as the player being Evo'd. Also, the position of the player card does not matter; you can use any position player to Evo a player."
        },
        {
          id: "q21",
          question: "How much does it cost to Evo a player?",
          answer: "It costs one player that is a higher base OVR and of the same tier/rarity as the player being Evo'd. It also costs a certain amount of EVO Tokens, which is dependent on the player card's tier (Uncommons cost 2 EVO Tokens, Rares cost 10 EVO Tokens, Epics cost 50 EVO Tokens, Iconics cost 250 EVO Tokens, etc…)."
        },
        {
          id: "q22",
          question: "Does the player card being Evo'd take on the stats of the player card that was used to Evo it?",
          answer: "The player card being Evo'd does not take on the stats of the player card that was used to Evo it. While it does take on the other player card's OVR, the stats are scaled and adjusted to align with a player card of the same position as it. Hence, why it wouldn't make sense for a player to take on the other player's stats considering the Evo process is not position-specific; you wouldn't want your HB player card to take on the stats of a Center, for example. You can view the Evo'd card's upgraded stats (highlighted in green) before Evo'ing them by flipping the card over after selecting which player card you want to use as Evo fodder."
        },
        {
          id: "q23",
          question: "Can I Evo MM25 players?",
          answer: "You cannot Evo MM25 players. Only MM26 player cards can be Evo'd."
        },
        {
          id: "q24",
          question: "How do I acquire Evo Tokens?",
          answer: "Evo Tokens can be acquired across several different areas of the game including the Field Pass Milestone rewards, Core Journey rewards, and Goals."
        }
      ]
    },
    {
      id: "stt",
      title: "IV. Season Team Training (STT)",
      questions: [
        {
          id: "q25",
          question: "Is it intended that ranking your team up only costs Team Training Points (TTP)?",
          answer: "Yes, this is intended. Ranking up your team no longer costs Coins; it strictly costs Team Training Points (TTP) now."
        },
        {
          id: "q26",
          question: "Do Team Training Points (TTP) carry over to the next Field Pass season?",
          answer: "Yes, Team Training Points carry over to the next Field Pass season."
        },
        {
          id: "q27",
          question: "What is this button on the Rank Up screen that says 'Resets In…' with a timer?",
          answer: "That button with the timer is the 'Watch Ad' for TTP button. That's just a cooldown timer counting down to when you can watch another ad for TTP, which can only be done once per day."
        },
        {
          id: "q28",
          question: "What are the different rewards for Ranking Up your team?",
          answer: "You can view these rewards at any time by selecting the 'All Rewards' button toward the bottom-right of any Rank Up menu screen."
        },
        {
          id: "q29",
          question: "What are the cheapest paths to acquiring Season Team Training (STT) players?",
          answer: "There is a chart that shows the different paths you can take to acquire STT player cards. The boldfaced rows indicate the cheapest paths possible for that particular reward."
        }
      ]
    },
    {
      id: "dual",
      title: "V. Dual Player Cards",
      questions: [
        {
          id: "q30",
          question: "What are Dual Players?",
          answer: "Dual Players are a new type of player card that features two different players as a single card. For example, a single card that can be used as a QB Lamar Jackson or a WR Zay Flowers depending on how you want to use that card."
        },
        {
          id: "q31",
          question: "How do I switch between the two different Dual Players?",
          answer: "As an example, say you have a QB Lamar Jackson/WR Zay Flowers player card. If you want to use the card as a QB Lamar Jackson, just simply go to the QB position and slot in the Dual QB Lamar Jackson/WR Zay Flowers card, and it'll automatically play as QB Lamar Jackson. If you want to switch that card to a WR Zay Flowers, just remove the Dual player card from the QB position, go to one of the WR slots, and then slot the Dual player card in."
        },
        {
          id: "q32",
          question: "Can I use both Dual Players in my lineup at the same time?",
          answer: "Yes, you can. All you need to do is acquire two copies of that Dual player card, and then you'll be able to slot both into your lineup at the same time."
        }
      ]
    },
    {
      id: "playbooks",
      title: "VI. Playbooks",
      questions: [
        {
          id: "q33",
          question: "What is PBB?",
          answer: "PBB is also known as your Playbook Budget. Each play has a PBB ranging from 0 PBB to 55 PBB, which you can determine by looking at the value in the top-left corner of the play's art. Your entire playbook has a PBB that starts at a base 100 PBB and can be increased incrementally via increasing your User level. The plays that you feature in your playbook cannot exceed this set PBB, which is determined by totaling the PBB cost of each individual play."
        },
        {
          id: "q34",
          question: "How do I increase my Playbook Budget?",
          answer: "You can increase your PBB by increasing your User level, which is done by gaining XP through simply playing the game."
        },
        {
          id: "q35",
          question: "How do I acquire the locked plays?",
          answer: "Certain locked plays can be acquired via the VIP Field Pass milestone rewards or by completing promo trades. Other than that, you will need to purchase the locked plays via the Core Store, which costs a various amount of Play Tokens."
        },
        {
          id: "q36",
          question: "What's the little star icon for toward the top-right of each play within your playbook?",
          answer: "This allows you to favorite individual plays so that they appear at the top/front of your playbook during gameplay. When you favorite a play, the star will turn a blue color."
        },
        {
          id: "q37",
          question: "Can I change my 2-point plays?",
          answer: "No, 2-point plays are universal to everyone's playbook and cannot be amended."
        },
        {
          id: "q38",
          question: "What's the 'Stats' button do toward the top of the playbook?",
          answer: "If you toggle the 'Stats' button ON, it will essentially tell you how each of the plays have performed across competitive modes by displaying how often a particular play has been used (play count) and the average yards gained on each play."
        }
      ]
    },
    {
      id: "events",
      title: "VII. Events",
      questions: [
        {
          id: "q39",
          question: "When does this event start/end? When do new players drop?",
          answer: "Check the updated content calendar containing all relevant dates surrounding the game. Note: Some of these dates are simply expected dates based on past trends."
        },
        {
          id: "q40",
          question: "Why can't I play an event despite meeting the Team OVR requirement to play it?",
          answer: "Sometimes an event will try to use a lineup different from the one you currently have set. This can especially happen if you have Dual Players slotted in your lineup. To workaround this issue, select the 'Edit Lineup' button next to the 'Play' button on the event. Once on the Edit Lineup screen, you should be able to successfully click the 'Play' button from that screen. You may need to swap some players in and out of your lineup on that screen before being able to successfully play the event."
        },
        {
          id: "q41",
          question: "Where is the Leaderboard for Point Attack?",
          answer: "The Leaderboard for Point Attack no longer exists (at least at the current moment). There are no additional rewards to chase beyond the different point milestones."
        },
        {
          id: "q42",
          question: "How do I get access to the Kickstart rewards I see others have?",
          answer: "Kickstart rewards are meant for new players who may not be carrying over any resources like those who've played during MM25. Returning players get access to 'Welcome Back Rewards,' which provide essentially the same rewards. The only difference is that the OVR requirement to claim each reward node is slightly higher for returning players with access to the Welcome Back Rewards."
        }
      ]
    },
    {
      id: "competitive",
      title: "VIII. Competitive",
      questions: [
        {
          id: "q43",
          question: "Why haven't I received my leaderboard placement rewards yet from participating in weekend Arena/Draft Champions tournaments?",
          answer: "Leaderboard placement rewards earned from weekend Arena/Draft Champions tournaments may take some time to distribute once the tournament has concluded. Generally, you can expect to receive these rewards anywhere from 11:30 am - noon ET on the same day the tournament has concluded."
        },
        {
          id: "q44",
          question: "When does the new VS season start?",
          answer: "Each new VS season begins alongside the launch of each new Field Pass season."
        }
      ]
    },
    {
      id: "leagues",
      title: "IX. Leagues",
      questions: [
        {
          id: "q45",
          question: "How many Siege drives do you need to complete to qualify for end of the season Siege rewards?",
          answer: "You need to complete at least 20 Siege drives to qualify for end of the season Siege rewards."
        },
        {
          id: "q46",
          question: "How many LvL drives do you need to complete to qualify for end of the season LvL rewards?",
          answer: "You need to complete at least 12 LvL drives to qualify for end of the season LvL rewards."
        }
      ]
    },
    {
      id: "trades",
      title: "X. Trades",
      questions: [
        {
          id: "q47",
          question: "Why am I unable to complete the Field Pass trade a second time for Iconic {insert player name here}? How am I supposed to Mythic the player with only one Iconic version of them?",
          answer: "Unlike the other Field Pass Iconic trades, you may only complete that specific player's Iconic trade one time since the player is given as a VIP Field Pass Points milestone reward. Once you have completed their Iconic trade once, you will either have to purchase the VIP Field Pass ($29.99) and achieve the 27,000 Field Pass points milestone to obtain a second Iconic version of them OR you will have to pull them by chance from the random Iconic player Field Pass trade."
        },
        {
          id: "q48",
          question: "Why can't I exchange a player card I have? It's not appearing as an option to add to the trade slot despite meeting the requirement.",
          answer: "If you are unable to exchange a player via trades and you are positive they aren't slotted in any other trades already, that indicates you may have that player rostered in a lineup. Players must be removed from ALL your lineups to be eligible for trades. While the indicated player may not be rostered in your primary/default lineup, that player is likely being rostered in one of your additional lineups you may have set. You can check for additional lineups you may have created by selecting the down arrow to the right of your current lineup name on the 'My Team' screen. Once you remove that player from your lineup(s) you should be able to use them in trades."
        }
      ]
    },
    {
      id: "packs",
      title: "XI. Packs",
      questions: [
        {
          id: "q49",
          question: "When do Core Epic/Iconic Player Select packs update? Where can I see a comprehensive list of players that are available in these packs?",
          answer: "Generally, Epic/Iconic Core Player Select packs update monthly with the release of each new Field Pass. Although, it is not fully guaranteed that the pack contents will update as soon as the Field Pass drops. To ensure that the pack contents updated successfully, it is always recommended to first check the contents of the pack in-game, which you can do by navigating to the Field Pass screen, then scrolling to the 12,850 point VIP milestone (for the Epic Select) or the 21,450 point VIP milestone (for the Iconic Select). Then, simply click on the respective pack's art and select the 'More' button to see the full list. Alternatively, you can view the list categorized by offensive/defensive/special teams player groups by navigating to Trades → Core → Player Select, then selecting the card art inside each respective trade."
        },
        {
          id: "q50",
          question: "Do pack contents update automatically as long as the pack is unopened?",
          answer: "Pack contents do not update once the pack has been claimed and added to your inventory, whether you've opened it or not. As soon as you claim the pack, the pack is added to your inventory, and its contents are made final. Whatever is in the pack upon claiming it is what you will be offered upon opening it no matter how long you wait to open it. Note: If you are attempting to save Core player select packs from the Field Pass point milestone rewards for when those packs update alongside the release of the new Field Pass, you will need to leave those packs unclaimed in your milestone reward path for them to update successfully. As soon as you claim the milestone reward and the pack gets added to your inventory, the pack's contents will not update any further, regardless of whether or not you opened the pack."
        }
      ]
    },
    {
      id: "misc",
      title: "XII. Miscellaneous",
      questions: [
        {
          id: "q51",
          question: "What happened to the Auction House? Will it ever return?",
          answer: "The Auction House was removed from the game following Madden Mobile 21. There were various factors that led to the decision to remove the Auction House. Aside from eliminating cheating, it gives the ability for EA to better control the economy as they know exactly what users can build in each promo. The Auction House will not be returning."
        },
        {
          id: "q52",
          question: "Does the Seasons game mode help toward my Ultimate Team progress?",
          answer: "No, Seasons mode has no connection to one's Ultimate Team. They are two completely separate game modes. Nothing that you achieve while playing Seasons mode will help you toward your Ultimate Team progress."
        },
        {
          id: "q53",
          question: "What does 'F2P' and 'OOP' mean?",
          answer: "'F2P' stands for 'free-to-play.' F2P is often used to describe users who do not spend any real money on their Madden NFL Mobile experience. For example, if a user is inquiring about the best method of acquiring a player F2P, they are inquiring about the best method of acquiring a player without spending any money. 'OOP' stands for 'out of position.' OOP players are players who are given a position that they do not normally play. For example, this is why you may see Odell Beckham Jr. having a card that plays his usual wide receiver position, but then another Odell Beckham Jr. card that plays fullback."
        }
      ]
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${
      theme === "dark" ? "bg-zinc-900 text-gray-100" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">MM26 Frequently Asked Questions (FAQ)</h1>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Last Updated: August 11, 2025
          </p>
        </div>

        {/* Table of Contents */}
        <div className={`mb-12 p-6 rounded-lg ${
          theme === "dark" ? "bg-zinc-800 border border-zinc-700" : "bg-white border border-gray-200 shadow-md"
        }`}>
          <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
          <select
            onChange={(e) => scrollToSection(e.target.value)}
            defaultValue=""
            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors cursor-pointer ${
              theme === "dark"
                ? "bg-zinc-700 border-zinc-600 text-gray-100 hover:border-blue-400 focus:border-blue-400 focus:outline-none"
                : "bg-white border-gray-300 text-gray-900 hover:border-blue-500 focus:border-blue-500 focus:outline-none"
            }`}
          >
            <option value="" disabled>Select a section...</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        {/* FAQ Sections */}
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
            <div className="space-y-3">
              {section.questions.map((q) => (
                <div
                  key={q.id}
                  className={`rounded-lg overflow-hidden ${
                    theme === "dark" ? "bg-zinc-800 border border-zinc-700" : "bg-white border border-gray-200 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(q.id)}
                    className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${
                      theme === "dark" ? "hover:bg-zinc-700" : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-semibold pr-4">{q.question}</span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${
                        openQuestion === q.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openQuestion === q.id && (
                    <div className={`px-6 py-4 border-t ${
                      theme === "dark" ? "border-zinc-700 bg-zinc-800/50" : "border-gray-200 bg-gray-50"
                    }`}>
                      <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                        {q.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}