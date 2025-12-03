import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useUserData } from './UserDataContext';
import { getUserLevels } from '../services/apiClient';

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
  purchaseAccess: () => { },
  unlockNextLevel: (_flow) => { },
  resetProgress: () => { },
});

export const ProgressProvider = ({ children }) => {
  const { user } = useUserData();
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

  // Fetch user levels from backend
  useEffect(() => {
    const fetchLevels = async () => {
      if (!user?.userId) return;

      try {
        // Fetch both orbits in parallel
        const [orbitAData, orbitBData] = await Promise.all([
          getUserLevels(user.userId, { orbit: 'ORBIT_A' }),
          getUserLevels(user.userId, { orbit: 'ORBIT_B' })
        ]);

        // console.log('Fetched Orbit A levels:', orbitAData);
        // console.log('Fetched Orbit B levels:', orbitBData);

        // Helper to calculate max active level from array
        const getMaxLevel = (data) => {
          if (!Array.isArray(data)) return 0;
          return data
            .filter(l => l.isActive)
            .reduce((max, l) => Math.max(max, l.levelNumber || 0), 0);
        };

        const maxOrbitA = getMaxLevel(orbitAData);
        const maxOrbitB = getMaxLevel(orbitBData);

        // console.log('Calculated Max Levels:', { maxOrbitA, maxOrbitB });

        setState(prev => ({
          ...prev,
          purchased: true,
          unlockedLevels: {
            ...prev.unlockedLevels,
            orbitA: maxOrbitA || prev.unlockedLevels.orbitA,
            orbitB: maxOrbitB || prev.unlockedLevels.orbitB,
          }
        }));

      } catch (error) {
        console.error('Failed to fetch user levels:', error);
      }
    };

    fetchLevels();
  }, [user?.userId]);

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


