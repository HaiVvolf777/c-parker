import { useEffect, useMemo, useState } from 'react';
import { useDashboardData } from '../../../context/DashboardDataContext.jsx';

const MatrixExplorer = () => {
  const { data, fetchMatrix, isMatrixLoading } = useDashboardData();
  const [orbit, setOrbit] = useState('ORBIT_A');
  const [level, setLevel] = useState(1);
  const [rows, setRows] = useState([]);

  const levelsForOrbit = useMemo(
    () =>
      data.levels
        .filter((entry) => entry.orbit === orbit && entry.isActive)
        .map((entry) => entry.levelNumber)
        .sort((a, b) => a - b),
    [data.levels, orbit],
  );

  useEffect(() => {
    if (levelsForOrbit.length > 0) {
      setLevel((current) => (levelsForOrbit.includes(current) ? current : levelsForOrbit[0]));
    }
  }, [levelsForOrbit]);

  useEffect(() => {
    let mounted = true;
    if (levelsForOrbit.length === 0) {
      setRows([]);
      return () => {
        mounted = false;
      };
    }

    fetchMatrix({ orbit, level })
      .then((result) => {
        if (mounted) {
          setRows(result ?? []);
        }
      })
      .catch(() => {
        if (mounted) setRows([]);
      });

    return () => {
      mounted = false;
    };
  }, [fetchMatrix, orbit, level, levelsForOrbit.length]);

  return (
    <div className="bg-white dark:bg-[#0B0B1A4D] border-2 border-[#E5E7EB] dark:border-[#141429] rounded-[10px] p-6">
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="text-2xl font-bold text-[#0a0a0a] dark:text-white">Matrix Explorer</h3>
        <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">
          Pulls `/users/:id/matrix/:orbit/:level` live from the backend.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <label className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">
          Orbit
          <select
            className="ml-2 rounded-md border border-[#E5E7EB] dark:border-[#141429] bg-transparent px-2 py-1 text-[#0a0a0a] dark:text-white"
            value={orbit}
            onChange={(event) => setOrbit(event.target.value)}
          >
            <option value="ORBIT_A">Orbit A</option>
            <option value="ORBIT_B">Orbit B</option>
          </select>
        </label>

        <label className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">
          Level
          <select
            className="ml-2 rounded-md border border-[#E5E7EB] dark:border-[#141429] bg-transparent px-2 py-1 text-[#0a0a0a] dark:text-white"
            value={level}
            onChange={(event) => setLevel(Number(event.target.value))}
            disabled={levelsForOrbit.length === 0}
          >
            {levelsForOrbit.length === 0 ? (
              <option>-</option>
            ) : (
              levelsForOrbit.map((lvl) => (
                <option key={lvl} value={lvl}>
                  L{lvl}
                </option>
              ))
            )}
          </select>
        </label>
      </div>

      {levelsForOrbit.length === 0 ? (
        <p className="text-sm text-[#6B7280] dark:text-[#9aa0a6]">
          Activate a level in {orbit.replace('_', ' ')} to view matrix positions.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-[#0a0a0a] dark:text-white">
            <thead className="text-[#6B7280] dark:text-[#9aa0a6]">
              <tr>
                <th>User ID</th>
                <th>Wallet</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {isMatrixLoading && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-[#6B7280] dark:text-[#9aa0a6]">
                    Loading matrix placements...
                  </td>
                </tr>
              )}
              {!isMatrixLoading && rows.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-[#6B7280] dark:text-[#9aa0a6]">
                    No downlines yet for this level.
                  </td>
                </tr>
              )}
              {!isMatrixLoading &&
                rows.map((row) => (
                  <tr key={`${row.downline_user_id}-${row.position_num}`}>
                    <td>{row.downline_user_id}</td>
                    <td>{row.wallet_address?.slice(0, 12)}...</td>
                    <td>{row.position_num}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MatrixExplorer;

