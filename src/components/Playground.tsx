import { motionFrame } from "../lib/motion";
const initial = motionFrame(0, { pull: 0, removed: false, mode: 0 });
import type { GeometryMode, MotionControls } from "../types";
export function Playground({
  mode,
  onMode,
  motion,
}: {
  mode: GeometryMode;
  onMode: (value: GeometryMode) => void;
  motion: MotionControls;
}) {
  return (
    <section
      className="playground"
      id="playground"
      aria-labelledby="playground-title"
    >
      <div>
        <div className="section-kicker mono">
          <b>03 /</b> No brief. Just a question.
        </div>
        <h2 id="playground-title">
          What else could
          <br />
          this become?
        </h2>
        <p>
          The same geometry. Three different instincts. Turn it, open it, stop
          it halfway. Sometimes that’s where the next idea starts.
        </p>
        <div className="lab-controls">
          {(["01 · Fold", "02 · Bloom", "03 · Orbit"] as const).map(
            (label, i) => (
              <button
                key={label}
                className="lab-button"
                data-mode={i}
                aria-pressed={mode === i}
                onClick={() => onMode(i as GeometryMode)}
              >
                {label}
              </button>
            ),
          )}
        </div>
      </div>
      <div className="lab-art">
        <svg
          viewBox="0 0 500 300"
          role="img"
          aria-label="A live geometry study"
        >
          <g fill="none" stroke="#606c51" strokeWidth=".6">
            <circle cx="250" cy="150" r="125" />
            <path d="M100 150h300M250 0v300" strokeDasharray="2 5" />
          </g>
          <g id="lab-shapes" transform="translate(250 150)">
            {Array.from({ length: 18 }, (_, i) => (
              <ellipse
                key={i}
                fill="none"
                {...initial.ellipses[i]}
                strokeWidth="1.2"
              />
            ))}
          </g>
        </svg>
      </div>
      <div className="lab-bottom">
        <label htmlFor="timeline" className="mono">
          Follow the thought
        </label>
        <input
          id="timeline"
          type="range"
          min="0"
          max="12"
          defaultValue="0"
          step="0.01"
          aria-label="Animation time in seconds"
          onChange={(event) => motion.seek(Number(event.target.value))}
        />
        <output id="time-output" htmlFor="timeline" className="mono" />
        <button id="lab-play" type="button" onClick={motion.toggle}>
          {motion.paused ? "Play ↗" : "Pause ↗"}
        </button>
      </div>
    </section>
  );
}
