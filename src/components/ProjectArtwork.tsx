import type { ProjectId } from "../types";
export function ProjectArtwork({
  id,
  depth,
}: {
  id: ProjectId;
  depth: number;
}) {
  switch (id) {
    case "forma":
      return (
        <svg
          viewBox="0 0 550 300"
          role="img"
          aria-label="Forma components transform into their token blueprint"
        >
          <g className="experience-layer" style={{ opacity: 1 - depth }}>
            <g fill="none" stroke="#637b4d" strokeWidth="1.1">
              <path d="M90 230v-83a80 80 0 0 1 160 0v83M101 230v-83a69 69 0 0 1 138 0v83M112 230v-83a58 58 0 0 1 116 0v83M123 230v-83a47 47 0 0 1 94 0v83M134 230v-83a36 36 0 0 1 72 0v83M145 230v-83a25 25 0 0 1 50 0v83M156 230v-83a14 14 0 0 1 28 0v83" />
            </g>
            <rect
              x="225"
              y="76"
              width="232"
              height="153"
              rx="5"
              fill="#f2f0e7"
            />
            <text
              x="247"
              y="108"
              fontFamily="DM Sans,sans-serif"
              fontSize="17"
              fill="#282d26"
            >
              A little consistency.
            </text>
            <path d="M247 126h99m-99 10h72" stroke="#a5b297" strokeWidth="3" />
            <rect
              x="247"
              y="161"
              width="97"
              height="30"
              rx="3"
              fill="#597346"
            />
            <text x="260" y="180" fill="#f2f0e7" fontSize="9">
              Build something ↗
            </text>
            <circle cx="405" cy="176" r="27" fill="#d5dfbd" />
            <path d="M392 176h26m-13-13v26" stroke="#597346" />
          </g>
          <g
            className="engineering-layer"
            style={{ opacity: depth }}
            fill="none"
            stroke="#6e815b"
            strokeWidth="1"
          >
            <rect x="44" y="65" width="132" height="62" />
            <rect x="220" y="65" width="132" height="62" />
            <rect x="220" y="168" width="132" height="62" />
            <path
              d="M176 96h44m-22 0v103h22M352 96h55v103h-55"
              strokeDasharray="3 4"
            />
            <g
              fill="#3c5130"
              stroke="none"
              fontFamily="IBM Plex Mono,monospace"
              fontSize="10"
            >
              <text x="58" y="91">
                --color-accent
              </text>
              <text x="58" y="111">
                #597346
              </text>
              <text x="234" y="100">
                button.primary
              </text>
              <text x="234" y="201">
                card.highlight
              </text>
              <text x="44" y="265">
                One semantic token. Every component follows.
              </text>
            </g>
            <circle cx="407" cy="149" r="7" fill="#597346" />
          </g>
        </svg>
      );
    case "orbit":
      return (
        <svg
          viewBox="0 0 550 300"
          role="img"
          aria-label="Orbit workspace transforms into a simple event flow"
        >
          <g className="experience-layer" style={{ opacity: 1 - depth }}>
            <g transform="translate(102 58) rotate(-5 173 90)">
              <rect width="346" height="187" rx="6" fill="#f2f0e7" />
              <path d="M0 30h346M76 30v157" stroke="#dbded1" />
              <circle cx="15" cy="15" r="3" fill="#ef502d" />
              <circle cx="26" cy="15" r="3" fill="#bbc3ae" />
              <text x="15" y="57" fontSize="9" fill="#72776a">
                orbit
              </text>
              <rect
                x="10"
                y="72"
                width="56"
                height="17"
                rx="3"
                fill="#ddd5e9"
              />
              <path d="M18 101h35m-35 15h27" stroke="#b1a7bf" strokeWidth="2" />
              <text
                x="96"
                y="61"
                fontSize="17"
                fontFamily="DM Sans,sans-serif"
                fill="#282d26"
              >
                One thing at a time.
              </text>
              <g fill="#e7e2ed">
                <rect x="96" y="80" width="230" height="24" rx="3" />
                <rect x="96" y="113" width="230" height="24" rx="3" />
                <rect x="96" y="146" width="230" height="24" rx="3" />
              </g>
              <g fill="none" stroke="#9c8eaf">
                <rect x="106" y="87" width="9" height="9" />
                <rect x="106" y="120" width="9" height="9" />
                <rect x="106" y="153" width="9" height="9" />
                <path d="M127 92h133m-133 33h99m-99 33h115" strokeWidth="2" />
              </g>
            </g>
          </g>
          <g
            className="engineering-layer"
            style={{ opacity: depth }}
            stroke="#9583a5"
            fill="none"
          >
            <rect x="42" y="105" width="120" height="69" />
            <rect x="214" y="105" width="120" height="69" />
            <rect x="386" y="105" width="120" height="69" />
            <path d="M162 140h52m120 0h52" />
            <path d="m207 135 7 5-7 5m172-10 7 5-7 5" />
            <g stroke="none" fill="#5a466b" fontSize="10">
              <text x="57" y="134">
                CAPTURE
              </text>
              <text x="57" y="153">
                submit → text
              </text>
              <text x="229" y="134">
                UPDATE
              </text>
              <text x="229" y="153">
                state → React
              </text>
              <text x="401" y="134">
                REFLECT
              </text>
              <text x="401" y="153">
                count → UI
              </text>
              <text x="42" y="236">
                No account. No sync layer. No ceremony.
              </text>
            </g>
          </g>
        </svg>
      );
    case "syntax":
      return (
        <svg
          viewBox="0 0 550 300"
          role="img"
          aria-label="Syntax expression editor transforms into its parser tree"
        >
          <g className="experience-layer" style={{ opacity: 1 - depth }}>
            <g transform="translate(106 61) rotate(5 169 90)">
              <rect width="338" height="181" rx="5" fill="#282d26" />
              <path d="M0 29h338" stroke="#555e4b" />
              <circle cx="15" cy="15" r="3" fill="#f29678" />
              <circle cx="26" cy="15" r="3" fill="#b7c4a4" />
              <text x="238" y="19" fontSize="8" fill="#b7c4a4">
                a small thought
              </text>
              <g fontFamily="IBM Plex Mono,monospace" fontSize="13">
                <text x="23" y="62" fill="#f1af94">
                  &gt; (12 + 8) * 3
                </text>
                <text x="23" y="98" fill="#b7c4a4">
                  {" "}
                  a little logic…
                </text>
                <text x="23" y="144" fill="#f2f0e7" fontSize="29">
                  {" "}
                  60<tspan fill="#ef502d">_</tspan>
                </text>
              </g>
            </g>
          </g>
          <g
            className="engineering-layer"
            style={{ opacity: depth }}
            fill="none"
            stroke="#a6735e"
          >
            <path d="M275 73 190 144m85-71 85 71M190 144l-60 72m60-72 60 72" />
            <circle cx="275" cy="73" r="23" fill="#f2f0e7" />
            <circle cx="190" cy="144" r="23" fill="#f2f0e7" />
            <circle cx="360" cy="144" r="23" fill="#f2f0e7" />
            <circle cx="130" cy="216" r="23" fill="#f2f0e7" />
            <circle cx="250" cy="216" r="23" fill="#f2f0e7" />
            <g fill="#764a37" stroke="none" fontSize="15" textAnchor="middle">
              <text x="275" y="79">
                ×
              </text>
              <text x="190" y="150">
                +
              </text>
              <text x="360" y="150">
                3
              </text>
              <text x="130" y="222">
                12
              </text>
              <text x="250" y="222">
                8
              </text>
            </g>
            <text x="330" y="230" fill="#764a37" stroke="none" fontSize="9">
              PRECEDENCE,
              <tspan x="330" dy="15">
                NOT GUESSWORK.
              </tspan>
            </text>
          </g>
        </svg>
      );
  }
}
