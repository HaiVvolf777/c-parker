import { useDashboardData } from '../../../context/DashboardDataContext.jsx';

const formatValue = (value) => {
  if (value === null || value === undefined) return '--';
  const numeric = Number.parseFloat(value);
  if (Number.isNaN(numeric)) return value;
  return numeric.toLocaleString(undefined, { maximumFractionDigits: 4 });
};

const TransactionMadeCard = () => {
  const { data, isLoading } = useDashboardData();
  const stats = data.platform.stats;

  return (
    <div className="bg-white/60 dark:bg-[#191932] rounded-[10px] p-[18px] mt-5 border-2 border-[#E5E7EB] dark:border-[#141429]">
      <div>
        <p className="text-[#0a0a0a] dark:text-white text-lg">Transactions Made</p>

        <div className="flex items-baseline gap-[6px] mt-[10px]">
          <span className="text-[#0a0a0a] dark:text-white text-[34px] font-extrabold">
            {isLoading ? '...' : formatValue(stats?.totalTransactions)}
          </span>

          <div className="flex items-center gap-2 text-[#65FFE3]">
            <svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.00004 9.09766L13 17.0977H1L7.00004 9.09766Z" fill="#65FFE3" />
            </svg>
            <span className="text-sm">last 24h</span>
          </div>
        </div>
      </div>

      <hr className="text-[#E5E7EB] dark:text-[#141429] my-[10px]" />

      <div>
        <p className="text-[#0a0a0a] dark:text-white text-lg">Turnover (CCT)</p>

        <div className="flex items-baseline gap-[6px] mt-[10px]">
          <span className="text-[#0a0a0a] dark:text-white text-[34px] font-extrabold">
            {isLoading ? '...' : `${formatValue(stats?.totalTurnover)} CCT`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionMadeCard;
