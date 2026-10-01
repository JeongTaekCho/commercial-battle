/** Original, decorative artwork for the store workspace. */
export default function NeighborhoodIllustration({ comparison = false }: { comparison?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 440 260" fill="none" className="h-auto w-full">
      <ellipse cx="230" cy="230" rx="190" ry="19" fill="#e6e1d5" opacity=".45" />
      <circle cx="253" cy="122" r="100" fill={comparison ? "#e0eadf" : "#f6e4d2"} />
      <circle cx="355" cy="56" r="17" fill="#ecd39b" opacity=".65" />
      <path d="M35 208h365M85 244h256" stroke="#d9d8cb" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M76 186V97h58v89M85 111h12m13 0h12m-37 17h12m13 0h12m-37 17h12"
        stroke="#d7d8cb"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M330 184V92h43v92m-32-77h20m-20 16h20m-20 16h20"
        stroke="#d7d8cb"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g transform="translate(108 69)">
        <rect x="7" y="30" width="140" height="128" rx="5" fill="#e9dac6" />
        <rect
          x="0"
          y="25"
          width="140"
          height="128"
          rx="5"
          fill="#fffdf5"
          stroke="#ddcfbb"
          strokeWidth="1.5"
        />
        <rect
          x="25"
          y="7"
          width="90"
          height="28"
          rx="5"
          fill="#fffdf5"
          stroke="#ddcfbb"
          strokeWidth="1.5"
        />
        <path d="M48 21h44" stroke="#a98163" strokeWidth="4" strokeLinecap="round" />
        <path d="M-9 63 3 37h134l12 26" fill="#f1d2bb" />
        <path d="m19 37-6 26h23l2-26m23 0v26h23l-3-26m24 0 6 26h24l-10-26" fill="#c78162" />
        <path
          d="M-9 63v6a11 11 0 0 0 22 0v-6m23 0v6a12 12 0 0 0 25 0v-6m23 0v6a13 13 0 0 0 27 0v-6m24 0v6a7 7 0 0 0 14 0v-6"
          fill="#f1d2bb"
        />
        <path
          d="M13 63v6a12 12 0 0 0 23 0v-6m25 0v6a12 12 0 0 0 23 0v-6m27 0v6a12 12 0 0 0 24 0v-6"
          fill="#c78162"
        />
        <rect
          x="15"
          y="87"
          width="62"
          height="48"
          rx="3"
          fill="#e6eeea"
          stroke="#b1bfb4"
          strokeWidth="2"
        />
        <path d="M46 88v47m-30-15h60m-51-19 11-7m19 17 12-8" stroke="#b1bfb4" strokeWidth="2" />
        <rect
          x="90"
          y="87"
          width="34"
          height="66"
          rx="3"
          fill="#d3ded4"
          stroke="#a4b5a5"
          strokeWidth="2"
        />
        <path d="M117 118v7" stroke="#7b8e7e" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M-5 156h150" stroke="#c6b49d" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="translate(269 119)">
        <rect x="5" y="24" width="77" height="79" rx="4" fill="#b8c7b7" />
        <rect
          y="20"
          width="77"
          height="79"
          rx="4"
          fill="#f9fbf4"
          stroke="#b6c5b2"
          strokeWidth="1.5"
        />
        <path d="M-7 40 3 15h71l10 25" fill="#8ca68c" />
        <path d="m17 15-4 25h15l1-25m15 0 1 25h15l-5-25" fill="#dce5d3" />
        <path
          d="M-7 40v5a8 8 0 0 0 15 0 8 8 0 0 0 15 0 8 8 0 0 0 15 0 8 8 0 0 0 15 0 8 8 0 0 0 15 0 8 8 0 0 0 16 0v-5"
          fill="#8ca68c"
        />
        <rect
          x="12"
          y="58"
          width="27"
          height="27"
          rx="2"
          fill="#e1e9dd"
          stroke="#a9b9a6"
          strokeWidth="1.5"
        />
        <rect
          x="48"
          y="58"
          width="18"
          height="40"
          rx="2"
          fill="#e1e9dd"
          stroke="#a9b9a6"
          strokeWidth="1.5"
        />
        <path d="M-4 101h88" stroke="#a6b69f" strokeWidth="4" strokeLinecap="round" />
      </g>
      <path
        d="M67 215v-41m0 24-12-12m12 5 12-13"
        stroke="#85967b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="57" cy="176" rx="11" ry="17" transform="rotate(-30 57 176)" fill="#b8c7a4" />
      <ellipse cx="78" cy="167" rx="11" ry="19" transform="rotate(24 78 167)" fill="#98af8f" />
      <path d="M54 208h27l-4 22H58z" fill="#d7b89b" />
      <path d="M365 211v-28" stroke="#85967b" strokeWidth="3" />
      <circle cx="365" cy="180" r="18" fill="#b0c3a2" />
      <circle cx="373" cy="185" r="12" fill="#98af8f" />
      <path d="M354 211h23l-3 17h-17z" fill="#e1c9aa" />
      <g transform={comparison ? "translate(260 39)" : "translate(252 56)"}>
        <path
          d="M20 0C9 0 0 8 0 19c0 15 20 31 20 31s20-16 20-31C40 8 31 0 20 0Z"
          fill={comparison ? "#678b73" : "#c78162"}
        />
        <circle cx="20" cy="19" r="7" fill="#fffdf7" />
      </g>
      {comparison && (
        <path
          d="M178 57c29-38 69-35 94-19"
          stroke="#91aa8f"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      )}
      <path
        d="M100 57v10m-5-5h10m268 41v8m-4-4h8"
        stroke="#c9b391"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
