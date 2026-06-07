import React from "react";

export default function HeaderBanner() {
  return (
    <div 
      className="w-full text-white shadow-md"
      style={{ 
        backgroundImage: 'url(https://i.imgur.com/97c30pH.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <img 
          src="https://i.imgur.com/ZtjrAdo.png" 
          alt="MMR Logo" 
          className="h-16 w-auto drop-shadow-lg"
        />
        <div className="flex flex-col items-start text-right">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide drop-shadow-lg">
            Madden Mobile Resources
          </h1>
          <span className="text-sm text-blue-100 mt-[-4px] drop-shadow-lg">
            [MMR]
          </span>
        </div>
      </div>
    </div>
  );
}

