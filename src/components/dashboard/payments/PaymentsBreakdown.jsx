import { useMemo } from 'react';
import { useDashboardData } from '../../../context/DashboardDataContext.jsx';

const formatCct = (value) => {
  const numeric = Number.parseFloat(value ?? 0);
  if (Number.isNaN(numeric)) return value ?? '--';
  return `${numeric.toLocaleString(undefined, { maximumFractionDigits: 4 })} CCT`;
};

const TableShell = ({ title, rows, emptyMessage }) => (
  <div className="bg-white/60 dark:bg-[#191932] rounded-[10px] border-2 border-[#E5E7EB] dark:border-[#141429] p-4">
    <div className="flex items-center justify-between mb-3">
      <p className="font-semibold text-[#0a0a0a] dark:text-white">{title}</p>
      <span className="text-xs text-[#6B7280] dark:text-[#9aa0a6]">latest 25</span>
    </div>

    {rows.length === 0 ? (
      <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">{emptyMessage}</p>
    ) : (
      <div className="space-y-2">
        {rows.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between text-sm text-[#0a0a0a] dark:text-white"
          >
            <div>
              <p className="font-semibold">L{payment.levelNumber} · {payment.orbit.replace('_', ' ')}</p>
              <p className="text-xs text-[#6B7280] dark:text-[#9aa0a6]">
                {new Date(payment.blockTimestamp).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className={payment.status === 'MISSED' ? 'text-red-500' : 'text-emerald-500'}>
                {formatCct(payment.amount)}
              </p>
              <p className="text-xs text-[#6B7280] dark:text-[#9aa0a6]">{payment.paymentType}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const PaymentsBreakdown = () => {
  const { data, isLoading } = useDashboardData();
  const levelRows = useMemo(
    () =>
      data.payments.byLevel.map((entry) => ({
        id: `${entry.orbit}-${entry.levelNumber}`,
        orbit: entry.orbit,
        levelNumber: entry.levelNumber,
        earned: formatCct(entry.earned),
        missed: formatCct(entry.missed),
        recycleCount: entry.recycleCount,
        paymentCount: entry.paymentCount,
        missedCount: entry.missedCount,
      })),
    [data.payments.byLevel],
  );

  return (
    <div className="bg-white dark:bg-[#0B0B1A4D] border-2 border-[#E5E7EB] dark:border-[#141429] rounded-[10px] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-[#0a0a0a] dark:text-white">Payments Overview</h3>
          <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">
            Aggregated from on-chain events and streaming listener.
          </p>
        </div>
        <div className="flex gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#6B7280] dark:text-[#9aa0a6]">Total earned</p>
            <p className="text-xl font-semibold text-emerald-500">
              {isLoading ? '...' : formatCct(data.payments.totals.earned)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#6B7280] dark:text-[#9aa0a6]">Total missed</p>
            <p className="text-xl font-semibold text-red-500">
              {isLoading ? '...' : formatCct(data.payments.totals.missed)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <TableShell
          title="Received payments"
          rows={data.payments.received.slice(0, 6)}
          emptyMessage="No received payments yet."
        />
        <TableShell
          title="Missed payments"
          rows={data.payments.missed.slice(0, 6)}
          emptyMessage="No missed payments — keep levels active!"
        />
        <div className="bg-white/70 dark:bg-[#191932] rounded-[10px] border-2 border-[#E5E7EB] dark:border-[#141429] p-4 overflow-x-auto">
          <p className="font-semibold text-[#0a0a0a] dark:text-white mb-3">By level</p>
          {levelRows.length === 0 ? (
            <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">No earnings by level yet.</p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-[#6B7280] dark:text-[#9aa0a6]">
                <tr>
                  <th>Orbit</th>
                  <th>Level</th>
                  <th>Earned</th>
                  <th>Missed</th>
                </tr>
              </thead>
              <tbody className="text-[#0a0a0a] dark:text-white">
                {levelRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.orbit.replace('_', ' ')}</td>
                    <td>{row.levelNumber}</td>
                    <td>{row.earned}</td>
                    <td>{row.missed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsBreakdown;

