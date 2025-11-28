import React, { useEffect, useState } from 'react';
import { useProgress } from '../../../context/ProgressContext.jsx'

const SliderLevelNodeB = ({ className, stage = 0, flowKey = 'nodeB', cycleData, showLocked = false, level = 1, userId }) => {
  const [prevStage, setPrevStage] = useState(stage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { purchased, unlockedLevels } = useProgress();
  const isLocked = showLocked ? false : (!purchased || (unlockedLevels?.[flowKey] ?? 0) < 1);

  const getPos = (posIndex) => {
    if (!cycleData || !cycleData.positions) return null;
    return cycleData.positions.find(p => p.position === posIndex || p.positionIndex === posIndex);
  };

  // console.log('SliderLevelNodeB - isLocked:', isLocked);
  // console.log('SliderLevelNodeB - cycleData:', cycleData);
  // console.log('SliderLevelNodeB - getPos(1):', getPos(1));
  // console.log('SliderLevelNodeB - getPos(2):', getPos(2));
  // console.log('SliderLevelNodeB - getPos(3):', getPos(3));
  // console.log('SliderLevelNodeB - getPos(4):', getPos(4));
  // console.log('SliderLevelNodeB - getPos(5):', getPos(5));
  // console.log('SliderLevelNodeB - getPos(6):', getPos(6));

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
        className="w-full h-auto max-w-full lg:max-w-none"
        viewBox="0 0 516 255"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect
          y="59"
          width="201"
          height="138"
          rx="10"
          fill={isLocked ? '#1f1536' : 'url(#paint0_linear_886_471)'}
        />
        {/* Level Number */}
        <text
          x="100.5"
          y="95"
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
          y="120"
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
          y="134"
          width="42"
          height="42"
          xlinkHref="/icons/CCT.svg"
          preserveAspectRatio="xMidYMid meet"
        />
        {/* Earning - Large CCT Amount */}
        {/* <text
          x="100.5"
          y="169"
          fill={isLocked ? '#9CA3AF' : 'white'}
          fontSize="48"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {cycleData?.totalEarnings || 0}
        </text> */}
        {/* node: level box (first line - left) */}
        {/* Position 1 */}
        <rect
          x="265"
          y="27"
          width="123"
          height="68"
          rx="10"
          fill={isLocked ? '#322661' : (getPos(1) ? 'url(#paintStage1_box_B)' : 'url(#paint1_linear_886_471)')}
        />
        {!isLocked && getPos(1) && (
          <text x="300" y="70" fill="#FFFFFF" fontSize="24" fontFamily="Inter, sans-serif" fontWeight="700" stroke="#000000" strokeOpacity="0.35" strokeWidth="1" style={{ paintOrder: 'stroke' }} pointerEvents="none">
            ID {getPos(1).userId}
          </text>
        )}
        {!isLocked && !getPos(1) && (
          <path
            d="M326.5 61C330.488 61 333.75 57.8499 333.75 54C333.75 50.1501 330.488 47 326.5 47C322.512 47 319.25 50.1501 319.25 54C319.25 57.8499 322.512 61 326.5 61ZM326.5 64.5C321.697 64.5 312 66.8626 312 71.5V75H341V71.5C341 66.8626 331.303 64.5 326.5 64.5Z"
            fill="#200F46"
          />
        )}
        {/* Position 2 */}
        <rect
          x="265.231"
          y="160"
          width="123"
          height="68"
          rx="10"
          fill={isLocked ? '#322661' : (getPos(2) ? 'url(#paintStage1_box_B)' : 'url(#paint1_linear_886_471)')}
        />
        {!isLocked && getPos(2) && (
          <text x="300" y="202" fill="#FFFFFF" fontSize="24" fontFamily="Inter, sans-serif" fontWeight="700" stroke="#000000" strokeOpacity="0.35" strokeWidth="1" style={{ paintOrder: 'stroke' }} pointerEvents="none">
            ID {getPos(2).userId}
          </text>
        )}
        {!isLocked && !getPos(2) && (
          <path
            d="M326.731 194C330.719 194 333.981 190.85 333.981 187C333.981 183.15 330.719 180 326.731 180C322.744 180 319.481 183.15 319.481 187C319.481 190.85 322.744 194 326.731 194ZM326.731 197.5C321.928 197.5 312.231 199.863 312.231 204.5V208H341.231V204.5C341.231 199.863 331.534 197.5 326.731 197.5Z"
            fill="#200F46"
          />
        )}
        {/* nodeline */}
        <path
          d="M265.947 62C224.509 62 241.739 127.614 200.443 127.614"
          stroke={isLocked ? '#9CA3AF' : (getPos(1) ? 'url(#paintStage1_nodeline_B)' : '#322661')}
          stroke-width="11.11"
        />
        {/* nodeline */}
        <path
          d="M201.061 127.614C242.499 127.614 225.269 194 266.565 194"
          stroke={isLocked ? '#9CA3AF' : (getPos(2) ? 'url(#paintStage1_nodeline_B)' : '#322661')}
          stroke-width="11.11"
        />
        {/* nodeline */}
        <path
          d="M387.948 195C420.87 195 403.604 229 437.492 229"
          stroke={isLocked ? '#9CA3AF' : (getPos(6) ? 'url(#paintStage1_nodeline_B)' : '#322661')}
          stroke-width="11.11"
        />
        {/* nodeline */}
        <path
          d="M437.492 161C404.57 161 421.835 195 387.948 195"
          stroke={isLocked ? '#9CA3AF' : (getPos(5) ? 'url(#paintStage1_nodeline_B)' : '#322661')}
          stroke-width="11.11"
        />
        {/* Position 5 */}
        <rect
          x="437.492"
          y="135"
          width="78.5081"
          height="52"
          rx="10"
          fill={isLocked ? '#322661' : (getPos(5) ? 'url(#paintStage1_box_B)' : 'url(#paint3_linear_886_471)')}
        />
        {!isLocked && getPos(5) && (
          <text x="460" y="169" fill="#FFFFFF" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="700" stroke="#000000" strokeOpacity="0.35" strokeWidth="1" style={{ paintOrder: 'stroke' }} pointerEvents="none">
            ID {getPos(5).userId}
          </text>
        )}
        {!isLocked && !getPos(5) && (
          <path
            d="M476.746 161C480.733 161 483.996 157.85 483.996 154C483.996 150.15 480.733 147 476.746 147C472.758 147 469.496 150.15 469.496 154C469.496 157.85 472.758 161 476.746 161ZM476.746 164.5C471.943 164.5 462.246 166.863 462.246 171.5V175H491.246V171.5C491.246 166.863 481.549 164.5 476.746 164.5Z"
            fill="#200F46"
          />
        )}
        {/* Position 6 */}
        <rect
          x="437.492"
          y="203"
          width="78.5081"
          height="52"
          rx="10"
          fill={isLocked ? '#322661' : (getPos(6) ? 'url(#paintStage1_box_B)' : 'url(#paint4_linear_886_471)')}
        />
        {!isLocked && getPos(6) && (
          <>
            <circle cx="450" cy="229" r="8" fill="#F0B90B" />
            <image x="445" y="224" width="10" height="10" xlinkHref="/svgs/recycle.svg" />
            <text x="465" y="237" fill="#FFFFFF" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="700" stroke="#000000" strokeOpacity="0.35" strokeWidth="1" style={{ paintOrder: 'stroke' }} pointerEvents="none">
              ID {getPos(6).userId}
            </text>
          </>
        )}
        {!isLocked && !getPos(6) && (
          <path
            d="M476.746 229C480.733 229 483.996 225.85 483.996 222C483.996 218.15 480.733 215 476.746 215C472.758 215 469.496 218.15 469.496 222C469.496 225.85 472.758 229 476.746 229ZM476.746 232.5C471.943 232.5 462.246 234.863 462.246 239.5V243H491.246V239.5C491.246 234.863 481.549 232.5 476.746 232.5Z"
            fill="#200F46"
          />
        )}
        {/* nodeline */}
        <path
          d="M387.948 63C420.87 63 403.604 97 437.492 97"
          stroke={isLocked ? '#9CA3AF' : (getPos(4) ? 'url(#paintStage1_nodeline_B)' : '#322661')}
          stroke-width="11.11"
        />
        {/* nodeline */}
        <path
          d="M437.492 29C404.57 29 421.835 63 387.948 63"
          stroke={isLocked ? '#9CA3AF' : (getPos(3) ? 'url(#paintStage1_nodeline_B)' : '#322661')}
          stroke-width="11.11"
        />
        {/* Position 4 */}
        <rect
          x="437.492"
          y="73"
          width="78.5081"
          height="52"
          rx="10"
          fill={isLocked ? '#322661' : (getPos(4) ? 'url(#paintStage1_box_B)' : 'url(#paint4_linear_886_471)')}
        />
        {!isLocked && getPos(4) && (
          <text x="460" y="107" fill="#FFFFFF" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="700" stroke="#000000" strokeOpacity="0.35" strokeWidth="1" style={{ paintOrder: 'stroke' }} pointerEvents="none">
            ID {getPos(4).userId}
          </text>
        )}
        {!isLocked && !getPos(4) && (
          <path
            d="M476.746 99C480.733 99 483.996 95.8499 483.996 92C483.996 88.1501 480.733 85 476.746 85C472.758 85 469.496 88.1501 469.496 92C469.496 95.8499 472.758 99 476.746 99ZM476.746 102.5C471.943 102.5 462.246 104.863 462.246 109.5V113H491.246V109.5C491.246 104.863 481.549 102.5 476.746 102.5Z"
            fill="#200F46"
          />
        )}
        {/* Position 3 */}
        <rect
          x="437.492"
          width="78.5081"
          height="52"
          rx="10"
          fill={isLocked ? '#322661' : (getPos(3) ? 'url(#paintStage1_box_B)' : 'url(#paint6_linear_886_471)')}
        />
        {!isLocked && getPos(3) && (
          <text x="460" y="34" fill="#FFFFFF" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="700" stroke="#000000" strokeOpacity="0.35" strokeWidth="1" style={{ paintOrder: 'stroke' }} pointerEvents="none">
            ID {getPos(3).userId}
          </text>
        )}
        {!isLocked && !getPos(3) && (
          <path
            d="M476.746 26C480.733 26 483.996 22.8499 483.996 19C483.996 15.1501 480.733 12 476.746 12C472.758 12 469.496 15.1501 469.496 19C469.496 22.8499 472.758 26 476.746 26ZM476.746 29.5C471.943 29.5 462.246 31.8626 462.246 36.5V40H491.246V36.5C491.246 31.8626 481.549 29.5 476.746 29.5Z"
            fill="#200F46"
          />
        )}
        <defs>
          <pattern
            id="pattern0_886_471"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_886_471" transform="scale(0.000976562)" />
          </pattern>
          <linearGradient id="paintStage1_nodeline_B" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stop-color="rgba(255, 4, 180, 0.7)" />
            <stop offset="100%" stop-color="rgba(125, 64, 255, 0.7)" />
          </linearGradient>
          <linearGradient id="paintStage1_box_B" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stop-color="#FF04B4" />
            <stop offset="100%" stop-color="#3244E8" />
          </linearGradient>
          <linearGradient
            id="paint0_linear_886_471"
            x1="0"
            y1="59"
            x2="211.002"
            y2="179.483"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7D40FF" />
            <stop offset="1" stop-color="#4B158E" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_886_471"
            x1="264.23"
            y1="32.2308"
            x2="374.997"
            y2="112.863"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#322661" />
            <stop offset="1" stop-color="#674EC7" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_886_471"
            x1="264.461"
            y1="165.231"
            x2="375.228"
            y2="245.863"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#322661" />
            <stop offset="1" stop-color="#674EC7" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_886_471"
            x1="437"
            y1="139"
            x2="516"
            y2="187"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#322661" />
            <stop offset="1" stop-color="#674EC7" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_886_471"
            x1="437"
            y1="207"
            x2="516"
            y2="255"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#322661" />
            <stop offset="1" stop-color="#674EC7" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_886_471"
            x1="437"
            y1="77"
            x2="516"
            y2="125"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#322661" />
            <stop offset="1" stop-color="#674EC7" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_886_471"
            x1="437"
            y1="4"
            x2="516"
            y2="52"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#322661" />
            <stop offset="1" stop-color="#674EC7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SliderLevelNodeB;
