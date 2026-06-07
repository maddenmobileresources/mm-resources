import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Stats() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("basic");

  const categories = {
    basic: {
      title: "Basic Attributes",
      description: "Fundamental attributes that all players share.",
      stats: [
        { name: "Height (HT)", desc: "Makes a difference during gameplay. Taller receivers can jump to grab passes, and taller defenders are more likely to swat down passes or block kicks." },
        { name: "Speed (SPD)", desc: "How fast a player runs after fully accelerating." },
        { name: "Strength (STR)", desc: "Provides a boost for blocking, shedding blocks, power moves, throwing and trucking." },
        { name: "Agility (AGI)", desc: "How well the player cuts when running, responding to the Left Stick more quickly." },
        { name: "Acceleration (ACC)", desc: "How quickly a player achieves his full speed." },
        { name: "Awareness (AWR)", desc: "Reacting to the other players on the field, both teammates and opponents." },
        { name: "Jumping (JMP)", desc: "How high a player jumps." },
        { name: "Stamina (STA)", desc: "How quickly a player gets tired and requires substitution." },
        { name: "Injury (INJ)", desc: "How often a player will be injured." }
      ]
    },
    rushing: {
      title: "Rushing Attributes",
      description: "How players perform when carrying the ball. Primary focus for running backs, but also important for receivers after the catch and scrambling quarterbacks.",
      stats: [
        { name: "Trucking (TRK)", desc: "How well a runner knocks down a defender's tackle attempt." },
        { name: "Elusiveness (ELS)", desc: "How well the runner jukes, makes spin moves, and breaks tackles." },
        { name: "Ball Carrier Vision (BCV)", desc: "The runner's ability to navigate in between blocks to hit holes." },
        { name: "Stiff Arm (SFA)", desc: "Effectiveness of the runner's stiff arm move." },
        { name: "Spin Move (SPM)", desc: "Effectiveness of the runner's spin move." },
        { name: "Juke Move (JKM)", desc: "Effectiveness of the runner's juke move." },
        { name: "Carrying (CAR)", desc: "The runner's ability to hold onto the ball and decrease the chance of fumbles." }
      ]
    },
    receiving: {
      title: "Receiving Attributes",
      description: "Attributes that help determine whether a catch is made. Important for wide receivers, tight ends, and running backs.",
      stats: [
        { name: "Catching (CTH)", desc: "How well the receiver catches the ball while moving in the open field." },
        { name: "Catch in Traffic (CIT)", desc: "How well the receiver catches the ball with a defender near him." },
        { name: "Route Running (RTE)", desc: "Creates more separation for the receiver against Man Coverage." },
        { name: "Spectacular Catch (SPC)", desc: "How often the receiver makes sideline, one-handed, or jumping catches." },
        { name: "Release (RLS)", desc: "Determines the receiver's ability to beat Press coverage." }
      ]
    },
    throwing: {
      title: "Throwing Attributes",
      description: "Almost always used by quarterbacks, but also apply to halfback passes or fake kick plays.",
      stats: [
        { name: "Throw Power (THP)", desc: "Determines maximum throwing distance and the speed of the ball in flight." },
        { name: "Throw Accuracy Short (TAS)", desc: "Accuracy for passes under 20 yards." },
        { name: "Throw Accuracy Mid (TAM)", desc: "Accuracy for passes between 20-40 yards." },
        { name: "Throw Accuracy Deep (TAD)", desc: "Accuracy for passes more than 40 yards." },
        { name: "Throw on the Run (TOR)", desc: "How well the passer throws the ball when moving outside of the pocket." },
        { name: "Play Action (PAC)", desc: "How well the thrower's fake handoff baits the defender into playing the run." }
      ]
    },
    offensive: {
      title: "Offensive Line Attributes",
      description: "Used by every offensive player that blocks on a play, including offensive linemen, tight ends, fullbacks, and wide receivers.",
      stats: [
        { name: "Run Block (RBK)", desc: "How well the blocker engages the defender and holds his block for a run play." },
        { name: "Pass Block (PBK)", desc: "How well the blocker holds his block when protecting for a pass play." },
        { name: "Impact Blocking (IMP)", desc: "The ability to pancake (knock the defender down) when blocking in the open field." }
      ]
    },
    defensive: {
      title: "Defensive Attributes",
      description: "Important attributes for all defending players, from linemen to linebackers to defensive backs.",
      stats: [
        { name: "Tackle (TAK)", desc: "Determines success at making a tackle. Compared with Stiff Arm and Trucking." },
        { name: "Hit Power (POW)", desc: "How hard a defender tackles, including chance of fumbles and injuries." },
        { name: "Power Move (PWM)", desc: "Using strength to defeat the offensive line. Compared with Pass Block." },
        { name: "Finesse Move (FNM)", desc: "Using swim and spin moves to defeat the offensive line. Determines time required to perform a successful move." },
        { name: "Block Shedding (BKS)", desc: "Ability to get off a block, allowing pursuit of the ball carrier or success versus run block double teams." },
        { name: "Pursuit (PUR)", desc: "Ability to catch up to the ball carrier, when unblocked or when his block is shed." },
        { name: "Play Recognition (PRC)", desc: "Reacting to run or pass and defending specific routes. Also reacting properly to play action or screen plays." },
        { name: "Man Coverage (MCV)", desc: "Ability and tackle skill chance when man to man coverage is called. Compared with Route Running." },
        { name: "Zone Coverage (ZCV)", desc: "Ability and tackle skill chance when zone coverage is called." },
        { name: "Press (PRS)", desc: "Ability to harass the receiver at the line of scrimmage when press coverage is called. Compared to Release." }
      ]
    },
    special: {
      title: "Special Teams Attributes",
      description: "Attributes used during field goal attempts, punts, and kick returns.",
      stats: [
        { name: "Kick Power (KPW)", desc: "Determines the maximum distance the player can kick or punt." },
        { name: "Kick Accuracy (KAC)", desc: "How easy it is to kick (affects the speed of the kick meter)." },
        { name: "Kick Return (KR)", desc: "Enhances breaking tackles and elusiveness for kick and punt returners." }
      ]
    }
  };

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Stats Explained
        </h1>
        
        <p className={`text-center mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          Understanding player attributes and what they mean for gameplay
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === key
                  ? theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : theme === "dark"
                  ? "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {categories[key].title}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <div className={`rounded-lg p-6 ${theme === "dark" ? "bg-zinc-800" : "bg-white shadow-md"}`}>
          <h2 className="text-2xl font-bold mb-2">
            {categories[activeCategory].title}
          </h2>
          <p className={`mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {categories[activeCategory].description}
          </p>

          {/* Stats List */}
          <div className="space-y-4">
            {categories[activeCategory].stats.map((stat, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-zinc-900" : "bg-gray-50"
                }`}
              >
                <h3 className={`font-bold text-lg mb-1 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}>
                  {stat.name}
                </h3>
                <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}