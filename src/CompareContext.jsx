import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (player) => {
    if (compareList.length >= 5) return;
    if (!compareList.some((p) => p.id === player.id)) {
      setCompareList([...compareList, player]);
    }
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter((p) => p.id !== id));
  };

  const clearCompare = () => setCompareList([]);

  const getShareableURL = () => {
    const ids = compareList.map((p) => p.id).join(",");
    const url = `${window.location.origin}/?players=${ids}`;
    return url;
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        getShareableURL,
        setCompareList,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);


