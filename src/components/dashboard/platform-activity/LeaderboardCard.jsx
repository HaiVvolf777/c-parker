import { useDashboardData } from '../../../context/DashboardDataContext.jsx';

const LeaderboardCard = () => {
  const { data, isLoading } = useDashboardData();
  const leaders = data.platform.leaderboard.slice(0, 3);

  return (
    <div className="bg-white/60 dark:bg-[#191932] rounded-[10px] p-[18px] border-2 border-[#E5E7EB] dark:border-[#141429]">
      <p className="text-[#0a0a0a] dark:text-white text-lg font-semibold">Top Earners</p>
      <div className="mt-4 space-y-3">
        {isLoading && <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">Loading leaderboard...</p>}

        {!isLoading && leaders.length === 0 && (
          <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">No leaderboard data yet.</p>
        )}

        {leaders.map((entry) => (
          <div key={entry.userId} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">#{entry.rank}</p>
              <p className="text-[#0a0a0a] dark:text-white font-semibold">ID {entry.userId}</p>
              <p className="text-xs text-[#6B7280] dark:text-[#9aa0a6]">{entry.walletAddress.slice(0, 8)}...</p>
            </div>
            <div className="text-right">
              <p className="text-[#7D40FF] dark:text-[#01F1E3] font-semibold">{entry.totalEarned} CCT</p>
              <p className="text-xs text-[#6B7280] dark:text-[#9aa0a6]">
                Team {entry.totalTeamSize} • Partners {entry.totalPartners}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardCard;

