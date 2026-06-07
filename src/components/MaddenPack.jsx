import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function CoreRarePlayer() {
  const { theme } = useTheme();
    const navigate = useNavigate();

  // Sample pack data - replace with actual data
  const packData = {
    image: "https://i.imgur.com/9QDMidt.png", // Replace with actual pack image
    storeCost: "150 Madden Cash",
    reward: "1 Core Rare Player",
    probabilities: [
      { label: "83+ OVR", percentage: "100%" },
      { label: "94+ OVR", percentage: "59%" },
      { label: "106+ OVR", percentage: "8.7%" }
    ],
    contents: {
      offense: {
        QB: [
          { name: "Patrick Mahomes", ovr: 95, rarity: "Epic", program: "Core", position: "QB", image: "https://i.imgur.com/9QDMidt.png" },
          { name: "Josh Allen", ovr: 92, rarity: "Rare", program: "Core", position: "QB", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        HB: [
          { name: "Saquon Barkley", ovr: 94, rarity: "Epic", program: "Core", position: "HB", image: "https://i.imgur.com/9QDMidt.png" },
          { name: "Derrick Henry", ovr: 91, rarity: "Rare", program: "Core", position: "HB", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        FB: [
          { name: "Kyle Juszczyk", ovr: 90, rarity: "Rare", program: "Core", position: "FB", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        WR: [
          { name: "Tyreek Hill", ovr: 96, rarity: "Epic", program: "Core", position: "WR", image: "https://i.imgur.com/9QDMidt.png" },
          { name: "Justin Jefferson", ovr: 93, rarity: "Rare", program: "Core", position: "WR", image: "https://i.imgur.com/9QDMidt.png" },
          { name: "CeeDee Lamb", ovr: 91, rarity: "Rare", program: "Core", position: "WR", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        TE: [
          { name: "Travis Kelce", ovr: 92, rarity: "Rare", program: "Core", position: "TE", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        OT: [
          { name: "Trent Williams", ovr: 94, rarity: "Epic", program: "Core", position: "OT", image: "https://i.imgur.com/9QDMidt.png" },
          { name: "Lane Johnson", ovr: 90, rarity: "Rare", program: "Core", position: "OT", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        OG: [
          { name: "Zack Martin", ovr: 91, rarity: "Rare", program: "Core", position: "OG", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        C: [
          { name: "Jason Kelce", ovr: 90, rarity: "Rare", program: "Core", position: "C", image: "https://i.imgur.com/9QDMidt.png" }
        ]
      },
      defense: {
        DE: [
          { name: "Myles Garrett", ovr: 95, rarity: "Epic", program: "Core", position: "DE", image: "https://i.imgur.com/9QDMidt.png" },
          { name: "Nick Bosa", ovr: 92, rarity: "Rare", program: "Core", position: "DE", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        DT: [
          { name: "Aaron Donald", ovr: 91, rarity: "Rare", program: "Core", position: "DT", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        LB: [
          { name: "Micah Parsons", ovr: 93, rarity: "Rare", program: "Core", position: "LB", image: "https://i.imgur.com/9QDMidt.png" },
          { name: "T.J. Watt", ovr: 90, rarity: "Rare", program: "Core", position: "LB", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        MLB: [
          { name: "Fred Warner", ovr: 94, rarity: "Epic", program: "Core", position: "MLB", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        CB: [
          { name: "Sauce Gardner", ovr: 96, rarity: "Epic", program: "Core", position: "CB", image: "https://i.imgur.com/9QDMidt.png" },
          { name: "Jalen Ramsey", ovr: 91, rarity: "Rare", program: "Core", position: "CB", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        S: [
          { name: "Derwin James", ovr: 92, rarity: "Rare", program: "Core", position: "S", image: "https://i.imgur.com/9QDMidt.png" }
        ]
      },
      specialTeams: {
        K: [
          { name: "Justin Tucker", ovr: 88, rarity: "Rare", program: "Core", position: "K", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        KR: [
          { name: "Cordarrelle Patterson", ovr: 90, rarity: "Rare", program: "Core", position: "KR", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        P: [
          { name: "AJ Cole", ovr: 87, rarity: "Rare", program: "Core", position: "P", image: "https://i.imgur.com/9QDMidt.png" }
        ],
        PR: [
          { name: "KaVontae Turpin", ovr: 89, rarity: "Rare", program: "Core", position: "PR", image: "https://i.imgur.com/9QDMidt.png" }
        ]
      }
    }
  };

  return (
    <div className={`p-4 min-h-screen ${theme === "dark" ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <button
        onClick={() => window.history.back()}
        className="inline-block mt-[-8px] mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
      >
        ← Back to Packs Homepage
      </button>

      <div className="flex flex-col lg:flex-row gap-6 mb-6 justify-between">
        {/* Left side: Pack image and title info */}
        <div className="flex gap-4">
          <img
            src={packData.image}
            alt="Core Rare Player Pack"
            className={`w-64 h-80 object-contain rounded ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">Core Rare Player Pack</h1>
            <p className="mb-2"><strong>Store Cost:</strong> {packData.storeCost}</p>
            <p className="mb-2"><strong>Reward:</strong> {packData.reward}</p>
            <p className="mb-2"><strong>Last Updated:</strong> February 7, 2025</p>
            <p><strong>Next Expected Update:</strong> March 7, 2025</p>
          </div>
        </div>

        {/* Right side: Probabilities */}
        <div className={`w-full lg:w-[50%] p-4 rounded border ${theme === 'dark' ? 'bg-zinc-800 border-slate-700' : 'bg-white border-gray-300'}`}>
          <h2 className="text-xl font-bold mb-4" style={{ color: theme === 'dark' ? '#38bdf8' : '#0ea5e9' }}>
            Probabilities (Per Pack)
          </h2>
          
          <div className="space-y-3 mb-4">
            {packData.probabilities.map((prob, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-lg whitespace-nowrap">{prob.label}</span>
                <span className="flex-1 border-b-2 border-dotted" style={{ borderColor: theme === 'dark' ? '#64748b' : '#9ca3af' }}></span>
                <span className="text-lg font-semibold whitespace-nowrap">{prob.percentage}</span>
              </div>
            ))}
          </div>

          <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
            <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Pack probabilities are calculated on a Pack-by-Pack basis and are not cumulative.</li>
              <li>• Each Pack opening is an independent event, meaning opening multiple of the same Pack does not alter the likelihood of receiving a particular item.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pack Contents Title */}
      <h2 className={`text-2xl font-bold mb-6 ${
        theme === "dark" ? "text-gray-100" : "text-gray-900"
      }`}>
        Possible Rewards:
      </h2>

      {/* Offense Grid */}
      <div className={`mb-8 rounded-lg shadow-md p-6 border-2 ${
        theme === "dark" ? "bg-zinc-800 border-blue-500" : "bg-white border-blue-600"
      }`}>
        <h3 className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-blue-400" : "text-blue-600"
        }`}>
          Offense
        </h3>
        {Object.entries(packData.contents.offense).map(([position, players]) => (
          <div key={position} className="mb-6">
            <h4 className="font-bold text-base mb-3">{position}</h4>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 gap-3">
              {players.map((player, idx) => (
                <div 
                  key={`${position}-${idx}`}
                  className={`p-2 rounded border w-33 ${
                    theme === 'dark' ? 'bg-zinc-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <img
                    src={player.image}
                    alt={player.name}
                    className={`w-full h-30 object-contain mb-2 rounded ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
                    }`}
                  />
                  <p className="font-bold text-sm mb-1.5">{player.name}</p>
                  <div className="text-xs space-y-0.5">
                    <p><strong>OVR:</strong> {player.ovr}</p>
                    <p><strong>Rarity:</strong> {player.rarity}</p>
                    <p><strong>Program:</strong> {player.program}</p>
                    <p><strong>Position:</strong> {player.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Defense Grid */}
      <div className={`mb-8 rounded-lg shadow-md p-6 border-2 ${
        theme === "dark" ? "bg-zinc-800 border-red-500" : "bg-white border-red-600"
      }`}>
        <h3 className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-red-400" : "text-red-600"
        }`}>
          Defense
        </h3>
        {Object.entries(packData.contents.defense).map(([position, players]) => (
          <div key={position} className="mb-6">
            <h4 className="font-bold text-base mb-3">{position}</h4>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 gap-3">
              {players.map((player, idx) => (
                <div 
                  key={`${position}-${idx}`}
                  className={`p-2 rounded border w-33 ${
                    theme === 'dark' ? 'bg-zinc-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <img
                    src={player.image}
                    alt={player.name}
                    className={`w-full h-30 object-contain mb-2 rounded ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
                    }`}
                  />
                  <p className="font-bold text-sm mb-1.5">{player.name}</p>
                  <div className="text-xs space-y-0.5">
                    <p><strong>OVR:</strong> {player.ovr}</p>
                    <p><strong>Rarity:</strong> {player.rarity}</p>
                    <p><strong>Program:</strong> {player.program}</p>
                    <p><strong>Position:</strong> {player.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Special Teams Grid */}
      <div className={`rounded-lg shadow-md p-6 border-2 ${
        theme === "dark" ? "bg-zinc-800 border-green-500" : "bg-white border-green-600"
      }`}>
        <h3 className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-green-400" : "text-green-600"
        }`}>
          Special Teams
        </h3>
        {Object.entries(packData.contents.specialTeams).map(([position, players]) => (
          <div key={position} className="mb-6">
            <h4 className="font-bold text-base mb-3">{position}</h4>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 gap-3">
              {players.map((player, idx) => (
                <div 
                  key={`${position}-${idx}`}
                  className={`p-2 rounded border w-33 ${
                    theme === 'dark' ? 'bg-zinc-700 border-gray-600' : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <img
                    src={player.image}
                    alt={player.name}
                    className={`w-full h-30 object-contain mb-2 rounded ${
                      theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
                    }`}
                  />
                  <p className="font-bold text-sm mb-1.5">{player.name}</p>
                  <div className="text-xs space-y-0.5">
                    <p><strong>OVR:</strong> {player.ovr}</p>
                    <p><strong>Rarity:</strong> {player.rarity}</p>
                    <p><strong>Program:</strong> {player.program}</p>
                    <p><strong>Position:</strong> {player.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}