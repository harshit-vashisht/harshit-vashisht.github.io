export function SiteHeader() {
  return (
    <header className="header">
      <a className="brand" href="#" aria-label="Harshit home">
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path
            d="M7 4v28M29 4v28M7 18h22"
            stroke="currentColor"
            strokeWidth="5"
          />
          <path d="m14 11 8 14" stroke="var(--orange)" strokeWidth="5" />
        </svg>
        harshit<small>*</small>
      </a>
      <span className="header-note mono">
        Part developer. Part unfinished thought.
      </span>
      <nav className="nav" aria-label="Main navigation">
        <a href="#work">
          The work <sup>03</sup>
        </a>
        <a className="nav-thinking" href="#thinking">
          The thinking
        </a>
        <a className="nav-play" href="#playground">
          The play
        </a>
        <a className="contact-nav" href="#contact">
          Say hello <span>↗</span>
        </a>
      </nav>
    </header>
  );
}
