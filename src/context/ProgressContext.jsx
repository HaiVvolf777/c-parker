import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'cparker_progress_v1';

const defaultState = {
  purchased: false,
  unlockedLevels: {
    nodeA: 0,
    nodeB: 0,
    orbitA: 0,
    orbitB: 0,
  },
};

const ProgressContext = createContext({
  purchased: false,
  unlockedLevels: defaultState.unlockedLevels,
  purchaseAccess: () => {},
  unlockNextLevel: (_flow) => {},
  resetProgress: () => {},
});

export const ProgressProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore persistence errors
    }
  }, [state]);

  // Reset progress when wallet is disconnected
  useEffect(() => {
    const handleWalletDisconnect = () => {
      setState(defaultState);
    };
    
    window.addEventListener('wallet-disconnected', handleWalletDisconnect);
    return () => window.removeEventListener('wallet-disconnected', handleWalletDisconnect);
  }, []);

  const purchaseAccess = () => {
    setState((prev) => ({
      ...prev,
      purchased: true,
      // unlock level 1 across all flows on initial purchase
      unlockedLevels: {
        nodeA: Math.max(prev.unlockedLevels.nodeA, 1),
        nodeB: Math.max(prev.unlockedLevels.nodeB, 1),
        orbitA: Math.max(prev.unlockedLevels.orbitA, 1),
        orbitB: Math.max(prev.unlockedLevels.orbitB, 1),
      },
    }));
  };

  const unlockNextLevel = (flowKey) => {
    setState((prev) => {
      const curr = prev.unlockedLevels[flowKey] ?? 0;
      const next = Math.min(curr + 1, 12);
      return {
        ...prev,
        unlockedLevels: { ...prev.unlockedLevels, [flowKey]: next },
      };
    });
  };

  const resetProgress = () => setState(defaultState);

  const value = useMemo(() => ({
    purchased: state.purchased,
    unlockedLevels: state.unlockedLevels,
    purchaseAccess,
    unlockNextLevel,
    resetProgress,
  }), [state]);

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);


