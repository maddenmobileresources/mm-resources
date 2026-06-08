import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import PlayerProfile from "./PlayerProfile";
import PlayProfile from "./PlayProfile";
import ThemeTeamDetail from "./ThemeTeamDetail";
import MultiThemeTeamDetail from "./MultiThemeTeamDetail";
import Calendars from "./components/Calendars";
import MM27 from "./components/MM27";
import MM26 from "./components/MM26";
import MM25 from "./components/MM25";
import MM24 from "./components/MM24";
import MM23 from "./components/MM23";
import MM22 from "./components/MM22";
import Home from "./components/Home";
import Banner from "./components/Banner";
import Layout from "./Layout";
import { useTheme } from "./context/ThemeContext";
import players from "./data/MM26PlayerDatabase";
import plays from "./data/MM26PlayDatabase";
import Aug25 from "./components/Aug25";
import Sept25 from "./components/Sept25";
import Oct25 from "./components/Oct25";
import Nov25 from "./components/Nov25";
import Dec25 from "./components/Dec25";
import Packs from "./components/Packs";
import PackOpener from "./components/PackOpener";
import News from "./components/News";
import Guides from "./components/Guides";
import Events from "./components/Events";
import Competitive from "./components/Competitive";
import Leagues from "./components/Leagues";
import TeamBuilding from "./components/TeamBuilding";
import DualPlayers from "./components/DualPlayers";
import Evolution from "./components/Evolution";
import FieldPass from "./components/FieldPass";
import LvL from "./components/LvL";
import PointAttack from "./components/PointAttack";
import TeamofTheWeek from "./components/TeamofTheWeek";
import TeamDiamonds from "./components/TeamDiamonds";
import MaddenHeroes from "./components/MaddenHeroes";
import Promos from "./components/Promos";
import OpeningDrive from "./components/OpeningDrive";
import CampusHeroes from "./components/CampusHeroes";
import NFLKickoff from "./components/NFLKickoff";
import Legends from "./components/Legends";
import International from "./components/International";
import MostFeared from "./components/MostFeared";
import Breakouts from "./components/Breakouts";
import RecordBreakers from "./components/RecordBreakers";
import Feast from "./components/Feast";
import GOAT from "./components/GOAT";
import UltimateFreeze from "./components/UltimateFreeze";
import WhatIf from "./components/WhatIf";
import CollectorsSeries from "./components/CollectorsSeries";
import SuperBowl from "./components/SuperBowl";
import FanFavorites from "./components/FanFavorites";
import TeamofTheYearI from "./components/TeamofTheYearI";
import TeamofTheYearII from "./components/TeamofTheYearII";
import SugarRush from "./components/SugarRush";
import NFLDraft from "./components/NFLDraft";
import CollectorsSeriesII from "./components/CollectorsSeriesII";
import Playbooks from "./components/Playbooks";
import SeasonTeamTraining from "./components/SeasonTeamTraining";
import Siege from "./components/Siege";
import SpotlightPass from "./components/SpotlightPass";
import Traits from "./components/Traits";
import DailyArena from "./components/DailyArena";
import UnlimitedArena from "./components/UnlimitedArena";
import VS from "./components/VS";
import Stats from "./components/Stats";
import CoreRarePlayer from "./components/CoreRarePlayer";
import CoreEpicPlayer from "./components/CoreEpicPlayer";
import CoreIconicPlayer from "./components/CoreIconicPlayer";
import ProPack from "./components/ProPack";
import AllProPack from "./components/AllProPack";
import MaddenPack from "./components/MaddenPack";
import BasicTraitPack from "./components/BasicTraitPack";
import PremiumTraitPack from "./components/PremiumTraitPack";
import MM26Players from "./components/MM26Players";
import MM26Plays from "./components/MM26Plays";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ThemeTeams from "./components/ThemeTeams";
import FAQ from "./components/FAQ";
import Acronyms from "./components/Acronyms";
import Community from "./components/Community";
import TeamAnalyzer from "./components/TeamAnalyzer";
import Databases from "./components/Databases";
import DatabaseCategory from "./components/DatabaseCategory";

