import React, { useEffect, useState } from 'react';
import { useProgress } from '../../../context/ProgressContext.jsx'
// import cctIcon from '../../../../public/icons/CCTIcon.svg'

const SliderLevelNode = ({ className, stage = 0, flowKey = 'nodeA', cycleData, showLocked = false, level = 1, userId }) => {
  const [prevStage, setPrevStage] = useState(stage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { purchased, unlockedLevels } = useProgress();
  const isLocked = showLocked ? false : (!purchased || (unlockedLevels?.[flowKey] ?? 0) < 1);

  const getPos = (posIndex) => {
    if (!cycleData || !cycleData.positions) return null;
    return cycleData.positions.find(p => p.position === posIndex || p.positionIndex === posIndex);
  };

  console.log('SliderLevelNode - isLocked:', isLocked);
  console.log('SliderLevelNode - cycleData:', cycleData);
  console.log('SliderLevelNode - getPos(1):', getPos(1));
  console.log('SliderLevelNode - getPos(2):', getPos(2));
  console.log('SliderLevelNode - getPos(3):', getPos(3));
  console.log('SliderLevelNode - getPos(4):', getPos(4));

  useEffect(() => {
    if (stage !== prevStage) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevStage(stage);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [stage, prevStage]);

  return (
    <div className={`${className} relative`}>
      <svg
        className="w-full h-auto max-w-full lg:max-w-none transition-all duration-300"
        viewBox="0 0 405 244"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid meet"
        style={{
          transform: isTransitioning ? 'scale(1.02)' : 'scale(1)',
          filter: isTransitioning ? 'brightness(1.1)' : 'brightness(1)'
        }}
      >
        {/* Certral Box Level  */}
        <>


          <rect
            y="55"
            width="201"
            height="138"
            rx="10"
            fill={isLocked ? '#1f1536' : 'url(#paint0_linear_423_69)'}
          />
          {/* Level Number */}
          <text
            x="100.5"
            y="91"
            fill={isLocked ? '#9CA3AF' : 'white'}
            fontSize="24"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Lvl {level}
          </text>
          {/* ID */}
          <text
            x="100.5"
            y="116"
            fill={isLocked ? '#9CA3AF' : 'white'}
            fontSize="14"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ID {userId || ''}
          </text>
          {/* CCT Icon */}
          <image
            x="80"
            y="130"
            width="42"
            height="42"
            xlinkHref="/icons/CCT.svg"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Earning - Large CCT Amount */}
          {/* <text
            x="100.5"
            y="165"
            fill={isLocked ? '#9CA3AF' : 'white'}
            fontSize="48"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {cycleData?.totalEarnings || 0}
          </text> */}
        </>

        {/* Node 1  */}
        <>
          {/* Node Line 1 */}
          <path
            d="M307 34.25C239.943 34.25 267.826 111.25 201 111.25"
            stroke={isLocked ? '#9CA3AF' : (getPos(1) ? 'url(#paint2_linear_423_69)' : '#9CA3AF')}
            strokeOpacity="0.7"
            strokeWidth="11.11"
            style={{
              transition: 'stroke 0.3s ease-in-out, stroke-opacity 0.3s ease-in-out',
              strokeDasharray: isTransitioning ? '5,5' : 'none',
              animation: isTransitioning ? 'pulse-glow 0.3s ease-in-out' : 'none'
            }}
          />

          {/* ID 1  */}
          <rect
            x="302"
            width="103"
            height="52"
            rx="10"
            fill={isLocked ? '#322661' : (getPos(1) ? 'url(#paint5_linear_423_69)' : '#322661')}
            style={{
              transition: 'fill 0.3s ease-in-out, transform 0.3s ease-in-out',
              transform: getPos(1) && isTransitioning ? 'scale(1.05)' : 'scale(1)',
              filter: getPos(1) && isTransitioning ? 'drop-shadow(0 0 8px rgba(125, 64, 255, 0.5))' : 'none'
            }}
          />
          {!isLocked && getPos(1) && (
            <text
              x="332"
              y="34"
              fill="#FFFFFF"
              fontSize="14"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              stroke="#000000"
              strokeOpacity="0.35"
              strokeWidth="1"
              style={{
                paintOrder: 'stroke',
                animation: isTransitioning ? 'fade-in-scale 0.3s ease-in-out' : 'none',
                opacity: isTransitioning ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out'
              }}
              pointerEvents="none"
            >
              ID {getPos(1).userId}
            </text>
          )}
          {!isLocked && !getPos(1) && (
            <image x="339" y="12" width="29" height="28" xlinkHref="/svgs/man.svg" preserveAspectRatio="xMidYMid meet" />
          )}
        </>

        {/* Node 2  */}
        <>
          {/* Node line 2 */}
          <path
            d="M307 85.25C239.943 85.25 267.826 117.25 201 117.25"
            stroke={isLocked ? '#9CA3AF' : (getPos(2) ? 'url(#paint1_linear_423_69)' : '#9CA3AF')}
            strokeOpacity="0.7"
            strokeWidth="11.11"
          />

          {/* ID 2 */}
          <rect x="302" y="64" width="103" height="52" rx="10" fill={isLocked ? '#322661' : (getPos(2) ? 'url(#paint5_linear_423_69)' : '#322661')} />
          {!isLocked && getPos(2) && (
            <text x="332" y="98" fill="#FFFFFF" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="700" stroke="#000000" strokeOpacity="0.35" strokeWidth="1" style={{ paintOrder: 'stroke' }} pointerEvents="none">
              ID {getPos(2).userId}
            </text>
          )}
          {!isLocked && !getPos(2) && (
            <image x="339" y="76" width="29" height="28" xlinkHref="/svgs/man.svg" preserveAspectRatio="xMidYMid meet" />)}
        </>

        {/* Node 3  */}
        <>
          {/* Node Line 3 */}
          <path
            d="M201 129.25C272.102 129.25 234.814 163.25 308 163.25"
            stroke={isLocked ? '#9CA3AF' : (getPos(3) ? 'url(#paint4_linear_423_69)' : '#9CA3AF')}
            strokeOpacity="0.7"
            strokeWidth="11.11"
          />

          {/* ID 3 */}
          <rect x="302" y="128" width="103" height="52" rx="10" fill={isLocked ? '#322661' : (getPos(3) ? 'url(#paint5_linear_423_69)' : '#322661')} />
          {!isLocked && getPos(3) && (
            <text x="332" y="162" fill="#FFFFFF" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="700" stroke="#000000" strokeOpacity="0.35" strokeWidth="1" style={{ paintOrder: 'stroke' }} pointerEvents="none">
              ID {getPos(3).userId}
            </text>
          )}
          {!isLocked && !getPos(3) && (
            <image x="339" y="140" width="29" height="28" xlinkHref="/svgs/man.svg" preserveAspectRatio="xMidYMid meet" />)}
        </>

        {/* Node 4  */}
        <>
          {/* Node Line 4 */}
          <path
            d="M307 212.25C239.943 212.25 267.826 136.25 201 136.25"
            stroke={isLocked ? '#9CA3AF' : (getPos(4) ? 'url(#paint3_linear_423_69)' : '#9CA3AF')}
            strokeOpacity="0.7"
            strokeWidth="11.11"
          />

          {/* ID 4  */}
          <rect x="302" y="192" width="103" height="52" rx="10" fill={isLocked ? '#322661' : (getPos(4) ? 'url(#paint5_linear_423_69)' : '#322661')} />
          {!isLocked && getPos(4) && (
            <text x="332" y="226" fill="#FFFFFF" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="700" stroke="#000000" strokeOpacity="0.35" strokeWidth="1" style={{ paintOrder: 'stroke' }} pointerEvents="none">
              ID {getPos(4).userId}
            </text>
          )}
          {!isLocked && !getPos(4) && (
            <image x="339" y="204" width="29" height="28" xlinkHref="/svgs/man.svg" preserveAspectRatio="xMidYMid meet" />)}
        </>

        <defs>
          <pattern
            id="pattern0_423_69"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            {/* <use xlink:href="#image0_423_69" transform="scale(0.000976562)" /> */}
          </pattern>
          <linearGradient
            id="paint0_linear_423_69"
            x1="0"
            y1="55"
            x2="211.002"
            y2="175.483"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7D40FF" />
            <stop offset="1" stop-color="#4B158E" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_423_69"
            x1="285.523"
            y1="75.1125"
            x2="261.282"
            y2="145.277"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#36B7F4" />
            <stop offset="1" stop-color="#7D40FF" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_423_69"
            x1="285.523"
            y1="48.4437"
            x2="260.591"
            y2="119.479"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#36B7F4" />
            <stop offset="1" stop-color="#7D40FF" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_423_69"
            x1="285.523"
            y1="198.334"
            x2="261.1"
            y2="127.939"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#36B7F4" />
            <stop offset="1" stop-color="#7D40FF" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_423_69"
            x1="201"
            y1="127.937"
            x2="216.365"
            y2="192.939"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7D40FF" />
            <stop offset="1" stop-color="#36B7F4" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_423_69"
            x1="304.735"
            y1="3.19298"
            x2="402.299"
            y2="51.9336"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#01F1E3" />
            <stop offset="1" stop-color="#7D40FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SliderLevelNode;
