import { useMemo } from 'react';
import { useDashboardData } from '../../../context/DashboardDataContext.jsx';

const formatDate = (value) => {
  if (!value) return '--';
  try {
    return new Date(value).toLocaleDateString();
  } catch (_) {
    return value;
  }
};

const List = ({ title, rows, emptyMessage }) => (
  <div className="bg-white/60 dark:bg-[#191932] rounded-[10px] border-2 border-[#E5E7EB] dark:border-[#141429] p-4">
    <div className="flex items-center justify-between mb-3">
      <p className="font-semibold text-[#0a0a0a] dark:text-white">{title}</p>
      <span className="text-xs text-[#6B7280] dark:text-[#9aa0a6]">{rows.length} entries</span>
    </div>

    {rows.length === 0 ? (
      <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">{emptyMessage}</p>
    ) : (
      <div className="space-y-3">
        {rows.map((entry) => (
          <div key={entry.userId} className="flex items-center justify-between text-sm">
            <div>
              <p className="text-[#0a0a0a] dark:text-white font-semibold">ID {entry.userId}</p>
              <p className="text-xs text-[#6B7280] dark:text-[#9aa0a6]">{entry.walletAddress.slice(0, 12)}...</p>
            </div>
            <div className="text-right">
              {entry.level && <p className="text-xs text-[#7D40FF]">Depth {entry.level}</p>}
              <p className="text-xs text-[#6B7280] dark:text-[#9aa0a6]">{formatDate(entry.registeredAt)}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const NetworkOverview = () => {
  const { data } = useDashboardData();
  const referralPreview = useMemo(() => data.referrals.slice(0, 5), [data.referrals]);
  const teamPreview = useMemo(() => data.team.slice(0, 5), [data.team]);

  return (
    <div className="bg-white dark:bg-[#0B0B1A4D] border-2 border-[#E5E7EB] dark:border-[#141429] rounded-[10px] p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h3 className="text-2xl font-bold text-[#0a0a0a] dark:text-white">Network Overview</h3>
        <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">
          Direct partners plus recursive team data streamed from the NestJS users module.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-[#0a0a0a] dark:text-white">
          <span>Total partners: {data.stats?.totalPartners ?? '--'}</span>
          <span>Total team: {data.stats?.totalTeamSize ?? '--'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <List title="Direct referrals" rows={referralPreview} emptyMessage="No referrals yet." />
        <List title="Team downlines" rows={teamPreview} emptyMessage="No team members yet." />
      </div>
    </div>
  );
};

export default NetworkOverview;