function App() {
  const { theme } = useTheme();
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      const prevBg = document.body.style.backgroundColor;
      const prevColor = document.body.style.color;
      document.body.style.backgroundColor = theme === "dark" ? "#18181B" : "#f9fafb";
      document.body.style.color = theme === "dark" ? "white" : "black";
      return () => {
        document.documentElement.classList.toggle("dark", false);
        document.body.style.backgroundColor = prevBg || "";
        document.body.style.color = prevColor || "";
      };
    }
  }, [theme]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idsParam = params.get("players");
    if (idsParam) {
      const ids = idsParam.split(",").map((id) => parseInt(id, 10));
      const preselected = players.filter((p) => ids.includes(p.id));
      setSelectedPlayers(preselected.slice(0, 5));
    }
  }, []);

  const togglePlayer = (player) => {
    setSelectedPlayers((prev) => {
      if (prev.some((p) => p.id === player.id)) {
        return prev.filter((p) => p.id !== player.id);
      } else {
        if (prev.length < 5) return [...prev, player];
        return prev;
      }
    });
  };

  const [selectedPlays, setSelectedPlays] = useState([]);

  const togglePlay = (play) => {
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
  };

  return (
    <div style={{ backgroundColor: theme === "dark" ? "#18181B" : "#f9fafb", color: theme === "dark" ? "white" : "black", minHeight: "100vh" }} className="transition-colors duration-300">
      <ScrollToTop />
      <Banner />
      <Navbar />
      <div className="pt-4"></div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/databases" element={<Databases />} />
          <Route path="/databases/players" element={<DatabaseCategory type="players" />} />
          <Route path="/databases/plays" element={<DatabaseCategory type="plays" />} />
          <Route
            path="/players"
            element={
              <MM26Players
                selectedPlayers={selectedPlayers}
                setSelectedPlayers={setSelectedPlayers}
                togglePlayer={togglePlayer}
              />
            }
          />
          <Route
            path="/compare"
            element={
              <MM26Players
                selectedPlayers={selectedPlayers}
                setSelectedPlayers={setSelectedPlayers}
                isComparePage={true}
              />
            }
          />
          <Route
            path="/player/:id"
            element={
              <PlayerProfile
                players={players}
                selectedPlayers={selectedPlayers}
                togglePlayer={togglePlayer}
                setSelectedPlayers={setSelectedPlayers}
              />
            }
          />
          <Route
            path="/plays"
            element={
              <MM26Plays
                selectedPlays={selectedPlays}
                setSelectedPlays={setSelectedPlays}
                togglePlay={togglePlay}
              />
            }
          />
          <Route
            path="/play/:id"
            element={
              <PlayProfile
                plays={plays}
                selectedPlays={selectedPlays}
                togglePlay={togglePlay}
                setSelectedPlays={setSelectedPlays}
              />
            }
          />

          {/* Calendars Pages */}
          <Route path="/calendars" element={<Calendars />} />
          <Route path="/calendars/mm27" element={<MM27 />} />
          <Route path="/calendars/mm26" element={<MM26 />} />
          <Route path="/calendars/mm25" element={<MM25 />} />
          <Route path="/calendars/mm24" element={<MM24 />} />
          <Route path="/calendars/mm23" element={<MM23 />} />
          <Route path="/calendars/mm22" element={<MM22 />} />
          <Route path="/calendars/aug25" element={<Aug25 />} />
          <Route path="/calendars/sept25" element={<Sept25 />} />
          <Route path="/calendars/oct25" element={<Oct25 />} />
          <Route path="/calendars/nov25" element={<Nov25 />} />
          <Route path="/calendars/dec25" element={<Dec25 />} />

          {/* Packs Pages */}
          <Route path="/packs" element={<Packs />} />
          <Route path="/packs/open" element={<PackOpener />} />
          <Route path="/packs/core-rare-player-pack" element={<CoreRarePlayer />} />
          <Route path="/packs/core-epic-player-pack" element={<CoreEpicPlayer />} />
          <Route path="/packs/core-iconic-player-pack" element={<CoreIconicPlayer />} />
          <Route path="/packs/pro-pack" element={<ProPack />} />
          <Route path="/packs/all-pro-pack" element={<AllProPack />} />
          <Route path="/packs/madden-pack" element={<MaddenPack />} />
          <Route path="/packs/basic-trait-pack" element={<BasicTraitPack />} />
          <Route path="/packs/premium-trait-pack" element={<PremiumTraitPack />} />

          {/* Guides Pages */}
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/events" element={<Events />} />
          <Route path="/guides/events/field-pass" element={<FieldPass />} />
          <Route path="/guides/events/promos" element={<Promos />} />
          <Route path="/guides/events/spotlight-pass" element={<SpotlightPass />} />
          <Route path="/guides/events/point-attack" element={<PointAttack />} />
          <Route path="/guides/events/team-of-the-week" element={<TeamofTheWeek />} />
          <Route path="/guides/events/team-diamonds" element={<TeamDiamonds />} />
          <Route path="/guides/events/madden-heroes" element={<MaddenHeroes />} />
          <Route path="/guides/events/promos/opening-drive" element={<OpeningDrive />} />
          <Route path="/guides/events/promos/campus-heroes" element={<CampusHeroes />} />
          <Route path="/guides/events/promos/nfl-kickoff" element={<NFLKickoff />} />
          <Route path="/guides/events/promos/legends" element={<Legends />} />
          <Route path="/guides/events/promos/international" element={<International />} />
          <Route path="/guides/events/promos/most-feared" element={<MostFeared />} />
          <Route path="/guides/events/promos/breakouts" element={<Breakouts />} />
          <Route path="/guides/events/promos/record-breakers" element={<RecordBreakers />} />
          <Route path="/guides/events/promos/feast" element={<Feast />} />
          <Route path="/guides/events/promos/goat" element={<GOAT />} />
          <Route path="/guides/events/promos/ultimate-freeze" element={<UltimateFreeze />} />
          <Route path="/guides/events/promos/what-if" element={<WhatIf />} />
          <Route path="/guides/events/promos/collectors-series" element={<CollectorsSeries />} />
          <Route path="/guides/events/promos/super-bowl" element={<SuperBowl />} />
          <Route path="/guides/events/promos/fan-favorites" element={<FanFavorites />} />
          <Route path="/guides/events/promos/team-of-the-year-i" element={<TeamofTheYearI />} />
          <Route path="/guides/events/promos/team-of-the-year-ii" element={<TeamofTheYearII />} />
          <Route path="/guides/events/promos/sugar-rush" element={<SugarRush />} />
          <Route path="/guides/events/promos/nfl-draft" element={<NFLDraft />} />
          <Route path="/guides/events/promos/collectors-series-ii" element={<CollectorsSeriesII />} />
          <Route path="/guides/competitive" element={<Competitive />} />
          <Route path="/guides/competitive/daily-arena" element={<DailyArena />} />
          <Route path="/guides/competitive/unlimited-arena" element={<UnlimitedArena />} />
          <Route path="/guides/competitive/vs" element={<VS />} />
          <Route path="/guides/leagues" element={<Leagues />} />
          <Route path="/guides/leagues/league-vs-league" element={<LvL />} />
          <Route path="/guides/leagues/siege" element={<Siege />} />
          <Route path="/guides/team-building" element={<TeamBuilding />} />
          <Route path="/guides/team-building/dual-players" element={<DualPlayers />} />
          <Route path="/guides/team-building/evolution" element={<Evolution />} />
          <Route path="/guides/team-building/traits" element={<Traits />} />
          <Route path="/guides/team-building/season-team-training" element={<SeasonTeamTraining />} />
          <Route path="/guides/team-building/playbooks" element={<Playbooks />} />
          <Route path="/guides/team-building/stats" element={<Stats />} />
          <Route path="/guides/acronyms" element={<Acronyms />} />

          <Route path="/news" element={<News />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/home" element={<Home />} />
          <Route path="/theme-teams" element={<ThemeTeams />} />
          <Route path="/team-analyzer" element={<TeamAnalyzer />} />
          <Route path="/theme-teams/:type/:name" element={<ThemeTeamDetail />} />
          <Route path="/theme-teams/multi/:themes" element={<MultiThemeTeamDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
