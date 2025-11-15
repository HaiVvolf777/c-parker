import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useUserData } from './UserDataContext.jsx';
import {
  getActivityFeed,
  getLeaderboard,
  getPaymentsByLevel,
  getPlatformStats,
  getRecentUsers,
  getUserById,
  getUserEarnedPayments,
  getUserLevels,
  getUserMatrix,
  getUserPayments,
  getUserReferrals,
  getUserMissedPayments,
  getUserStats,
  getUserTeam,
  getUserTotalEarned,
  getUserTotalMissed,
} from '../services/apiClient.js';

const INITIAL_STATE = {
  userDetails: null,
  stats: null,
  referrals: [],
  team: [],
  levels: [],
  payments: {
    all: [],
    received: [],
    missed: [],
    byLevel: [],
    totals: {
      earned: '0',
      missed: '0',
    },
  },
  platform: {
    stats: null,
    leaderboard: [],
    recentUsers: [],
  },
  activityFeed: [],
  matrix: {},
};

const DashboardDataContext = createContext({
  data: INITIAL_STATE,
  isLoading: false,
  error: null,
  refresh: () => Promise.resolve(),
  fetchMatrix: () => Promise.resolve([]),
  isMatrixLoading: false,
});

const normalizeError = (err) => {
  if (err instanceof Error) return err;
  return new Error(typeof err === 'string' ? err : 'Unknown dashboard error');
};

export const DashboardDataProvider = ({ children }) => {
  const { user } = useUserData();
  const userId = user?.userId;

  const [state, setState] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matrixLoadingKey, setMatrixLoadingKey] = useState(null);
  const matrixCacheRef = useRef(new Map());

  const resetState = useCallback(() => {
    setState(INITIAL_STATE);
    setError(null);
    matrixCacheRef.current.clear();
  }, []);

  const fetchDashboardData = useCallback(async () => {
    if (!userId) {
      resetState();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [
        userDetails,
        stats,
        referrals,
        team,
        levels,
        payments,
        received,
        missed,
        byLevel,
        totalEarned,
        totalMissed,
        platformStats,
        leaderboard,
        recentUsers,
        activityFeed,
      ] = await Promise.all([
        getUserById(userId),
        getUserStats(userId),
        getUserReferrals(userId),
        getUserTeam(userId),
        getUserLevels(userId),
        getUserPayments(userId, { limit: 25, offset: 0 }),
        getUserEarnedPayments(userId, { limit: 25, offset: 0 }),
        getUserMissedPayments(userId, { limit: 25, offset: 0 }),
        getPaymentsByLevel(userId),
        getUserTotalEarned(userId),
        getUserTotalMissed(userId),
        getPlatformStats(),
        getLeaderboard({ limit: 10 }),
        getRecentUsers({ hours: 48 }),
        getActivityFeed({ limit: 15 }),
      ]);

      setState({
        userDetails,
        stats,
        referrals,
        team,
        levels,
        payments: {
          all: payments,
          received,
          missed,
          byLevel,
          totals: {
            earned: totalEarned?.total ?? '0',
            missed: totalMissed?.total ?? '0',
          },
        },
        platform: {
          stats: platformStats,
          leaderboard,
          recentUsers,
        },
        activityFeed,
        matrix: { ...matrixCacheRef.current },
      });
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setIsLoading(false);
    }
  }, [resetState, userId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const fetchMatrix = useCallback(
    async ({ orbit = 'ORBIT_A', level = 1 } = {}) => {
      if (!userId) {
        throw new Error('Wallet not connected');
      }

      const key = `${orbit}:${level}`;

      if (matrixCacheRef.current.has(key)) {
        return matrixCacheRef.current.get(key);
      }

      setMatrixLoadingKey(key);

      try {
        const rows = await getUserMatrix(userId, orbit, level);
        matrixCacheRef.current.set(key, rows);
        setState((prev) => ({
          ...prev,
          matrix: {
            ...prev.matrix,
            [key]: rows,
          },
        }));
        return rows;
      } catch (err) {
        setError(normalizeError(err));
        throw err;
      } finally {
        setMatrixLoadingKey((current) => (current === key ? null : current));
      }
    },
    [userId],
  );

  const value = useMemo(
    () => ({
      data: state,
      isLoading,
      error,
      refresh: fetchDashboardData,
      fetchMatrix,
      isMatrixLoading: Boolean(matrixLoadingKey),
    }),
    [state, isLoading, error, fetchDashboardData, fetchMatrix, matrixLoadingKey],
  );

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
};

export const useDashboardData = () => useContext(DashboardDataContext);

