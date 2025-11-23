import React from 'react';
import { useNavigate } from 'react-router-dom';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Orbit = ({ className, unlockedLevels = 1, purchaseFailed = false, levelsData = [], showUnlockButton = false, onUnlockClick, isProcessing = false }) => {
  const navigate = useNavigate();
  const [orbitRef, isOrbitVisible] = useScrollAnimation({ threshold: 0.1 });

  const handleLevelClick = (level) => {
    navigate('/dashboard/cycle-level-progression', { state: { level } });
  };

  // Default data if API data is not available
  const defaultLevels = [
    { level: 1, usdPrice: "50", cctAmount: "100" },
    { level: 2, usdPrice: "100", cctAmount: "200" },
    { level: 3, usdPrice: "200", cctAmount: "400" },
    { level: 4, usdPrice: "400", cctAmount: "800" },
    { level: 5, usdPrice: "800", cctAmount: "1600" },
    { level: 6, usdPrice: "1600", cctAmount: "3200" },
    { level: 7, usdPrice: "3200", cctAmount: "6400" },
    { level: 8, usdPrice: "6400", cctAmount: "12800" },
    { level: 9, usdPrice: "12800", cctAmount: "25600" },
    { level: 10, usdPrice: "25600", cctAmount: "51200" }
  ];

  const levels = levelsData.length > 0 ? levelsData : defaultLevels;

  console.log('Orbit component - levelsData received:', levelsData);
  console.log('Orbit component - using levels:', levels);

  // Helper function to get level data
  const getLevelData = (levelNum) => {
    return levels.find(l => l.level === levelNum) || defaultLevels[levelNum - 1];
  };

  // Use red color if purchase failed, otherwise purple
  const primaryColor = purchaseFailed ? '#FF0505' : '#7D40FF';
  const secondaryColor = purchaseFailed ? '#FF0000' : '#3A126F';
  const tertiaryColor = purchaseFailed ? '#CC0000' : '#4B158E';

  return (
    <div ref={orbitRef} className={`w-[100%] animate-fade-in-up ${isOrbitVisible ? 'animate' : ''} ${className}`}>
      <svg
        className="w-[100%] h-fit hover:scale-105 transition-transform duration-500"
        width="954"
        height="829"
        viewBox="0 0 954 829"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M628.003 496.014C630.525 476.085 629.096 455.854 623.799 436.476C618.502 417.099 609.44 398.955 597.13 383.08C584.821 367.204 569.505 353.909 552.058 343.953C534.61 333.997 515.373 327.575 495.443 325.053C475.514 322.532 455.283 323.96 435.905 329.257C416.528 334.555 398.384 343.617 382.509 355.926C366.633 368.235 353.338 383.551 343.382 400.998C333.426 418.446 327.004 437.684 324.482 457.613C321.961 477.543 323.389 497.774 328.687 517.151C333.984 536.528 343.046 554.672 355.355 570.548C367.664 586.423 382.98 599.718 400.428 609.674C417.875 619.63 437.113 626.053 457.042 628.574C476.972 631.096 497.203 629.667 516.58 624.37C535.957 619.073 554.102 610.011 569.977 597.701C585.852 585.392 599.147 570.076 609.103 552.629C619.06 535.181 625.482 515.944 628.003 496.014L628.003 496.014Z"
          stroke={secondaryColor}
          stroke-width="14.58"
          stroke-dasharray="0.64 6.42"
          className="animate-pulse-slow"
        />


        {/* Level 1  */}
        <g opacity={unlockedLevels >= 1 ? 1 : 0.25} onClick={() => handleLevelClick(1)} className="cursor-pointer">
          <path
            d="M466.604 435.999L420.471 180.318"
            stroke="url(#paint3_linear_567_20)"
            stroke-width="3"
          />

          <g filter="url(#filter2_dii_567_20)">
            <circle
              cx="421.591"
              cy="182.608"
              r="50"
              transform="rotate(-14.7534 421.591 182.608)"
              fill={secondaryColor}
            />
            <circle
              cx="421.591"
              cy="182.608"
              r="50"
              transform="rotate(-14.7534 421.591 182.608)"
              fill="url(#paint5_radial_567_20)"
            />
          </g>

          {/* level 1 Text */}
          <path
            d="M403.617 180V167.15H406.342V177.75H411.554V180H403.617ZM416.362 180L412.618 170.174H415.421L417.32 175.772C417.531 176.481 417.663 177.152 417.715 177.785H417.768C417.797 177.223 417.929 176.552 418.164 175.772L420.053 170.174H422.857L419.113 180H416.362ZM427.393 180H424.712V166.324H427.393V180ZM441.799 180H439.083V172.564L439.11 171.343L439.154 170.007C438.702 170.458 438.389 170.754 438.213 170.894L436.737 172.081L435.427 170.446L439.567 167.15H441.799V180Z"
            fill="white"
          />
          <rect
            x="407.5"
            y="186"
            width="14"
            height="14"
            fill="url(#pattern2_567_20)"
          />
          <text x="428" y="198" fill="white" fontSize="14" fontWeight="400" textAnchor="middle">{`$${getLevelData(1).usdPrice}`}</text>
        </g>

        {/* Level 2  */}
        <g opacity={unlockedLevels >= 2 ? 1 : 0.25} onClick={() => handleLevelClick(2)} className="cursor-pointer">
          <path
            d="M504.727 441.691L597.747 199.103"
            stroke="url(#paint6_linear_567_20)"
            stroke-width="3"
          />
          <g filter="url(#filter3_dii_567_20)">
            <circle
              cx="597.519"
              cy="201.642"
              r="50"
              transform="rotate(-14.7534 597.519 201.642)"
              fill={secondaryColor}
            />
            <circle
              cx="597.519"
              cy="201.642"
              r="50"
              transform="rotate(-14.7534 597.519 201.642)"
              fill="url(#paint7_radial_567_20)"
            />
          </g>

          {/* level 2 Text  */}
          <path
            d="M578.115 200.784V187.934H580.84V198.534H586.052V200.784H578.115ZM590.86 200.784L587.116 190.958H589.92L591.818 196.556C592.029 197.265 592.161 197.936 592.214 198.569H592.266C592.296 198.006 592.428 197.336 592.662 196.556L594.552 190.958H597.355L593.611 200.784H590.86ZM601.891 200.784H599.21V187.108H601.891V200.784ZM618.565 200.784H609.583V198.894L612.808 195.633C613.763 194.655 614.387 193.978 614.68 193.603C614.973 193.222 615.184 192.871 615.313 192.548C615.442 192.226 615.506 191.892 615.506 191.546C615.506 191.031 615.363 190.647 615.076 190.395C614.794 190.143 614.416 190.017 613.942 190.017C613.444 190.017 612.96 190.131 612.492 190.36C612.023 190.588 611.534 190.914 611.024 191.336L609.547 189.586C610.18 189.047 610.705 188.667 611.121 188.444C611.537 188.221 611.991 188.051 612.483 187.934C612.975 187.811 613.526 187.75 614.135 187.75C614.938 187.75 615.647 187.896 616.262 188.189C616.877 188.482 617.355 188.892 617.695 189.419C618.035 189.947 618.205 190.55 618.205 191.23C618.205 191.822 618.099 192.378 617.888 192.9C617.683 193.416 617.361 193.946 616.921 194.491C616.488 195.036 615.72 195.812 614.619 196.82L612.966 198.376V198.499H618.565V200.784Z"
            fill="white"
          />
          <rect
            x="579.498"
            y="206.784"
            width="14"
            height="14"
            fill="url(#pattern3_567_20)"
          />
          <text x="600" y="218" fill="white" fontSize="14" fontWeight="400" textAnchor="middle">{`$${getLevelData(2).usdPrice}`}</text>
        </g>

        {/* level 3  */}
        <g opacity={unlockedLevels >= 3 ? 1 : 0.25} onClick={() => handleLevelClick(3)} className="cursor-pointer">
          {/* level 3 line  */}
          <path
            d="M506.708 474.382L764.093 327.803"
            stroke="url(#paint0_linear_567_20)"
            stroke-width="3"
          />

          {/* level 3 circle  */}
          <g filter="url(#filter0_dii_567_20)">
            <circle
              cx="757.938"
              cy="327.194"
              r="50"
              transform="rotate(-14.7534 757.938 327.194)"
              fill={secondaryColor}
            />
            <circle
              cx="757.938"
              cy="327.194"
              r="50"
              transform="rotate(-14.7534 757.938 327.194)"
              fill="url(#paint1_radial_567_20)"
            />
          </g>

          {/* level 3 text */}
          <path
            d="M738.55 326V313.15H741.275V323.75H746.487V326H738.55ZM751.295 326L747.551 316.174H750.354L752.253 321.772C752.464 322.481 752.596 323.152 752.648 323.785H752.701C752.73 323.223 752.862 322.552 753.096 321.772L754.986 316.174H757.79L754.046 326H751.295ZM762.326 326H759.645V312.324H762.326V326ZM778.499 316.024C778.499 316.827 778.255 317.51 777.769 318.072C777.283 318.635 776.6 319.021 775.721 319.232V319.285C776.758 319.414 777.543 319.73 778.077 320.234C778.61 320.732 778.876 321.406 778.876 322.256C778.876 323.492 778.428 324.456 777.532 325.147C776.635 325.833 775.355 326.176 773.691 326.176C772.296 326.176 771.06 325.944 769.982 325.481V323.17C770.48 323.422 771.028 323.627 771.625 323.785C772.223 323.943 772.815 324.022 773.401 324.022C774.297 324.022 774.959 323.87 775.387 323.565C775.815 323.261 776.029 322.771 776.029 322.098C776.029 321.494 775.783 321.066 775.291 320.814C774.798 320.562 774.013 320.437 772.935 320.437H771.959V318.354H772.953C773.949 318.354 774.675 318.225 775.132 317.967C775.595 317.703 775.827 317.255 775.827 316.622C775.827 315.649 775.217 315.163 773.999 315.163C773.577 315.163 773.146 315.233 772.707 315.374C772.273 315.515 771.79 315.758 771.256 316.104L770 314.231C771.171 313.388 772.569 312.966 774.192 312.966C775.522 312.966 776.571 313.235 777.338 313.774C778.112 314.313 778.499 315.063 778.499 316.024Z"
            fill="white"
          />
          <rect
            x="738.433"
            y="332"
            width="14"
            height="14"
            fill="url(#pattern0_567_20)"
          />
          <text x="760" y="344" fill="white" fontSize="14" fontWeight="400" textAnchor="middle">{`$${getLevelData(3).usdPrice}`}</text>
        </g>

        {/* level 4  */}
        <g opacity={unlockedLevels >= 4 ? 1 : 0.25} onClick={() => handleLevelClick(4)} className="cursor-pointer">
          <path
            d="M528.506 486.744L745.763 550.476"
            stroke="url(#paint21_linear_567_20)"
            stroke-width="3"
          />
          <g filter="url(#filter1_dii_567_20)">
            <circle
              cx="734.694"
              cy="556.618"
              r="50"
              transform="rotate(-14.7534 734.694 556.618)"
              fill={secondaryColor}
            />
            <circle
              cx="734.694"
              cy="556.618"
              r="50"
              transform="rotate(-14.7534 734.694 556.618)"
              fill="url(#paint2_radial_567_20)"
            />
          </g>

          {/* level 4 text */}
          <path
            d="M714.421 555.949L714.421 543.099L717.145 543.099L717.145 553.699L722.357 553.699L722.357 555.949L714.421 555.949ZM727.165 555.949L723.421 546.123L726.225 546.123L728.123 551.721C728.334 552.43 728.466 553.101 728.519 553.734L728.572 553.734C728.601 553.171 728.733 552.5 728.967 551.721L730.857 546.123L733.66 546.123L729.916 555.949L727.165 555.949ZM738.196 555.949L735.515 555.949L735.515 542.273L738.196 542.273L738.196 555.949ZM755.16 553.286L753.613 553.286L753.613 555.949L750.959 555.949L750.959 553.286L745.475 553.286L745.475 551.396L751.108 543.099L753.613 543.099L753.613 551.176L755.16 551.176L755.16 553.286ZM750.959 551.176L750.959 548.997C750.959 548.633 750.974 548.106 751.003 547.415C751.032 546.723 751.056 546.322 751.073 546.21L751.003 546.21C750.786 546.691 750.525 547.16 750.221 547.617L747.865 551.176L750.959 551.176Z"
            fill="white"
          />
          <rect
            x="713.803"
            y="561.949"
            width="14"
            height="14"
            fill="url(#pattern0_567_20)"
          />
          <text x="735" y="574" fill="white" fontSize="14" fontWeight="400" textAnchor="middle">{`$${getLevelData(4).usdPrice}`}</text>
        </g>

        {/* Level 5  */}
        <g opacity={unlockedLevels >= 5 ? 1 : 0.25} onClick={() => handleLevelClick(5)} className="cursor-pointer">
          <path
            d="M471.988 458.838L667.371 706.522"
            stroke="url(#paint16_linear_567_20)"
            stroke-width="3"
          />
          <g filter="url(#filter5_dii_567_20)">
            <circle
              cx="658.998"
              cy="688.333"
              r="50"
              transform="rotate(-14.7534 658.998 688.333)"
              fill={secondaryColor}
            />
            <circle
              cx="658.998"
              cy="688.333"
              r="50"
              transform="rotate(-14.7534 658.998 688.333)"
              fill="url(#paint11_radial_567_20)"
            />
          </g>
          {/* level 5 Text */}
          <path
            d="M638.617 687V674.15H641.342V684.75H646.554V687H638.617ZM651.362 687L647.618 677.174H650.421L652.32 682.772C652.531 683.481 652.663 684.152 652.715 684.785H652.768C652.797 684.223 652.929 683.552 653.164 682.772L655.053 677.174H657.857L654.113 687H651.362ZM662.393 687H659.712V673.324H662.393V687ZM674.76 678.791C676.002 678.791 676.989 679.14 677.722 679.837C678.46 680.534 678.829 681.489 678.829 682.702C678.829 684.138 678.387 685.242 677.502 686.016C676.617 686.789 675.352 687.176 673.705 687.176C672.276 687.176 671.121 686.944 670.242 686.481V684.135C670.705 684.381 671.244 684.583 671.86 684.741C672.475 684.893 673.058 684.97 673.609 684.97C675.267 684.97 676.096 684.29 676.096 682.931C676.096 681.636 675.238 680.988 673.521 680.988C673.21 680.988 672.867 681.02 672.492 681.085C672.117 681.143 671.813 681.208 671.578 681.278L670.497 680.698L670.981 674.15H677.95V676.453H673.363L673.125 678.975L673.433 678.914C673.79 678.832 674.233 678.791 674.76 678.791Z"
            fill="white"
          />
          <rect
            x="638"
            y="693"
            width="14"
            height="14"
            fill="url(#pattern0_567_20)"
          />
          <text x="660" y="705" fill="white" fontSize="14" fontWeight="400" textAnchor="middle">{`$${getLevelData(5).usdPrice}`}</text>
        </g>

        {/* Level 6  */}
        <g opacity={unlockedLevels >= 6 ? 1 : 0.25} onClick={() => handleLevelClick(6)} className="cursor-pointer">
          <path
            d="M483.531 472.435L476.945 695.243"
            stroke="url(#paint17_linear_567_20)"
            stroke-width="3"
          />
          <g filter="url(#filter6_dii_567_20)">
            <circle
              cx="472.891"
              cy="712.595"
              r="50"
              transform="rotate(-14.7534 472.891 712.595)"
              fill={secondaryColor}
            />
            <circle
              cx="472.891"
              cy="712.595"
              r="50"
              transform="rotate(-14.7534 472.891 712.595)"
              fill="url(#paint12_radial_567_20)"
            />
          </g>

          {/* level 6 Text */}
          <path
            d="M452.617 712L452.617 699.15L455.342 699.15L455.342 709.75L460.554 709.75L460.554 712L452.617 712ZM465.362 712L461.618 702.174L464.421 702.174L466.32 707.772C466.531 708.481 466.663 709.152 466.715 709.785L466.768 709.785C466.797 709.223 466.929 708.552 467.164 707.772L469.053 702.174L471.857 702.174L468.113 712L465.362 712ZM476.393 712L473.712 712L473.712 698.324L476.393 698.324L476.393 712ZM483.996 706.542C483.996 703.999 484.532 702.106 485.605 700.864C486.683 699.622 488.294 699.001 490.439 699.001C491.171 699.001 491.745 699.045 492.161 699.133L492.161 701.304C491.64 701.186 491.124 701.128 490.614 701.128C489.683 701.128 488.921 701.268 488.329 701.55C487.743 701.831 487.304 702.247 487.011 702.798C486.718 703.349 486.545 704.131 486.492 705.144L486.607 705.144C487.187 704.148 488.115 703.65 489.393 703.65C490.541 703.65 491.441 704.011 492.091 704.731C492.741 705.452 493.067 706.448 493.067 707.72C493.067 709.091 492.68 710.178 491.906 710.98C491.133 711.777 490.061 712.176 488.69 712.176C487.74 712.176 486.911 711.956 486.202 711.516C485.499 711.077 484.954 710.435 484.568 709.592C484.187 708.748 483.996 707.731 483.996 706.542ZM488.637 710.005C489.217 710.005 489.662 709.811 489.973 709.425C490.283 709.032 490.439 708.475 490.439 707.755C490.439 707.128 490.292 706.636 489.999 706.278C489.712 705.915 489.276 705.733 488.69 705.733C488.139 705.733 487.667 705.912 487.275 706.269C486.888 706.627 486.695 707.043 486.695 707.517C486.695 708.215 486.876 708.804 487.239 709.284C487.609 709.765 488.074 710.005 488.637 710.005Z"
            fill="white"
          />
          <rect
            x="450"
            y="718"
            width="14"
            height="14"
            fill="url(#pattern0_567_20)"
          />
          <text x="470" y="730" fill="white" fontSize="14" fontWeight="400" textAnchor="middle">{`$${getLevelData(6).usdPrice}`}</text>
        </g>

        {/* Level 7  */}
        <g opacity={unlockedLevels >= 7 ? 1 : 0.25} onClick={() => handleLevelClick(7)} className="cursor-pointer">
          <path
            d="M457.996 505.626L312.793 685.171"
            stroke="url(#paint18_linear_567_20)"
            stroke-width="3"
          />
          <g filter="url(#filter7_dii_567_20)">
            <circle
              cx="315.757"
              cy="680.539"
              r="50"
              transform="rotate(-14.7534 315.757 680.539)"
              fill={secondaryColor}
            />
            <circle
              cx="315.757"
              cy="680.539"
              r="50"
              transform="rotate(-14.7534 315.757 680.539)"
              fill="url(#paint13_radial_567_20)"
            />
          </g>

          {/* level 7 Text */}
          <path
            d="M296.144 680V667.15H298.869V677.75H304.081V680H296.144ZM308.889 680L305.145 670.174H307.948L309.847 675.772C310.058 676.481 310.19 677.152 310.242 677.785H310.295C310.324 677.223 310.456 676.552 310.69 675.772L312.58 670.174H315.384L311.64 680H308.889ZM319.92 680H317.239V666.324H319.92V680ZM328.885 680L333.711 669.453H327.374V667.168H336.593V668.873L331.733 680H328.885Z"
            fill="white"
          />
          <rect
            x="292.527"
            y="686"
            width="14"
            height="14"
            fill="url(#pattern0_567_20)"
          />
          <text x="315" y="698" fill="white" fontSize="14" fontWeight="400" textAnchor="middle">{`$${getLevelData(7).usdPrice}`}</text>
        </g>

        {/* Level 8  */}
        <g opacity={unlockedLevels >= 8 ? 1 : 0.25} onClick={() => handleLevelClick(8)} className="cursor-pointer">
          <path
            d="M424.116 496.836L201.883 559.549"
            stroke="url(#paint19_linear_567_20)"
            stroke-width="3"
          />
          <g filter="url(#filter8_dii_567_20)">
            <circle
              cx="206.978"
              cy="557.48"
              r="50"
              transform="rotate(-14.7534 206.978 557.48)"
              fill={secondaryColor}
            />
            <circle
              cx="206.978"
              cy="557.48"
              r="50"
              transform="rotate(-14.7534 206.978 557.48)"
              fill="url(#paint14_radial_567_20)"
            />
          </g>

          {/* level 8 Text */}
          <path
            d="M187.559 556L187.559 543.15L190.283 543.15L190.283 553.75L195.495 553.75L195.495 556L187.559 556ZM200.303 556L196.559 546.174L199.363 546.174L201.261 551.772C201.472 552.481 201.604 553.152 201.657 553.785L201.71 553.785C201.739 553.223 201.871 552.552 202.105 551.772L203.995 546.174L206.798 546.174L203.054 556L200.303 556ZM211.334 556L208.653 556L208.653 542.324L211.334 542.324L211.334 556ZM223.455 542.983C224.686 542.983 225.676 543.265 226.426 543.827C227.182 544.384 227.56 545.137 227.56 546.086C227.56 546.742 227.378 547.328 227.015 547.844C226.652 548.353 226.066 548.81 225.257 549.215C226.218 549.73 226.906 550.269 227.322 550.832C227.744 551.389 227.955 552.001 227.955 552.669C227.955 553.724 227.542 554.573 226.716 555.218C225.89 555.856 224.803 556.176 223.455 556.176C222.049 556.176 220.945 555.877 220.142 555.279C219.339 554.682 218.938 553.835 218.938 552.739C218.938 552.007 219.131 551.356 219.518 550.788C219.91 550.22 220.537 549.719 221.399 549.285C220.666 548.822 220.139 548.327 219.817 547.8C219.494 547.272 219.333 546.695 219.333 546.068C219.333 545.148 219.714 544.404 220.476 543.836C221.238 543.267 222.231 542.983 223.455 542.983ZM221.451 552.581C221.451 553.085 221.627 553.477 221.979 553.759C222.33 554.04 222.811 554.181 223.42 554.181C224.094 554.181 224.598 554.037 224.932 553.75C225.266 553.457 225.433 553.073 225.433 552.599C225.433 552.206 225.266 551.84 224.932 551.5C224.604 551.154 224.068 550.788 223.323 550.401C222.075 550.975 221.451 551.702 221.451 552.581ZM223.438 544.97C222.975 544.97 222.6 545.09 222.313 545.33C222.031 545.564 221.891 545.881 221.891 546.279C221.891 546.631 222.002 546.947 222.225 547.228C222.453 547.504 222.864 547.788 223.455 548.081C224.03 547.811 224.431 547.536 224.659 547.255C224.888 546.974 225.002 546.648 225.002 546.279C225.002 545.875 224.856 545.556 224.563 545.321C224.27 545.087 223.895 544.97 223.438 544.97Z"
            fill="white"
          />
          <rect
            x="183.441"
            y="562"
            width="14"
            height="14"
            fill="url(#pattern0_567_20)"
          />
          <text x="205" y="574" fill="white" fontSize="14" fontWeight="400" textAnchor="middle">{`$${getLevelData(8).usdPrice}`}</text>
        </g>

        {/* Level 9  */}
        <g opacity={unlockedLevels >= 9 ? 1 : 0.25} onClick={() => handleLevelClick(9)} className="cursor-pointer">
          <path
            d="M411.86 464.693L191.446 395.859"
            stroke="url(#paint20_linear_567_20)"
            stroke-width="3"
          />
          <g filter="url(#filter9_dii_567_20)">
            <circle
              cx="196.845"
              cy="396.908"
              r="50"
              transform="rotate(-14.7534 196.845 396.908)"
              fill={secondaryColor}
            />
            <circle
              cx="196.845"
              cy="396.908"
              r="50"
              transform="rotate(-14.7534 196.845 396.908)"
              fill="url(#paint15_radial_567_20)"
            />
          </g>

          {/* level 9 Text */}
          <path
            d="M176.617 396V383.15H179.342V393.75H184.554V396H176.617ZM189.362 396L185.618 386.174H188.421L190.32 391.772C190.531 392.481 190.663 393.152 190.715 393.785H190.768C190.797 393.223 190.929 392.552 191.164 391.772L193.053 386.174H195.857L192.113 396H189.362ZM200.393 396H197.712V382.324H200.393V396ZM217.014 388.635C217.014 391.166 216.481 393.056 215.414 394.304C214.348 395.552 212.734 396.176 210.572 396.176C209.81 396.176 209.233 396.135 208.84 396.053V393.873C209.332 393.996 209.848 394.058 210.387 394.058C211.295 394.058 212.042 393.926 212.628 393.662C213.214 393.393 213.662 392.974 213.973 392.405C214.283 391.831 214.462 391.043 214.509 390.041H214.404C214.064 390.592 213.671 390.979 213.226 391.201C212.781 391.424 212.224 391.535 211.556 391.535C210.437 391.535 209.555 391.178 208.91 390.463C208.266 389.742 207.944 388.743 207.944 387.466C207.944 386.089 208.333 385.002 209.113 384.205C209.898 383.402 210.964 383.001 212.312 383.001C213.261 383.001 214.09 383.224 214.799 383.669C215.514 384.114 216.062 384.762 216.443 385.611C216.823 386.455 217.014 387.463 217.014 388.635ZM212.364 385.181C211.802 385.181 211.363 385.374 211.046 385.761C210.73 386.147 210.572 386.704 210.572 387.431C210.572 388.052 210.715 388.544 211.002 388.907C211.289 389.271 211.726 389.452 212.312 389.452C212.863 389.452 213.334 389.273 213.727 388.916C214.119 388.553 214.316 388.137 214.316 387.668C214.316 386.971 214.131 386.382 213.762 385.901C213.399 385.421 212.933 385.181 212.364 385.181Z"
            fill="white"
          />
          <rect
            x="170.5"
            y="402"
            width="14"
            height="14"
            fill="url(#pattern0_567_20)"
          />
          <text x="191" y="414" fill="white" fontSize="14" fontWeight="400" textAnchor="middle">{`$${getLevelData(9).usdPrice}`}</text>
        </g>

        {/* Level 10  */}
        <g opacity={unlockedLevels >= 10 ? 1 : 0.25} onClick={() => handleLevelClick(10)} className="cursor-pointer">
          <path d="M473.5 472.5L120 130" stroke="url(#paint22_linear_567_20)" stroke-width="3" />
          <g filter="url(#filter4_dii_567_20)">
            <circle
              cx="128"
              cy="124"
              r="50"
              transform="rotate(-14.7534 128 124)"
              fill={secondaryColor}
            />
            <circle
              cx="128"
              cy="124"
              r="50"
              transform="rotate(-14.7534 128 124)"
              fill="url(#paint8_radial_567_20)"
            />
          </g>
          {/* level 10 Text */}
          <path
            d="M102.932 123V110.15H105.657V120.75H110.869V123H102.932ZM115.677 123L111.933 113.174H114.736L116.635 118.772C116.846 119.481 116.978 120.152 117.03 120.785H117.083C117.112 120.223 117.244 119.552 117.479 118.772L119.368 113.174H122.172L118.428 123H115.677ZM126.708 123H124.027V109.324H126.708V123ZM141.114 123H138.398V115.564L138.425 114.343L138.469 113.007C138.017 113.458 137.704 113.754 137.528 113.895L136.052 115.081L134.742 113.446L138.882 110.15H141.114V123ZM154.035 116.575C154.035 118.819 153.665 120.48 152.927 121.559C152.195 122.637 151.064 123.176 149.535 123.176C148.052 123.176 146.933 122.619 146.177 121.506C145.427 120.393 145.052 118.749 145.052 116.575C145.052 114.308 145.418 112.638 146.151 111.565C146.883 110.487 148.011 109.948 149.535 109.948C151.017 109.948 152.136 110.511 152.892 111.636C153.654 112.761 154.035 114.407 154.035 116.575ZM147.75 116.575C147.75 118.151 147.885 119.282 148.155 119.968C148.43 120.647 148.89 120.987 149.535 120.987C150.167 120.987 150.624 120.642 150.906 119.95C151.187 119.259 151.328 118.134 151.328 116.575C151.328 114.999 151.184 113.868 150.897 113.183C150.616 112.491 150.162 112.146 149.535 112.146C148.896 112.146 148.439 112.491 148.163 113.183C147.888 113.868 147.75 114.999 147.75 116.575Z"
            fill="white"
          />
          <rect
            x="100"
            y="129"
            width="14"
            height="14"
            fill="url(#pattern0_567_20)"
          />
          <text x="130" y="141" fill="white" fontSize="14" fontWeight="400" textAnchor="middle">{`$${getLevelData(10).usdPrice}`}</text>
        </g>

        {/* Root Level */}
        <>
          <ellipse
            opacity="0.25"
            cx="476.5"
            cy="476.5"
            rx="106.5"
            ry="106.5"
            transform="rotate(-90 476.5 476.5)"
            fill="url(#paint9_linear_567_20)"
          />
          <circle
            cx="476.5"
            cy="476.5"
            r="75.1446"
            transform="rotate(-90 476.5 476.5)"
            fill="url(#paint10_linear_567_20)"
          />
          <ellipse
            cx="477.295"
            cy="476.705"
            rx="51.2952"
            ry="51.2952"
            transform="rotate(-90 477.295 476.705)"
            fill="#191932"
          />

          {/* Root Text or Button */}
          {showUnlockButton ? (
            <foreignObject x="418" y="440" width="120" height="60">
              <div xmlns="http://www.w3.org/1999/xhtml" className="flex items-center justify-center w-full h-full">
                <button
                  onClick={onUnlockClick}
                  disabled={isProcessing}
                  className="text-white keep-white font-bold text-[14px] hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer bg-transparent border-none p-0 m-0 leading-tight text-center"
                >
                  {isProcessing ? 'Processing...' : (
                    <>
                      Click<br /> to <br />Unlock 
                    </>
                  )}
                </button>
              </div>
            </foreignObject>
          ) : (
            <path
              d="M455.523 476.842C455.523 479.205 454.938 481.021 453.766 482.291C452.594 483.561 450.914 484.195 448.727 484.195C446.539 484.195 444.859 483.561 443.688 482.291C442.516 481.021 441.93 479.199 441.93 476.822C441.93 474.446 442.516 472.633 443.688 471.383C444.866 470.126 446.552 469.498 448.746 469.498C450.94 469.498 452.617 470.13 453.775 471.393C454.941 472.656 455.523 474.472 455.523 476.842ZM445.104 476.842C445.104 478.437 445.406 479.638 446.012 480.445C446.617 481.253 447.522 481.656 448.727 481.656C451.142 481.656 452.35 480.051 452.35 476.842C452.35 473.626 451.148 472.018 448.746 472.018C447.542 472.018 446.633 472.424 446.021 473.238C445.41 474.046 445.104 475.247 445.104 476.842ZM464.342 472.877C464.745 472.877 465.081 472.906 465.348 472.965L465.123 475.758C464.882 475.693 464.589 475.66 464.244 475.66C463.294 475.66 462.551 475.904 462.018 476.393C461.49 476.881 461.227 477.564 461.227 478.443V484H458.248V473.082H460.504L460.943 474.918H461.09C461.428 474.306 461.884 473.814 462.457 473.443C463.036 473.066 463.665 472.877 464.342 472.877ZM473.404 472.877C474.693 472.877 475.702 473.382 476.432 474.391C477.161 475.393 477.525 476.77 477.525 478.521C477.525 480.325 477.148 481.721 476.393 482.711C475.644 483.701 474.622 484.195 473.326 484.195C472.044 484.195 471.038 483.73 470.309 482.799H470.104L469.605 484H467.33V468.805H470.309V472.34C470.309 472.789 470.27 473.508 470.191 474.498H470.309C471.005 473.417 472.037 472.877 473.404 472.877ZM472.447 475.26C471.712 475.26 471.174 475.488 470.836 475.943C470.497 476.393 470.322 477.138 470.309 478.18V478.502C470.309 479.674 470.481 480.514 470.826 481.021C471.178 481.529 471.731 481.783 472.486 481.783C473.098 481.783 473.583 481.503 473.941 480.943C474.306 480.377 474.488 479.557 474.488 478.482C474.488 477.408 474.306 476.604 473.941 476.07C473.577 475.53 473.079 475.26 472.447 475.26ZM479.859 470.26C479.859 469.29 480.4 468.805 481.48 468.805C482.561 468.805 483.102 469.29 483.102 470.26C483.102 470.722 482.965 471.083 482.691 471.344C482.424 471.598 482.021 471.725 481.48 471.725C480.4 471.725 479.859 471.236 479.859 470.26ZM482.965 484H479.986V473.082H482.965V484ZM490.699 481.822C491.22 481.822 491.845 481.708 492.574 481.48V483.697C491.832 484.029 490.921 484.195 489.84 484.195C488.648 484.195 487.779 483.896 487.232 483.297C486.692 482.691 486.422 481.786 486.422 480.582V475.318H484.996V474.059L486.637 473.062L487.496 470.758H489.4V473.082H492.457V475.318H489.4V480.582C489.4 481.005 489.518 481.318 489.752 481.52C489.993 481.721 490.309 481.822 490.699 481.822ZM508.961 484L507.926 480.602H502.721L501.686 484H498.424L503.463 469.664H507.164L512.223 484H508.961ZM507.203 478.062C506.246 474.983 505.706 473.242 505.582 472.838C505.465 472.434 505.38 472.115 505.328 471.881C505.113 472.714 504.498 474.775 503.482 478.062H507.203Z"
              fill="white"
            />
          )}
        </>

        <defs>
          {/* level 3  */}
          <filter
            id="filter0_dii_567_20"
            x="630.034"
            y="203.184"
            width="255.808"
            height="255.808"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.89458" />
            <feGaussianBlur stdDeviation="38.9458" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.227451 0 0 0 0 0.0705882 0 0 0 0 0.435294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_567_20"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_567_20"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="9.73644" dy="15.5783" />
            <feGaussianBlur stdDeviation="9.73644" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.95 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_567_20"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.94729" />
            <feGaussianBlur stdDeviation="4.86822" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_567_20"
              result="effect3_innerShadow_567_20"
            />
          </filter>
          <pattern
            id="pattern0_567_20"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_567_20" transform="scale(0.000976562)" />
          </pattern>

          {/* level 4 */}
          <filter
            id="filter1_dii_567_20"
            x="606.791"
            y="432.609"
            width="255.808"
            height="255.808"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.89458" />
            <feGaussianBlur stdDeviation="38.9458" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.227451 0 0 0 0 0.0705882 0 0 0 0 0.435294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_567_20"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_567_20"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="9.73644" dy="15.5783" />
            <feGaussianBlur stdDeviation="9.73644" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.95 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_567_20"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.94729" />
            <feGaussianBlur stdDeviation="4.86822" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_567_20"
              result="effect3_innerShadow_567_20"
            />
          </filter>
          <pattern
            id="pattern1_567_20"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_567_20" transform="scale(0.000976562)" />
          </pattern>

          {/* level 1  */}
          <filter
            id="filter2_dii_567_20"
            x="293.688"
            y="58.5985"
            width="255.808"
            height="255.808"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.89458" />
            <feGaussianBlur stdDeviation="38.9458" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.227451 0 0 0 0 0.0705882 0 0 0 0 0.435294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_567_20"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_567_20"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="9.73644" dy="15.5783" />
            <feGaussianBlur stdDeviation="9.73644" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.95 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_567_20"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.94729" />
            <feGaussianBlur stdDeviation="4.86822" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_567_20"
              result="effect3_innerShadow_567_20"
            />
          </filter>
          <pattern
            id="pattern2_567_20"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_567_20" transform="scale(0.000976562)" />
          </pattern>

          {/* level 2  */}
          <filter
            id="filter3_dii_567_20"
            x="469.615"
            y="77.6329"
            width="255.808"
            height="255.808"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.89458" />
            <feGaussianBlur stdDeviation="38.9458" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.227451 0 0 0 0 0.0705882 0 0 0 0 0.435294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_567_20"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_567_20"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="9.73644" dy="15.5783" />
            <feGaussianBlur stdDeviation="9.73644" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.95 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_567_20"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.94729" />
            <feGaussianBlur stdDeviation="4.86822" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_567_20"
              result="effect3_innerShadow_567_20"
            />
          </filter>
          <pattern
            id="pattern3_567_20"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_567_20" transform="scale(0.000976562)" />
          </pattern>

          <pattern
            id="pattern4_567_20"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_567_20" transform="scale(0.000976562)" />
          </pattern>
          <pattern
            id="pattern5_567_20"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_567_20" transform="scale(0.000976562)" />
          </pattern>
          <pattern
            id="pattern6_567_20"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_567_20" transform="scale(0.000976562)" />
          </pattern>
          <pattern
            id="pattern7_567_20"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_567_20" transform="scale(0.000976562)" />
          </pattern>
          <pattern
            id="pattern8_567_20"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_567_20" transform="scale(0.000976562)" />
          </pattern>

          {/* level 10  */}
          <filter
            id="filter4_dii_567_20"
            x="0.0962372"
            y="-0.00924611"
            width="255.808"
            height="255.808"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.89458" />
            <feGaussianBlur stdDeviation="38.9458" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.227451 0 0 0 0 0.0705882 0 0 0 0 0.435294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_567_20"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_567_20"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="9.73644" dy="15.5783" />
            <feGaussianBlur stdDeviation="9.73644" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.95 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_567_20"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.94729" />
            <feGaussianBlur stdDeviation="4.86822" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_567_20"
              result="effect3_innerShadow_567_20"
            />
          </filter>
          <pattern
            id="pattern9_567_20"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlink:href="#image0_567_20" transform="scale(0.000976562)" />
          </pattern>

          {/* level 3 line Gradient  */}
          <linearGradient
            id="paint0_linear_567_20"
            x1="716.503"
            y1="354.998"
            x2="711.261"
            y2="346.7"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={secondaryColor} />
          </linearGradient>

          {/* level 3 Gradient  */}
          <radialGradient
            id="paint1_radial_567_20"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(778.338 308.394) rotate(112.161) scale(112.708)"
          >
            <stop stop-color="#FF04B4" />
            <stop offset="1" stop-color="#000210" stop-opacity="0" />
          </radialGradient>

          {/* level 4 Gradient  */}
          <radialGradient
            id="paint2_radial_567_20"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(755.094 537.818) rotate(112.161) scale(112.708)"
          >
            <stop stop-color="#FF04B4" />
            <stop offset="1" stop-color="#000210" stop-opacity="0" />
          </radialGradient>

          {/* level 1 Line Gradient  */}
          <linearGradient
            id="paint3_linear_567_20"
            x1="427.785"
            y1="221.829"
            x2="418.509"
            y2="224.047"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={secondaryColor} />
          </linearGradient>

          {/* ID line Gradient  */}
          <linearGradient
            id="paint4_linear_567_20"
            x1="335.338"
            y1="151.549"
            x2="380.157"
            y2="166.633"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5DE6E0" />
            <stop offset="1" stop-color="#3A126F" />
          </linearGradient>

          {/* level 1 Gradient  */}
          <radialGradient
            id="paint5_radial_567_20"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(441.991 163.808) rotate(112.161) scale(112.708)"
          >
            <stop stop-color="#FF04B4" />
            <stop offset="1" stop-color="#000210" stop-opacity="0" />
          </radialGradient>

          {/* level 2 line Gradient  */}
          <linearGradient
            id="paint6_linear_567_20"
            x1="582.493"
            y1="238.401"
            x2="573.311"
            y2="235.403"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={secondaryColor} />
          </linearGradient>

          {/* level 2 Gradient  */}
          <radialGradient
            id="paint7_radial_567_20"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(617.919 182.842) rotate(112.161) scale(112.708)"
          >
            <stop stop-color="#FF04B4" />
            <stop offset="1" stop-color="#000210" stop-opacity="0" />
          </radialGradient>

          {/* level 10 line Gradient  */}
          <radialGradient
            id="paint8_radial_567_20"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(148.4 105.2) rotate(112.161) scale(112.708)"
          >
            <stop stop-color="#FF04B4" />
            <stop offset="1" stop-color="#000210" stop-opacity="0" />
          </radialGradient>

          {/* Root Circle 2 */}
          <linearGradient
            id="paint9_linear_567_20"
            x1="583"
            y1="423.249"
            x2="375.31"
            y2="423.427"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={tertiaryColor} />
          </linearGradient>

          {/* Root Circle 1  */}
          <linearGradient
            id="paint10_linear_567_20"
            x1="551.645"
            y1="438.927"
            x2="405.102"
            y2="439.052"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={tertiaryColor} />
          </linearGradient>

          {/* Level 5 Filter */}
          <filter
            id="filter5_dii_567_20"
            x="531.094"
            y="564.323"
            width="255.808"
            height="255.808"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.89458" />
            <feGaussianBlur stdDeviation="38.9458" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.227451 0 0 0 0 0.0705882 0 0 0 0 0.435294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_567_20"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_567_20"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="9.73644" dy="15.5783" />
            <feGaussianBlur stdDeviation="9.73644" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.95 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_567_20"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.94729" />
            <feGaussianBlur stdDeviation="4.86822" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_567_20"
              result="effect3_innerShadow_567_20"
            />
          </filter>

          {/* Level 5 Gradient */}
          <radialGradient
            id="paint11_radial_567_20"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(679.398 669.533) rotate(112.161) scale(112.708)"
          >
            <stop stop-color="#FF04B4" />
            <stop offset="1" stop-color="#000210" stop-opacity="0" />
          </radialGradient>

          <linearGradient
            id="paint16_linear_567_20"
            x1="471.988"
            y1="458.838"
            x2="667.371"
            y2="706.522"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={secondaryColor} />
          </linearGradient>

          {/* Level 6 Filter */}
          <filter
            id="filter6_dii_567_20"
            x="344.987"
            y="588.585"
            width="255.808"
            height="255.808"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.89458" />
            <feGaussianBlur stdDeviation="38.9458" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.227451 0 0 0 0 0.0705882 0 0 0 0 0.435294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_567_20"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_567_20"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="9.73644" dy="15.5783" />
            <feGaussianBlur stdDeviation="9.73644" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.95 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_567_20"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.94729" />
            <feGaussianBlur stdDeviation="4.86822" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_567_20"
              result="effect3_innerShadow_567_20"
            />
          </filter>

          {/* Level 7 Filter */}
          <filter
            id="filter7_dii_567_20"
            x="187.853"
            y="556.529"
            width="255.808"
            height="255.808"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.89458" />
            <feGaussianBlur stdDeviation="38.9458" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.227451 0 0 0 0 0.0705882 0 0 0 0 0.435294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_567_20"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_567_20"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="9.73644" dy="15.5783" />
            <feGaussianBlur stdDeviation="9.73644" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.95 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_567_20"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.94729" />
            <feGaussianBlur stdDeviation="4.86822" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_567_20"
              result="effect3_innerShadow_567_20"
            />
          </filter>

          {/* Level 8 Filter */}
          <filter
            id="filter8_dii_567_20"
            x="79.074"
            y="433.47"
            width="255.808"
            height="255.808"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.89458" />
            <feGaussianBlur stdDeviation="38.9458" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.227451 0 0 0 0 0.0705882 0 0 0 0 0.435294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_567_20"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_567_20"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="9.73644" dy="15.5783" />
            <feGaussianBlur stdDeviation="9.73644" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.95 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_567_20"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.94729" />
            <feGaussianBlur stdDeviation="4.86822" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_567_20"
              result="effect3_innerShadow_567_20"
            />
          </filter>

          {/* Level 9 Filter */}
          <filter
            id="filter9_dii_567_20"
            x="68.941"
            y="272.898"
            width="255.808"
            height="255.808"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.89458" />
            <feGaussianBlur stdDeviation="38.9458" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.227451 0 0 0 0 0.0705882 0 0 0 0 0.435294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_567_20"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_567_20"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="9.73644" dy="15.5783" />
            <feGaussianBlur stdDeviation="9.73644" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.510417 0 0 0 0 0.0208333 0 0 0 0 1 0 0 0 0.95 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_567_20"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.94729" />
            <feGaussianBlur stdDeviation="4.86822" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_innerShadow_567_20"
              result="effect3_innerShadow_567_20"
            />
          </filter>

          {/* Level 6 Gradient */}
          <radialGradient
            id="paint12_radial_567_20"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(493.291 693.795) rotate(112.161) scale(112.708)"
          >
            <stop stop-color="#FF04B4" />
            <stop offset="1" stop-color="#000210" stop-opacity="0" />
          </radialGradient>

          {/* Level 7 Gradient */}
          <radialGradient
            id="paint13_radial_567_20"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(336.157 661.739) rotate(112.161) scale(112.708)"
          >
            <stop stop-color="#FF04B4" />
            <stop offset="1" stop-color="#000210" stop-opacity="0" />
          </radialGradient>

          {/* Level 8 Gradient */}
          <radialGradient
            id="paint14_radial_567_20"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(227.378 538.68) rotate(112.161) scale(112.708)"
          >
            <stop stop-color="#FF04B4" />
            <stop offset="1" stop-color="#000210" stop-opacity="0" />
          </radialGradient>

          {/* Level 9 Gradient */}
          <radialGradient
            id="paint15_radial_567_20"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(217.245 378.108) rotate(112.161) scale(112.708)"
          >
            <stop stop-color="#FF04B4" />
            <stop offset="1" stop-color="#000210" stop-opacity="0" />
          </radialGradient>

          <linearGradient
            id="paint17_linear_567_20"
            x1="483.531"
            y1="472.435"
            x2="476.945"
            y2="695.243"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={secondaryColor} />
          </linearGradient>

          <linearGradient
            id="paint18_linear_567_20"
            x1="457.996"
            y1="505.626"
            x2="312.793"
            y2="685.171"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={secondaryColor} />
          </linearGradient>

          <linearGradient
            id="paint19_linear_567_20"
            x1="424.116"
            y1="496.836"
            x2="201.883"
            y2="559.549"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={secondaryColor} />
          </linearGradient>

          <linearGradient
            id="paint21_linear_567_20"
            x1="528.506"
            y1="486.744"
            x2="745.763"
            y2="550.476"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={secondaryColor} />
          </linearGradient>

          <linearGradient
            id="paint22_linear_567_20"
            x1="473.5"
            y1="472.5"
            x2="120"
            y2="130"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={primaryColor} />
            <stop offset="1" stop-color={secondaryColor} />
          </linearGradient>


        </defs>
      </svg>
    </div>
  );
};

export default Orbit;
