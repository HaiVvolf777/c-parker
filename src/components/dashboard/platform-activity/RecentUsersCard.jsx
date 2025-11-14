import { useDashboardData } from '../../../context/DashboardDataContext.jsx';

const formatHours = (hoursAgo) => {
  if (hoursAgo === null || hoursAgo === undefined) return '--';
  if (hoursAgo < 1) return '<1h ago';
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  return `${Math.floor(hoursAgo / 24)}d ago`;
};

const RecentUsersCard = () => {
  const { data, isLoading } = useDashboardData();
  const recent = data.platform.recentUsers.slice(0, 4);

  return (
    <div className="bg-white/60 dark:bg-[#191932] rounded-[10px] p-[18px] border-2 border-[#E5E7EB] dark:border-[#141429]">
      <p className="text-[#0a0a0a] dark:text-white text-lg font-semibold">Recent Signups</p>
      <div className="mt-4 space-y-3">
        {isLoading && <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">Pulling new registrations...</p>}

        {!isLoading && recent.length === 0 && (
          <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">No registrations in the last 48h.</p>
        )}

        {recent.map((user) => (
          <div key={user.userId} className="flex items-center justify-between">
            <div>
              <p className="text-[#0a0a0a] dark:text-white font-semibold">ID {user.userId}</p>
              <p className="text-xs text-[#6B7280] dark:text-[#9aa0a6]">{user.walletAddress.slice(0, 10)}...</p>
            </div>
            <p className="text-sm text-[#7D40FF] dark:text-[#01F1E3] font-semibold">
              {formatHours(user.hoursAgo)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsersCard;

