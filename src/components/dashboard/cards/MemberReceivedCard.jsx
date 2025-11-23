import { useDashboardData } from '../../../context/DashboardDataContext.jsx';

const formatCct = (value) => {
  const numeric = Number.parseFloat(value ?? 0);
  if (Number.isNaN(numeric)) return value ?? '--';
  return `${numeric.toLocaleString(undefined, { maximumFractionDigits: 4 })} CCT`;
};

const MemberReceivedCard = () => {
  const { data, isLoading } = useDashboardData();
  const totals = data.payments.totals;

  return (
    <div className="bg-white/60 dark:bg-[#191932] rounded-[10px] p-[18px] mt-5 border-2 border-[#E5E7EB] dark:border-[#141429]">
      <p className="text-[#0a0a0a] dark:text-[#7D40FF] text-lg font-semibold">Members Earnings</p>

      <div className="my-[10px]">
        <span className="text-[#0a0a0a] dark:text-white text-[34px] font-extrabold">
          {isLoading ? '...' : formatCct(totals.earned)}
        </span>
        <p className="text-[#9A7D0A] dark:text-[#F0B90B] text-lg font-semibold mt-1">Received</p>
      </div>

      <hr className="my-[10px] text-[#E5E7EB] dark:text-[#141429]" />

      <div>
        <span className="text-[#0a0a0a] dark:text-white text-[34px] font-extrabold">
          {isLoading ? '...' : formatCct(totals.missed)}
        </span>
        <p className="text-[#9A7D0A] dark:text-[#F0B90B] text-lg font-semibold mt-1">Missed</p>
      </div>
    </div>
  );
};

export default MemberReceivedCard;
