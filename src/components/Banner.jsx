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
      <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-center sm:px-6 sm:justify-between">
        <img 
          src="https://i.imgur.com/ZtjrAdo.png" 
          alt="MMR Logo" 
          className="h-14 max-w-full object-contain drop-shadow-lg sm:h-16"
        />
        <div className="hidden flex-col items-start text-right md:flex">
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

