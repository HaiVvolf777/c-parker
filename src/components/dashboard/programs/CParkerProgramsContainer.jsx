import ProgramOrbitCard from './ProgramOrbitCard';
import ProgramOrbitComingSoonCard from './ProgramOrbitComingSoonCard';
import { useDashboardData } from '../../../context/DashboardDataContext.jsx';

const summarizeOrbit = (levels, paymentsByLevel, orbit) => {
  const filtered = levels.filter((level) => level.orbit === orbit);

  // Calculate total earnings for this orbit
  const totalEarnings = (paymentsByLevel || [])
    .filter(p => p.orbit === orbit)
    .reduce((sum, p) => sum + (parseFloat(p.earned) || 0), 0);

  const formattedEarnings = `${totalEarnings.toLocaleString(undefined, { maximumFractionDigits: 2 })} CCT`;

  if (filtered.length === 0) {
    return {
      title: orbit === 'ORBIT_A' ? 'Orbit A' : 'Orbit B',
      cct: formattedEarnings,
      subText: 'No levels active yet',
      opened: false,
      levelsActive: 0,
    };
  }

  const activeLevels = filtered.filter((level) => level.isActive);
  const highestLevel = Math.max(...activeLevels.map((level) => level.levelNumber));

  return {
    title: orbit === 'ORBIT_A' ? 'Orbit A' : 'Orbit B',
    cct: formattedEarnings,
    subText: `${activeLevels.length} active levels • Highest L${highestLevel}`,
    opened: true,
    levelsActive: activeLevels.length,
  };
};

const CParkerProgramsContainer = () => {
  const { data, isLoading } = useDashboardData();
  const programsOrbitData = [
    summarizeOrbit(data.levels, data.payments.byLevel, 'ORBIT_A'),
    summarizeOrbit(data.levels, data.payments.byLevel, 'ORBIT_B'),
  ];

  return (
    <div className="mt-5">
      <h2 className="text-gray-800 dark:text-white text-[30px] font-bold mb-5">C-Parker Programs</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {programsOrbitData.map((item) => (
          <div key={item.title}>
            <ProgramOrbitCard data={{ ...item, isLoading }} />
          </div>
        ))}
      </div>

      <ProgramOrbitComingSoonCard />
    </div>
  );
};

export default CParkerProgramsContainer;
