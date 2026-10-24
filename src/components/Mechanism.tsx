import { motionFrame } from "../lib/motion";
const initial = motionFrame(0, { pull: 0, removed: false, mode: 0 });
export function Mechanism() {
  return (
    <svg
      id="stage"
      className="scene"
      viewBox="0 0 1200 480"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="mechanism-title mechanism-description"
    >
      <title id="mechanism-title">An unfinished mechanism on a workbench</title>
      <desc id="mechanism-description">
        Pull the orange thread to separate the mechanism into its components.
        Remove the unnecessary part to let the remaining wheels turn. Equivalent
        button and slider controls are provided.
      </desc>
      <defs>
        <pattern
          id="bench-dots"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r=".65" fill="#c9cebd" />
        </pattern>
        <pattern
          id="hatch"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <path d="M0 0v5" stroke="#b7c0a7" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="250" y="56" width="660" height="350" fill="url(#bench-dots)" />
      <g fill="none" stroke="#bdc4b1" strokeWidth=".7">
        <path d="M170 244h880M600 25v412" strokeDasharray="3 6" />
        <ellipse cx="600" cy="244" rx="300" ry="116" />
        <circle cx="600" cy="244" r="177" strokeDasharray="2 6" />
        <path d="M270 427h660m-660-5v10m660-10v10" />
        <path d="M324 63h10m-5-5v10M912 91h10m-5-5v10M233 341h10m-5-5v10" />
      </g>
      <g fill="#858c7b" fontSize="7">
        <text x="591" y="444">
          FIG. 01
        </text>
        <text x="180" y="236">
          INPUT
        </text>
        <text x="1012" y="236">
          OUTPUT
        </text>
        <text x="615" y="34">
          Y
        </text>
      </g>
      <path
        id="drive-shaft"
        d="M430 244H770"
        fill="none"
        stroke="#adb69c"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        id="drive-shaft-highlight"
        d="M430 241H770"
        fill="none"
        stroke="#d8dfcc"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g id="input-wheel" transform={initial.input}>
        <circle r="110" fill="#d5dfbd" stroke="#8c9b77" strokeWidth="1" />
        <circle r="91" fill="none" stroke="#7e9068" strokeWidth=".7" />
        <circle r="76" fill="url(#hatch)" stroke="#8c9b77" strokeWidth=".7" />
        <g id="input-spokes">
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 30})`}>
              <path d="M-5-98h10v38H-5z" fill="#879873" />
            </g>
          ))}
        </g>
        <circle r="29" fill="#f2f0e7" stroke="#7e9068" strokeWidth="1" />
        <circle r="12" fill="#83936c" />
        <circle r="5" fill="#d5dfbd" />
      </g>
      <g id="core-wheel" transform={initial.core}>
        <circle r="124" fill="#282d26" />
        <circle r="112" fill="none" stroke="#657058" strokeWidth=".7" />
        <g id="core-spokes">
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 30})`}>
              <path
                d="M-6-105h12v47H-6z"
                fill={i % 3 === 0 ? "#d5dfbd" : "#677658"}
              />
              <circle cx="0" cy="-98" r="2" fill="#f2f0e7" />
            </g>
          ))}
        </g>
        <circle r="44" fill="#343d2e" stroke="#7e896f" strokeWidth=".8" />
        <circle r="29" fill="#ef502d" />
        <circle r="16" fill="#f2f0e7" />
        <circle r="6" fill="#282d26" />
      </g>
      <g id="extra-wheel" transform={initial.extra}>
        <circle r="135" fill="none" stroke="#ef502d" strokeWidth="19" />
        <circle r="145" fill="none" stroke="#ba482e" strokeWidth=".8" />
        <g id="extra-spokes">
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 30 + 15})`}>
              <path d="M-3-126h6v41H-3z" fill="#ef502d" />
            </g>
          ))}
        </g>
        <circle r="81" fill="none" stroke="#ef502d" strokeWidth="8" />
        <circle r="67" fill="none" stroke="#ef502d" strokeWidth="1" />
        <path
          d="M-21-154h42v24h-42z"
          fill="#ef502d"
          stroke="#ba482e"
          strokeWidth=".8"
        />
        <path d="M-10-143h20" stroke="#f2f0e7" strokeWidth="2" />
      </g>
      <g
        id="component-labels"
        opacity="0"
        fill="#727b66"
        fontSize="8"
        textAnchor="middle"
      >
        <text x="380" y="399">
          01 / INTENT
        </text>
        <text x="600" y="399">
          02 / FUNCTION
        </text>
        <text x="820" y="399" fill="#d04b2d">
          03 / MORE THAN WE NEED
        </text>
      </g>
      <path
        id="loose-thread"
        d="M600 244 C720 244 700 375 810 363 S900 324 970 332"
        fill="none"
        stroke="#ef502d"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <g id="output-light" transform="translate(1036 244)">
        <circle r="9" fill="#f2f0e7" stroke="#a6ae98" />
        <circle id="output-dot" r="4" fill="#a6ae98" />
      </g>
      <g id="removed-label" opacity="0">
        <path
          d="M940 124h52l18-18"
          fill="none"
          stroke="#9ba88a"
          strokeWidth=".8"
        />
        <text x="943" y="141" fontSize="7" fill="#727b66">
          SET ASIDE. NOT WASTED.
        </text>
      </g>
    </svg>
  );
}
