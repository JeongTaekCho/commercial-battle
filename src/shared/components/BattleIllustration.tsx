/** Decorative A/B location comparison, independent of real analysis results. */
export default function BattleIllustration() {
  return (
    <svg aria-hidden="true" viewBox="0 0 440 280" fill="none" className="h-auto w-full">
      <ellipse cx="220" cy="247" rx="193" ry="17" fill="#dce4f3" opacity=".6" />
      <path
        d="M69 65C130 12 310 14 373 71M69 225c71 32 230 29 298-3"
        stroke="#bdcbe6"
        strokeWidth="2"
        strokeDasharray="5 7"
      />
      <g transform="translate(24 52) rotate(-7 88 92)">
        <rect x="4" y="7" width="172" height="183" rx="18" fill="#e8d8d5" opacity=".5" />
        <rect width="172" height="183" rx="18" fill="white" stroke="#efd3cc" strokeWidth="2" />
        <rect x="14" y="14" width="33" height="30" rx="9" fill="#fff0ea" />
        <text x="30" y="35" textAnchor="middle" fill="#d45136" fontSize="18" fontWeight="800">
          A
        </text>
        <path d="M61 23h62m-62 11h39" stroke="#d7dde6" strokeWidth="5" strokeLinecap="round" />
        <rect x="14" y="55" width="144" height="112" rx="10" fill="#fff4ee" />
        <path d="m16 93 141 28M58 57l-8 109m62-109-16 109" stroke="white" strokeWidth="12" />
        <circle
          cx="84"
          cy="112"
          r="39"
          fill="#ffdbcd"
          fillOpacity=".45"
          stroke="#ed9b81"
          strokeDasharray="4 4"
        />
        <rect x="27" y="65" width="19" height="16" rx="4" fill="#efdcd4" />
        <rect x="121" y="137" width="23" height="17" rx="4" fill="#efdcd4" />
        <path
          d="M84 80c-13 0-23 10-23 22 0 17 23 35 23 35s23-18 23-35c0-12-10-22-23-22Z"
          fill="#eb7151"
        />
        <path
          d="M74 101h20l-3-7H77zm2 0v12h16v-12m-10 12v-7h5v7"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(245 40) rotate(7 86 94)">
        <rect x="4" y="7" width="172" height="183" rx="18" fill="#cedaf0" opacity=".6" />
        <rect width="172" height="183" rx="18" fill="white" stroke="#cbdaf4" strokeWidth="2" />
        <rect x="14" y="14" width="33" height="30" rx="9" fill="#edf3ff" />
        <text x="30" y="35" textAnchor="middle" fill="#3768cd" fontSize="18" fontWeight="800">
          B
        </text>
        <path d="M61 23h62m-62 11h39" stroke="#d7dde6" strokeWidth="5" strokeLinecap="round" />
        <rect x="14" y="55" width="144" height="112" rx="10" fill="#eef4ff" />
        <path d="m16 136 140-48M61 56l8 110m50-110 15 110" stroke="white" strokeWidth="12" />
        <circle
          cx="86"
          cy="112"
          r="39"
          fill="#cbdcff"
          fillOpacity=".45"
          stroke="#8bafed"
          strokeDasharray="4 4"
        />
        <rect x="27" y="70" width="19" height="20" rx="4" fill="#d6e2f6" />
        <rect x="111" y="140" width="17" height="14" rx="4" fill="#d6e2f6" />
        <path
          d="M86 80c-13 0-23 10-23 22 0 17 23 35 23 35s23-18 23-35c0-12-10-22-23-22Z"
          fill="#4d7ee0"
        />
        <path
          d="M76 101h20l-3-7H79zm2 0v12h16v-12m-10 12v-7h5v7"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <circle cx="220" cy="141" r="32" fill="white" stroke="#e5eafa" strokeWidth="6" />
      <text
        x="220"
        y="148"
        textAnchor="middle"
        fill="#293f68"
        fontSize="20"
        fontWeight="900"
        fontStyle="italic"
      >
        VS
      </text>
      <path
        d="M215 35v10m-5-5h10M391 227v10m-5-5h10"
        stroke="#a2b4d6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
