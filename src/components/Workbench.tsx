import { useRef } from "react";
import { Mechanism } from "./Mechanism";
import type { MotionControls, TrailKey } from "../types";
interface Props {
  pull: number;
  removed: boolean;
  visited: TrailKey[];
  onPull: (value: number) => void;
  onRemove: () => void;
  onReset: () => void;
  motion: MotionControls;
}
export function Workbench({
  pull,
  removed,
  visited,
  onPull,
  onRemove,
  onReset,
  motion,
}: Props) {
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(
      null,
    ),
    suppressClick = useRef(false),
    bench = useRef<HTMLDivElement>(null),
    reset = useRef<HTMLButtonElement>(null);
  const open = pull >= 0.9,
    step = removed ? 3 : open ? 2 : 1;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-meta mono">
        <span>
          <i className="dot" /> A personal workbench, open for inspection
        </span>
        <span>Independent experiments · Vol. 02</span>
      </div>
      <div className="hero-intro">
        <h1 id="hero-title">
          A mind, under
          <br />
          <em>construction.</em>
        </h1>
        <div className="intro-note">
          <p>
            I’m Harshit, a developer exploring React, TypeScript, and motion. I
            build interfaces, systems, and the occasional unnecessary thing.{" "}
            <strong>Here’s how I figure out what stays.</strong>
          </p>
          <a className="text-link" href="#work">
            Just here for the projects? This way ↘
          </a>
        </div>
      </div>
      <div className="workbench" id="workbench" ref={bench}>
        <div className="bench-top">
          <span className="mono">Experiment 001 / Subtraction</span>
          <h2 id="bench-title">
            {removed
              ? "Less, but working."
              : open
                ? "Beautiful. Also unnecessary."
                : "This doesn’t work yet."}
          </h2>
          <p id="bench-description">
            {removed
              ? "The idea didn’t need another part. It needed one less."
              : open
                ? "The orange ring adds friction, not function. What happens if you leave it out?"
                : "One part is getting in the way. Pull the loose thread. Take a look inside."}
          </p>
        </div>
        <Mechanism />
        <button
          className="grip"
          id="thread-grip"
          type="button"
          aria-label={
            open
              ? "Thread unfolded; close the mechanism"
              : "Pull the thread to open the mechanism"
          }
          title={open ? "Click to fold back" : "Drag right, or click to open"}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            drag.current = { x: event.clientX, start: pull, moved: false };
            suppressClick.current = false;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const current = drag.current;
            if (!current) return;
            const delta = event.clientX - current.x;
            if (Math.abs(delta) > 4) current.moved = true;
            if (current.moved)
              onPull(
                current.start +
                  delta /
                    Math.max(65, (bench.current?.clientWidth ?? 600) * 0.11),
              );
          }}
          onPointerUp={(event) => {
            if (!drag.current) return;
            suppressClick.current = drag.current.moved;
            drag.current = null;
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            drag.current = null;
            suppressClick.current = false;
          }}
          onClick={() => {
            if (suppressClick.current) {
              suppressClick.current = false;
              return;
            }
            onPull(open ? 0 : 1);
          }}
        >
          ↗
        </button>
        <span className="grip-label mono" id="grip-label">
          {removed
            ? "A little less. A little better."
            : open
              ? "Now look at what stays."
              : "A loose thread. Pull it →"}
        </span>
        <button
          className="remove-part"
          id="remove-part"
          type="button"
          hidden={!open || removed}
          onClick={() => {
            onRemove();
            reset.current?.focus({ preventScroll: true });
          }}
        >
          Remove the extra part ↗
        </button>
        <span className="bench-caption mono">
          No black box.
          <br />
          Just a few decisions, made visible.
        </span>
        <div className="native-pull">
          <label className="mono" htmlFor="pull-range">
            Pull
          </label>
          <input
            id="pull-range"
            type="range"
            min="0"
            max="100"
            value={pull * 100}
            onChange={(event) => onPull(Number(event.target.value) / 100)}
            aria-label="Pull thread to unfold mechanism"
          />
        </div>
      </div>
      <div className="bench-controls">
        <span className="step-counter mono" id="step-counter">
          0{step} / 03
        </span>
        <div className="progress-rail" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <i key={i} className={i < step ? "active" : ""} />
          ))}
        </div>
        <p id="bench-status" role="status" aria-live="polite">
          {removed
            ? "The clever part was the problem. A useful reminder to subtract."
            : open
              ? "Three parts. Only two are doing useful work."
              : "A small experiment in knowing what to leave out."}
        </p>
        <a
          className="bench-follow"
          id="follow-thread"
          href="#work"
          hidden={!removed}
        >
          Follow the thought ↘
        </a>
        <button
          id="motion-toggle"
          className="bench-pause"
          type="button"
          aria-label={motion.paused ? "Play motion" : "Pause motion"}
          aria-pressed={motion.paused}
          onClick={motion.toggle}
        >
          {motion.paused ? "▶" : "Ⅱ"}
        </button>
        <button
          ref={reset}
          id="reset-bench"
          className="reset"
          type="button"
          onClick={onReset}
        >
          Start again ↺
        </button>
      </div>
      <div className="trail">
        <span className="mono">
          Your visit leaves a little trace.
          <br />
          Only here. Only for now.
        </span>
        <div className="trail-markers" aria-label="Your exploration trail">
          {(["bench", "forma", "orbit", "syntax"] as const).map((key) => (
            <span
              key={key}
              className={`mono${visited.includes(key) ? " visited" : ""}`}
              data-trail={key}
            >
              <i />
              {key === "bench"
                ? "Experiment"
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
