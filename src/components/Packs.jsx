import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Packs() {
  const { theme } = useTheme();

  // Pack data with Imgur direct links
  const packs = [
    {
      name: "Core Rare Player Pack",
      route: "/packs/core-rare-player-pack",
      image: "https://i.imgur.com/Kwpy1yY.png"
    },
    {
      name: "Core Epic Player Pack",
      route: "/packs/core-epic-player-pack",
      image: "https://i.imgur.com/dBICb82.png"
    },
    {
      name: "Core Iconic Player Pack",
      route: "/packs/core-iconic-player-pack",
      image: "https://i.imgur.com/BOhRoQJ.png"
    },
    {
      name: "Pro Pack",
      route: "/packs/pro-pack",
      image: "https://i.imgur.com/bvCvk5W.png"
    },
    {
      name: "All-Pro Pack",
      route: "/packs/all-pro-pack",
      image: "https://i.imgur.com/eIRkhPV.png"
    },
    {
      name: "Madden Pack",
      route: "/packs/madden-pack",
      image: "https://i.imgur.com/p8rcT3Y.png"
    },
    {
      name: "Basic Trait Pack",
      route: "/packs/basic-trait-pack",
      image: "https://i.imgur.com/LvwOrlc.png"
    },
    {
      name: "Premium Trait Pack",
      route: "/packs/premium-trait-pack",
      image: "https://i.imgur.com/a8G3I20.png"
    }
  ];

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-[#18181B] text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <h1 className="text-3xl font-bold text-center mb-2">
        Madden Mobile Packs
      </h1>
      
      <p className={`text-center mb-8 max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        Browse through available packs and see their complete contents, odds, and rewards.
      </p>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {packs.map((pack) => (
          <Link
            key={pack.route}
            to={pack.route}
            className={`group rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
              theme === "dark" 
                ? "bg-zinc-800 border border-gray-700 hover:border-blue-500" 
                : "bg-white hover:border-blue-400 border border-gray-200"
            }`}
          >
            {/* Pack Image - SIMPLIFIED */}
            <div className="w-full h-96 bg-zinc-900">
              <img
                src={pack.image}
                alt={pack.name}
                className="w-full h-full"
                style={{ objectFit: 'contain' }}
              />
            </div>
            
            {/* Pack Name */}
            <div className={`p-4 text-center ${
              theme === "dark" ? "bg-zinc-800" : "bg-white"
            }`}>
              <h3 className={`font-bold text-lg group-hover:text-blue-500 transition-colors ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}>
                {pack.name}
              </h3>
              {pack.description && (
                <p className={`mt-2 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {pack.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
