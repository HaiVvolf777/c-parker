import ProgramOrbitCard from './ProgramOrbitCard';
import ProgramOrbitComingSoonCard from './ProgramOrbitComingSoonCard';

const CParkerProgramsContainer = () => {
  const programsOrbitData = [
    {
      id: 1,
      title: 'Orbit A',
      cct: '15 CCT',
      opened: true,
      link: '#',
    },
    {
      id: 2,
      title: 'Orbit B',
      cct: '150 CCT',
      opened: true,
      link: '#',
    },
  ];
  return (
    <>
      <div className="mt-5">
        <h2 className="text-gray-800 dark:text-white text-[30px] font-bold mb-5">
          C-Parker Programs
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {programsOrbitData.map((item) => (
            <div key={item.id}>
              <ProgramOrbitCard data={item} />
            </div>
          ))}
        </div>

        <ProgramOrbitComingSoonCard />
      </div>
    </>
  );
};

export default CParkerProgramsContainer;
