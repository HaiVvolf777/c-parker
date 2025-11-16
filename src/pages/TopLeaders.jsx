import React, { useState, useEffect } from 'react';
import Navbar from '../components/dashboard/layout/Navbar';
import Sidebar from '../components/dashboard/layout/Sidebar';
import { getLeaderboard } from '../services/apiClient';

const TopLeaders = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getLeaderboard({ limit: 100 });
        setLeaderboard(data || []);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message || 'Failed to load leaderboard');
        setLeaderboard([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const formatNumber = (num) => {
    if (!num || num === '0') return '0';
    return parseFloat(num).toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  const shortenAddress = (address) => {
    if (!address) return 'N/A';
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen py-8 p-5 md:px-10 w-full bg-white dark:bg-[#00000e] transition-colors">
          <div className="mb-6">
            <h1 className="text-[#0a0a0a] dark:text-white text-[28px] md:text-[36px] font-bold">
              Top Leaders
            </h1>
            <p className="text-[#6B7280] dark:text-white/60 text-sm mt-2">
              Top earners leaderboard based on total CCT earned
            </p>
          </div>

          <div className="bg-white/60 dark:bg-[#191932] border-2 border-[#E5E7EB] dark:border-[#141429] rounded-[10px] overflow-hidden">
            {isLoading ? (
              <div className="py-12 text-center">
                <p className="text-[#6B7280] dark:text-white/60">Loading leaderboard...</p>
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <p className="text-red-500">Error: {error}</p>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[#6B7280] dark:text-white/60">No leaderboard data available</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-white/80 dark:bg-[#0B0B1A] border-b border-[#E5E7EB] dark:border-[#141429]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] dark:text-white/60 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] dark:text-white/60 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] dark:text-white/60 uppercase tracking-wider">
                        Wallet Address
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-[#6B7280] dark:text-white/60 uppercase tracking-wider">
                        Total Earned (CCT)
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-[#6B7280] dark:text-white/60 uppercase tracking-wider">
                        Partners
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-[#6B7280] dark:text-white/60 uppercase tracking-wider">
                        Team Size
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#141429]">
                    {leaderboard.map((entry, index) => (
                      <tr
                        key={entry.userId || index}
                        className="hover:bg-gray-50 dark:hover:bg-[#0B0B1A]/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {entry.rank <= 3 ? (
                              <span className="text-[#7D40FF] dark:text-[#01F1E3] font-bold text-lg">
                                #{entry.rank}
                              </span>
                            ) : (
                              <span className="text-[#0a0a0a] dark:text-white font-semibold">
                                #{entry.rank}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-[#0a0a0a] dark:text-white font-medium">
                            #{entry.userId}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-[#6B7280] dark:text-white/60 text-sm font-mono">
                            {shortenAddress(entry.walletAddress)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-[#7D40FF] dark:text-[#01F1E3] font-semibold">
                            {formatNumber(entry.totalEarned)} CCT
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-[#0a0a0a] dark:text-white">
                            {entry.totalPartners || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-[#0a0a0a] dark:text-white">
                            {entry.totalTeamSize || 0}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopLeaders;

