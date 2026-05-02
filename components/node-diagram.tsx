"use client";

const W = 290;
const H = 360;
const CX = 145;
const CY = 44;
const NODE_Y = 278;
const NODE_R = 9;
const CENTER_R = 16;

const specs = [
  { label: ["AI", "Curriculum"], x: 29 },
  { label: ["Founder", "Ops"], x: 87 },
  { label: ["Local", "AI"], x: 145 },
  { label: ["Data", "Eng."], x: 203 },
  { label: ["Cloud", "Infra"], x: 261 },
];

const durations = [2.3, 1.9, 2.1, 2.4, 2.0];
const blinkDelays = [0, 0.6, 1.2, 1.8, 2.4];

function pathD(x: number) {
  return `M ${CX},${CY} C ${CX},${CY + 80} ${x},${NODE_Y - 80} ${x},${NODE_Y}`;
}

export function NodeDiagram() {
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <filter id="nd-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {specs.map((s, i) => (
          <path key={i} id={`nd-p${i}`} d={pathD(s.x)} />
        ))}
      </defs>

      {/* Dashed branch lines */}
      {specs.map((s, i) => (
        <path
          key={i}
          d={pathD(s.x)}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="3 7"
        />
      ))}

      {/* Flowing particles — 3 per branch, staggered */}
      {specs.map((s, i) =>
        [0, 1, 2].map((k) => {
          const begin = `${((durations[i] / 3) * k).toFixed(2)}s`;
          return (
            <circle key={`${i}-${k}`} r="2.5" fill="#A5E446">
              <animateMotion
                dur={`${durations[i]}s`}
                repeatCount="indefinite"
                begin={begin}
              >
                <mpath href={`#nd-p${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.85;0.85;0"
                keyTimes="0;0.08;0.88;1"
                dur={`${durations[i]}s`}
                repeatCount="indefinite"
                begin={begin}
              />
            </circle>
          );
        })
      )}

      {/* Specialty nodes */}
      {specs.map((s, i) => (
        <g key={i}>
          <circle
            cx={s.x}
            cy={NODE_Y}
            r={NODE_R}
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
          >
            <animate
              attributeName="opacity"
              values="1;0.35;1"
              dur="3.5s"
              repeatCount="indefinite"
              begin={`${blinkDelays[i]}s`}
            />
          </circle>
          <text
            x={s.x}
            y={NODE_Y + NODE_R + 13}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="8"
            fontFamily="'Departure Mono','SF Mono','Fira Code',monospace"
            letterSpacing="0.06em"
          >
            {s.label[0]}
          </text>
          <text
            x={s.x}
            y={NODE_Y + NODE_R + 23}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="8"
            fontFamily="'Departure Mono','SF Mono','Fira Code',monospace"
            letterSpacing="0.06em"
          >
            {s.label[1]}
          </text>
        </g>
      ))}

      {/* Center node — pulsing ring */}
      <circle
        cx={CX}
        cy={CY}
        r={CENTER_R}
        fill="none"
        stroke="#A5E446"
        strokeWidth="1"
      >
        <animate
          attributeName="r"
          values={`${CENTER_R + 3};${CENTER_R + 12}`}
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          values="0.45;0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Center node — solid */}
      <circle
        cx={CX}
        cy={CY}
        r={CENTER_R}
        fill="#A5E446"
        filter="url(#nd-glow)"
      />

      {/* "VJ" initials inside center node */}
      <text
        x={CX}
        y={CY + 3.5}
        textAnchor="middle"
        fill="#000"
        fontSize="9"
        fontFamily="'Departure Mono','SF Mono','Fira Code',monospace"
        fontWeight="700"
        letterSpacing="0.04em"
      >
        VJ
      </text>
    </svg>
  );
}
