import React from "react";
import { Routes, Route } from "react-router-dom";
import PlayerGrid from "./components/PlayerGrid";
import PlayerProfile from "./PlayerProfile";

export default function AppRoutes({ players, selectedPlayers, togglePlayer }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PlayerGrid
            players={players}
            selectedPlayers={selectedPlayers}
            togglePlayer={togglePlayer}
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
          />
        }
      />
    </Routes>
  );
}
