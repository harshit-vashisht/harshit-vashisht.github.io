import { trailLabels } from "../data/projects";
import type { TrailKey } from "../types";
export function Contact({
  onOpen,
  visited,
}: {
  onOpen: () => void;
  visited: TrailKey[];
}) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <svg
        className="contact-thread"
        viewBox="0 0 1200 75"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 37H350c120 0 110-28 160-28s80 54 125 54 45-26 95-26h462"
          stroke="#ef502d"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="1194" cy="37" r="4" fill="#ef502d" />
      </svg>
      <div className="contact-top">
        <span className="section-kicker mono">
          <b>04 /</b> The thread doesn’t have to end here
        </span>
        <span className="mono">A new problem is a good beginning.</span>
      </div>
      <div className="contact-heading">
        <h2 id="contact-title">
          Your turn.
          <br />
          Give me a <span>what if.</span>
        </h2>
        <button
          className="contact-arrow"
          type="button"
          data-contact
          onClick={onOpen}
          aria-label="Start a project conversation"
        >
          ↗
        </button>
      </div>
      <div className="contact-bottom">
        <p>
          An interface that should feel different. A system that could be
          simpler. Or an idea you can’t quite leave alone.
        </p>
        <button type="button" data-contact onClick={onOpen}>
          Start a conversation ↗
        </button>
      </div>
      <div className="visit-note mono" id="visit-note">
        {visited.length
          ? "Your thread: " +
            visited.map((key) => trailLabels[key]).join(" → ") +
            ". Kept only for this visit."
          : "No two curious people take quite the same route."}
      </div>
    </section>
  );
}
