import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell landing-shell">
      <section className="landing-hero">
        <nav className="top-nav landing-nav">
          <Link className="brand" href="/">
            Fated
          </Link>
          <div className="nav-links">
            <a className="nav-link" href="#how-it-works">
              How it works
            </a>
            <Link className="nav-link" href="/about">
              About
            </Link>
            <Link className="nav-link" href="/login">
              Login
            </Link>
            <Link className="nav-link" href="/register">
              Register
            </Link>
          </div>
        </nav>

        <div className="landing-hero-copy">
          <h1>date without swiping</h1>
          <p className="lede">
            Fated helps ANU students make one thoughtful introduction at a time, matching you based on 
            your values and personality with someone you can deeply connect with.
          </p>
          <div className="hero-actions">
            <Link className="button button-large" href="/register">
              Register
            </Link>
            <Link className="button secondary landing-secondary" href="/login">
              Login
            </Link>
            <a className="button secondary landing-secondary" href="#how-it-works">
              See how it works
            </a>
          </div>
        </div>
      </section>

      <div className="landing-content">
      <section className="section" id="how-it-works">
        <div className="section-heading narrow">
          <span className="eyebrow">How it works</span>
          <h2>Three steps to one meaningful match.</h2>
          <p className="hint">
            No swiping, no endless feed. Just a thoughtful introduction when you&rsquo;re ready.
          </p>
        </div>
        <div className="step-row">
          <div className="step-card">
            <span className="step-number-large">1</span>
            <div>
              <h3>Tell us about yourself</h3>
              <p className="small">
                Share a few values, lifestyle preferences, and what you&rsquo;re looking for.
              </p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-number-large">2</span>
            <div>
              <h3>Opt in weekly</h3>
              <p className="small">
                Each week, choose whether you&rsquo;re in for the next round &mdash; no pressure either way.
              </p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-number-large">3</span>
            <div>
              <h3>Go on a date!</h3>
              <p className="small">
                We&rsquo;ll introduce you to one compatible match. The rest is up to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading narrow">
          <span className="eyebrow">Sample match</span>
          <h2>This is what a Friday match looks like.</h2>
        </div>
        <div className="match-sample card">
          <div className="match-sample-header">
            <div className="avatar-pair">
              <div>A</div>
              <div>J</div>
            </div>
            <div>
              <p className="match-names">Alex &amp; Jordan</p>
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                87% compatibility
              </span>
            </div>
            <div className="score" style={{ marginLeft: "auto" }}>
              87%
            </div>
          </div>
          <div className="match-sample-bullets">
            <div className="match-bullet">
              <span className="match-bullet-check">&#10003;</span>
              Both value slow, intentional communication over fast texting
            </div>
            <div className="match-bullet">
              <span className="match-bullet-check">&#10003;</span>
              Similar outlook on weekends &mdash; prefer low-key plans over big social events
            </div>
            <div className="match-bullet">
              <span className="match-bullet-check">&#10003;</span>
              Aligned on long-term relationship goals and timeline
            </div>
            <div className="match-bullet">
              <span className="match-bullet-check">&#10003;</span>
              Complementary energy levels and need for personal space
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div>
          <span className="eyebrow">Ready for the next round?</span>
          <h2>Find the one you're fated for.</h2>
        </div>
        <Link className="button button-large" href="/register">
          Start registration
        </Link>
      </section>
      </div>
    </main>
  );
}
