export function DiscardDrawer({ removed }: { removed: boolean }) {
  return (
    <details className="drawer" id="discard-drawer">
      <summary>
        <span className="drawer-handle" aria-hidden="true" />
        <div>
          <h3>The things that didn’t make it.</h3>
          <p>A small drawer of decisions. Nothing in here was wasted.</p>
        </div>
        <span className="drawer-plus" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="drawer-content">
        <article className="discarded">
          <span className="mono">01 / From this workbench</span>
          <h4>The extra ring.</h4>
          <p id="discard-ring-copy">
            {removed
              ? "You left it out. The remaining parts work without it. A reminder: effort spent is not a reason to keep something."
              : "Looks important. Adds friction. Pull the thread above and decide whether it belongs."}
          </p>
        </article>
        <article className="discarded">
          <span className="mono">02 / From this portfolio</span>
          <h4>The project-card grid.</h4>
          <p>
            The first version showed three neat cards. This version gives each
            idea enough room to explain a decision.
          </p>
        </article>
        <article className="discarded">
          <span className="mono">03 / Deliberately left out</span>
          <h4>A mandatory entrance.</h4>
          <p>
            You don’t have to solve the mechanism to read the work. Curiosity is
            an invitation, not a loading screen.
          </p>
        </article>
      </div>
    </details>
  );
}
