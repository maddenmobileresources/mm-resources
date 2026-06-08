import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import plays from "../data/MM26PlayDatabase";

function Pagination({ currentPage, totalPages, onPageChange, theme }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 my-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded font-medium transition-colors ${
          currentPage === 1
            ? theme === "dark"
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            : theme === "dark"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className={`px-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                currentPage === page
                  ? theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : theme === "dark"
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded font-medium transition-colors ${
          currentPage === totalPages
            ? theme === "dark"
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            : theme === "dark"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
}

function FilterInput({ label, type, placeholder, value, onChange, min, theme }) {
  return (
    <div className="flex flex-col">
      <span className="font-bold">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded px-2 py-1 w-full ${
          theme === "dark" 
            ? "bg-zinc-800 text-gray-100 border-gray-600" 
            : "bg-white text-gray-900 border-gray-300"
        }`}
        min={min}
      />
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, theme }) {
  return (
    <div className="player-filter-select-wrap flex flex-col">
      <span className="font-bold">{label}</span>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className={`player-filter-select border rounded px-2 py-1 w-full ${
          theme === "dark" 
            ? "bg-zinc-800 text-gray-100 border-gray-600" 
            : "bg-white text-gray-900 border-gray-300"
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function PlayCard({ play, selectedPlays, togglePlay, theme }) {
  const navigate = useNavigate();
  const isSelected = selectedPlays.some((p) => p.id === play.id);

  return (
    <div
      onClick={() => navigate(`/play/${play.id}`)}
      className={`rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
        isSelected 
          ? "bg-green-100 dark:bg-green-900 border-2 border-green-500 shadow-md" 
          : theme === "dark"
            ? "bg-zinc-800 border border-gray-600 hover:bg-zinc-700"
            : "bg-white border border-gray-400 hover:bg-gray-50"
      }`}
    >
      <div className="p-4">
        <img 
          src={play.image} 
          alt={play.name} 
          className={`w-full h-32 object-cover rounded mb-3 ${
            theme === "dark" ? "border border-gray-600 bg-zinc-700" : "border border-gray-300 bg-gray-100"
          }`}
        />
        <h3 className={`font-bold text-lg mb-2 ${isSelected ? "text-gray-900" : ""}`}>
          {play.name}
        </h3>
        <div className={`text-sm space-y-1 mb-3 ${
          isSelected ? "text-gray-900" : theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
          <p>
            <strong>Type:</strong>{" "}
            <span style={{ 
              color: play.type === "Run" ? "#1fdd1fff" 
                : play.type === "Short Pass" ? "#9d1ed7ff"
                : play.type === "Long Pass" ? "#2a7cd8ff"
                : play.type === "Play Action" ? "#cd6d2eff"
                : "inherit"
            }}>
              {play.type}
            </span>
          </p>
          <p><strong>Playbook Budget:</strong> {play.pbb}</p>
          <p><strong>Cost:</strong> {play.cost.toLocaleString()} Play Tokens</p>
          <p><strong>OVR Boost:</strong> +{play.ovrBoost}</p>
          <p><strong>Play Count:</strong> {play.playCount}</p>
          <p><strong>Average Yards:</strong> {play.averageYards}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay(play);
          }}
          className={`w-full py-2 rounded font-semibold transition-colors ${
            isSelected
              ? "bg-red-500 hover:bg-red-600 text-white"
              : theme === "dark"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isSelected ? "Remove from Compare" : "Add to Compare"}
        </button>
      </div>
    </div>
  );
}

function CompareTable({ selectedPlays, togglePlay, theme }) {
  const navigate = useNavigate();
  
  const getHighlightClass = (values, currentValue) => {
    if (values.length <= 1) return "";
    const sortedUnique = [...new Set(values)].sort((a, b) => b - a);
    if (currentValue === sortedUnique[0]) return "bg-green-200 text-gray-900";
    if (currentValue === sortedUnique[sortedUnique.length - 1]) return "bg-red-200 text-gray-900";
    return "bg-yellow-200 text-gray-900";
  };

  return (
    <div className={`p-4 border rounded ${
      theme === "dark" 
        ? "bg-zinc-800 border-gray-700 text-gray-100" 
        : "bg-gray-100 border-gray-300 text-gray-900"
    }`}>
      <h2 className="text-xl font-bold mb-4">Play Compare ({selectedPlays.length}/5)</h2>
      {selectedPlays.length === 0 ? (
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
          Select plays to compare.
        </p>
      ) : (
        <div className="play-compare-scroll overflow-x-auto">
          <table className={`play-compare-table play-compare-count-${selectedPlays.length} table-fixed w-full text-sm border-collapse text-center`}>
            <thead>
              <tr className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"}>
                <th className={`border px-2 py-1 w-[20%] ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                  Stat
                </th>
                {selectedPlays.map((play) => (
                  <th 
                    key={play.id} 
                    className={`border px-2 py-1 cursor-pointer hover:opacity-80 transition-opacity`}
                    style={{
                      backgroundColor: play.type === "Run" ? "#54a354ff" 
                        : play.type === "Short Pass" ? "#835499ff"
                        : play.type === "Long Pass" ? "#4e7199ff"
                        : play.type === "Play Action" ? "#8f694fff"
                        : theme === "dark" ? "#3f3f46" : "#ffffff",
                      borderColor: theme === "dark" ? "#4b5563" : "#d1d5db"
                    }}
                    onClick={() => navigate(`/play/${play.id}`)}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <img 
                        src={play.image} 
                        alt={play.name} 
                        className="h-14 w-auto object-contain mb-2" 
                      />
                      <div className="flex justify-center items-center gap-2 w-full">
                        <span className="font-semibold text-white">
                          {play.name}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay(play);
                          }} 
                          className="text-red-500 font-bold hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}>
                  Type
                </td>
                {selectedPlays.map((play) => (
                  <td 
                    key={play.id} 
                    className={`border px-2 py-1 ${
                      theme === "dark" ? "border-gray-600" : "border-gray-300"
                    }`}
                  >
                    {play.type}
                  </td>
                ))}
              </tr>
              
              <tr>
                <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}>
                  Playbook Budget
                </td>
                {selectedPlays.map((play) => {
                  const values = selectedPlays.map(p => p.pbb);
                  const highlightClass = getHighlightClass(values, play.pbb);
                  return (
                    <td 
                      key={play.id} 
                      className={`play-compare-value-cell border px-2 py-1 ${highlightClass} ${
                        theme === "dark" ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      {play.pbb}
                    </td>
                  );
                })}
              </tr>
              
              <tr>
                <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}>
                  Cost
                </td>
                {selectedPlays.map((play) => {
                  const values = selectedPlays.map(p => p.cost);
                  const highlightClass = getHighlightClass(values, play.cost);
                  return (
                    <td 
                      key={play.id} 
                      className={`play-compare-value-cell border px-2 py-1 ${highlightClass} ${
                        theme === "dark" ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      {play.cost.toLocaleString()} Play Tokens
                    </td>
                  );
                })}
              </tr>
              
              <tr>
                <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}>
                  OVR Boost
                </td>
                {selectedPlays.map((play) => {
                  const values = selectedPlays.map(p => p.ovrBoost);
                  const highlightClass = getHighlightClass(values, play.ovrBoost);
                  return (
                    <td 
                      key={play.id} 
                      className={`border px-2 py-1 ${highlightClass} ${
                        theme === "dark" ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      +{play.ovrBoost}
                    </td>
                  );
                })}
              </tr>
              
              <tr>
                <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}>
                  Play Count
                </td>
                {selectedPlays.map((play) => {
                  const values = selectedPlays.map(p => p.playCount);
                  const highlightClass = getHighlightClass(values, play.playCount);
                  return (
                    <td 
                      key={play.id} 
                      className={`border px-2 py-1 ${highlightClass} ${
                        theme === "dark" ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      {play.playCount}
                    </td>
                  );
                })}
              </tr>
              
              <tr>
                <td className={`bg-blue-600 text-white font-bold border px-2 py-1 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}>
                  Average Yards
                </td>
                {selectedPlays.map((play) => {
                  const values = selectedPlays.map(p => p.averageYards);
                  const highlightClass = getHighlightClass(values, play.averageYards);
                  return (
                    <td 
                      key={play.id} 
                      className={`border px-2 py-1 ${highlightClass} ${
                        theme === "dark" ? "border-gray-600" : "border-gray-300"
                      }`}
                    >
                      {play.averageYards}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function MM26Plays({ selectedPlays = [], setSelectedPlays, togglePlay }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [playbookFilter, setPlaybookFilter] = useState("All");
  const [costFilter, setCostFilter] = useState("All");
  const [ovrBoostFilter, setOvrBoostFilter] = useState("All");
  const [minPlayCount, setMinPlayCount] = useState("");
  const [minAvgYards, setMinAvgYards] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const playsPerPage = 20;

  // If togglePlay is not provided, create a local one
  const handleTogglePlay = togglePlay || ((play) => {
    if (!setSelectedPlays) return;
    setSelectedPlays((prev) => {
      const isSelected = prev.some((p) => p.id === play.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== play.id);
      } else {
        if (prev.length >= 5) {
          alert("You can only compare up to 5 plays at once.");
          return prev;
        }
        return [...prev, play];
      }
    });
  });

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setPlaybookFilter("All");
    setCostFilter("All");
    setOvrBoostFilter("All");
    setMinPlayCount("");
    setMinAvgYards("");
    setCurrentPage(1);
  };

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setTypeFilter(searchParams.get("type") || "All");
    setPlaybookFilter(searchParams.get("playbook") || "All");
    setCostFilter(searchParams.get("cost") || "All");
    setOvrBoostFilter(searchParams.get("ovrBoost") || "All");
    setMinPlayCount(searchParams.get("minPlayCount") || "");
    setMinAvgYards(searchParams.get("minAvgYards") || "");
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, typeFilter, playbookFilter, costFilter, ovrBoostFilter, minPlayCount, minAvgYards]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedPlays.length > 0) params.set("plays", selectedPlays.map((p) => p.id).join(","));
    if (search) params.set("search", search);
    if (typeFilter !== "All") params.set("type", typeFilter);
    if (playbookFilter !== "All") params.set("playbook", playbookFilter);
    if (costFilter !== "All") params.set("cost", costFilter);
    if (ovrBoostFilter !== "All") params.set("ovrBoost", ovrBoostFilter);
    if (minPlayCount) params.set("minPlayCount", minPlayCount);
    if (minAvgYards) params.set("minAvgYards", minAvgYards);

    const searchString = params.toString();
    const currentSearch = location.search.replace(/^\?/, "");
    if (searchString !== currentSearch) {
      navigate("?" + searchString, { replace: true });
    }
  }, [selectedPlays, search, typeFilter, playbookFilter, costFilter, ovrBoostFilter, minPlayCount, minAvgYards, navigate, location.search]);

  const filteredPlays = plays.filter((play) => {
    const matchesSearch = play.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || play.type === typeFilter;
    const matchesPlaybook = playbookFilter === "All" || play.playbook === playbookFilter;
    
    let matchesCost = true;
    if (costFilter !== "All") {
      const costValue = parseInt(costFilter.replace(/[^0-9]/g, ''));
      matchesCost = play.cost === costValue;
    }
    
    let matchesOvrBoost = true;
    if (ovrBoostFilter !== "All") {
      const boostValue = parseInt(ovrBoostFilter.replace(/[^0-9]/g, ''));
      matchesOvrBoost = play.ovrBoost === boostValue;
    }
    
    const matchesMinPlayCount = minPlayCount === "" || play.playCount >= Number(minPlayCount);
    const matchesMinAvgYards = minAvgYards === "" || play.averageYards >= Number(minAvgYards);

    return matchesSearch && matchesType && matchesPlaybook && matchesCost && matchesOvrBoost && matchesMinPlayCount && matchesMinAvgYards;
  });

  const typeOptions = ["All", ...new Set(plays.map(p => p.type))];
  const playbookOptions = ["All", ...new Set(plays.map(p => p.playbook))];
  const costOptions = ["All", "500 Play Tokens", "1,000 Play Tokens", "1,500 Play Tokens", "2,000 Play Tokens"];
  const ovrBoostOptions = ["All", "+3 OVR", "+5 OVR", "+7 OVR"];

  const totalPages = Math.ceil(filteredPlays.length / playsPerPage);
  const startIndex = (currentPage - 1) * playsPerPage;
  const endIndex = startIndex + playsPerPage;
  const currentPlays = filteredPlays.slice(startIndex, endIndex);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-zinc-900 text-gray-100" : "bg-gray-50 text-gray-900"
    }`}>
      <main className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Play Database</h1>
          <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Last Updated: December 8, 2025
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className={`w-full lg:w-[40%] p-4 border rounded ${
            theme === "dark" 
              ? "bg-zinc-800 border-gray-700" 
              : "bg-gray-100 border-gray-300"
          }`}>
            <h2 className="text-xl font-bold mb-4">Search Filters</h2>
            <div className="grid grid-cols-2 gap-4">
              <FilterInput label="Name:" type="text" placeholder="Search by name..." value={search} onChange={setSearch} theme={theme} />
              <FilterSelect label="Type:" value={typeFilter} onChange={setTypeFilter} options={typeOptions} theme={theme} />
              <FilterSelect label="Playbook Budget:" value={playbookFilter} onChange={setPlaybookFilter} options={playbookOptions} theme={theme} />
              <FilterSelect label="Cost:" value={costFilter} onChange={setCostFilter} options={costOptions} theme={theme} />
              <FilterSelect label="OVR Boost:" value={ovrBoostFilter} onChange={setOvrBoostFilter} options={ovrBoostOptions} theme={theme} />
              <FilterInput label="Play Count: ≥" type="number" placeholder="Min Play Count" value={minPlayCount} onChange={setMinPlayCount} min="0" theme={theme} />
              <FilterInput label="Average Yards: ≥" type="number" placeholder="Min Average Yards" value={minAvgYards} onChange={setMinAvgYards} min="0" theme={theme} />
              <div className="flex flex-col justify-end">
                <button 
                  onClick={resetFilters} 
                  className="px-4 bg-red-500 text-white rounded hover:bg-red-600 font-semibold h-[34px] flex items-center justify-center leading-none"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-[60%]">
            <CompareTable selectedPlays={selectedPlays} togglePlay={handleTogglePlay} theme={theme} />
          </div>
        </div>

        <div className={`mb-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Showing {startIndex + 1}-{Math.min(endIndex, filteredPlays.length)} of {filteredPlays.length} plays
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {currentPlays.length > 0 ? (
            currentPlays.map((play) => (
              <PlayCard 
                key={play.id} 
                play={play} 
                selectedPlays={selectedPlays} 
                togglePlay={handleTogglePlay} 
                theme={theme}
              />
            ))
          ) : (
            <p className={`col-span-full text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              No plays found.
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            theme={theme}
          />
        )}
      </main>
    </div>
  );
}
