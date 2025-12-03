import { useNavigate } from 'react-router-dom';

const ProgramOrbitCard = ({ data }) => {
  const navigate = useNavigate();

  // Right-side decorative graphic based on orbit type
  const getRightGraphic = () => {
    if (data.title === 'Orbit A') return '/images/orbita-bg.png';
    if (data.title === 'Orbit B') return '/images/orbitb-bg.png';
    return '/images/orbitc-bg.png';
  };

  const handleButtonClick = () => {
    if (data.title === 'Orbit A') {
      navigate('/dashboard/orbit-level-progression');
    } else if (data.title === 'Orbit B') {
      navigate('/dashboard/orbit-b-level-progression');
    }
  };

  return (
    <>
      <div
        className="border-2 border-[#E5E7EB] dark:border-[#141429] px-7 py-3 rounded-[10px] relative overflow-hidden bg-gradient-to-br from-[#15123a] via-[#1b0f3f] to-[#2b155d]"
      >

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="flex flex-col gap-[50px]">
            <p className="text-white keep-white text-[28px] font-bold">{data.title}</p>

            <p className="text-[#01F1E3] text-[42px] font-extrabold min-h-[40px]">
              {data.isLoading ? 'Syncing levels...' : data.cct}
            </p>



            <div className="">
              <button
                onClick={handleButtonClick}
                className="text-white text-[16px] keep-white font-bold bg-[#3A126F] dark:bg-[#7D40FF] hover:bg-[#5a1fb8] px-[67px] py-3 leading-[100%] rounded-[10px] cursor-pointer transition-colors"
              >
                {data.opened ? 'Preview' : 'Preview'}
              </button>
            </div>
          </div>
          {/* decorative right graphic (foreground on the right) */}
          <div className="relative h-[220px] md:h-[260px] lg:h-[300px]">
            <img
              src={getRightGraphic()}
              alt="Orbit graphic"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-[280px] md:w-[340px] lg:w-[420px] max-w-none pointer-events-none select-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramOrbitCard;
