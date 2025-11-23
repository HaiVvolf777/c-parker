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

          <div className="border-2 border-[#E5E7EB] dark:border-[#141429] rounded-[10px] bg-white/60 dark:bg-[#0B0B1A4D] backdrop-blur-[30px] px-[44px] overflow-x-auto">
            <table className="w-full">
              <colgroup>
                <col style={{ width: '100px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '200px' }} />
                <col style={{ width: '200px' }} />
                <col style={{ width: '120px' }} />
                <col style={{ width: '120px' }} />
              </colgroup>
              <thead>
                <tr className="*:pt-[44px] *:pb-[30px] border-b-[1px] border-[#E5E7EB] dark:border-[#141429] *:font-[400] *:text-[18px] *:text-[#6B7280] dark:*:text-[#9aa0a6]">
                  <th className="text-left">Rank</th>
                  <th className="text-left">User ID</th>
                  <th className="text-left">Wallet Address</th>
                  <th className="text-right">Total Earned</th>
                  <th className="text-right">Partners</th>
                  <th className="text-right">Team Size</th>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-[#6B7280] dark:text-[#9aa0a6]">
                      Loading leaderboard...
                    </td>
                  </tr>
                )}

                {!isLoading && error && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                )}

                {!isLoading && !error && leaderboard.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-[#6B7280] dark:text-[#9aa0a6]">
                      No leaderboard data available
                    </td>
                  </tr>
                )}

                {!isLoading && !error && leaderboard.map((entry, index) => (
                  <tr
                    key={entry.userId || index}
                    className="*:py-[30px] border-b-[1px] border-[#E5E7EB] dark:border-[#141429] *:text-[16px] hover:bg-[#F3F4F6] dark:hover:bg-[#0B0B1A] transition-colors"
                  >
                    <td className="text-left">
                      {entry.rank <= 3 ? (
                        <span className="text-[#7D40FF] dark:text-[#01F1E3] font-bold text-lg">
                          #{entry.rank}
                        </span>
                      ) : (
                        <span className="text-[#0a0a0a] dark:text-white font-semibold">
                          #{entry.rank}
                        </span>
                      )}
                    </td>
                    <td className="text-left">
                      <span className="bg-[#F3F4F6] text-[#0a0a0a] dark:bg-[#00000D] dark:text-white px-[35px] py-2 rounded-[40px]">
                        #{entry.userId}
                      </span>
                    </td>
                    <td className="text-left">
                      <span className="text-[#6B7280] dark:text-[#9aa0a6] text-sm font-mono">
                        {shortenAddress(entry.walletAddress)}
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="text-[#7D40FF] dark:text-[#01F1E3] font-semibold">
                        {formatNumber(entry.totalEarned)} CCT
                      </span>
                    </td>
                    <td className="text-right text-[#0a0a0a] dark:text-white">
                      {entry.totalPartners || 0}
                    </td>
                    <td className="text-right text-[#0a0a0a] dark:text-white">
                      {entry.totalTeamSize || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopLeaders;

