export function Thinking() {
  return (
    <section
      className="thinking"
      id="thinking"
      aria-labelledby="thinking-title"
    >
      <div>
        <div className="section-kicker mono">
          <b>02 /</b> The way through
        </div>
        <h2 id="thinking-title">
          Less “look what I made.”
          <br />
          More “here’s why.”
        </h2>
      </div>
      <div className="thinking-right">
        <p>
          I like the moment a complicated thing becomes simple.{" "}
          <span>
            Not because the hard parts disappeared. Because someone finally put
            them in the right order.
          </span>
        </p>
        <div className="principle-row">
          <h3>Make the thinking visible.</h3>
          <p>
            The trade-off is usually more interesting than the polished
            screenshot.
          </p>
        </div>
        <div className="principle-row">
          <h3>Be willing to subtract.</h3>
          <p>
            A clever component isn’t a useful component just because it took a
            long time to build.
          </p>
        </div>
        <div className="principle-row">
          <h3>Keep a little room for play.</h3>
          <p>
            Not every experiment needs to become a product. Some just make the
            next idea better.
          </p>
        </div>
      </div>
    </section>
  );
}
