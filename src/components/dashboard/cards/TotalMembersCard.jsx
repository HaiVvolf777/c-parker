import { useDashboardData } from '../../../context/DashboardDataContext.jsx';

const formatNumber = (value) => {
  if (value === null || value === undefined) return '--';
  return Number(value).toLocaleString();
};

const TotalMembersCard = () => {
  const { data, isLoading } = useDashboardData();
  const stats = data.platform.stats;

  return (
    <div className="bg-[#7D40FF] rounded-[10px] p-[18px] text-white">
      <p className="keep-white text-lg font-semibold">Members Total</p>
      <div className="flex items-baseline gap-[6px] mt-[10px]">
        <span className="keep-white text-[34px] font-extrabold">
          {isLoading ? '...' : formatNumber(stats?.totalUsers)}
        </span>

        <div className="flex items-center gap-2 text-[#65FFE3]">
          <svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.00004 9.09766L13 17.0977H1L7.00004 9.09766Z" fill="#65FFE3" />
          </svg>
          <span className="text-sm">
            +{isLoading ? '—' : formatNumber(stats?.newUsersToday)} today
          </span>
        </div>
      </div>
      <p className="text-sm text-white/80 mt-2">
        Orbit A: {isLoading ? '...' : formatNumber(stats?.totalUsersOrbitA)} · Orbit B:{' '}
        {isLoading ? '...' : formatNumber(stats?.totalUsersOrbitB)}
      </p>
    </div>
  );
};

export default TotalMembersCard;
