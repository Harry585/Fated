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
            Fated helps ANU students make one thoughtful introduction at a time, using values,
            lifestyle, and relationship intent instead of an endless queue of profiles.
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
            Sign up with an ANU email, answer a short compatibility set, then join the next scheduled round.
          </p>
        </div>
        <div className="step-row">
          <div className="step-card">
            <span className="step-emoji">1</span>
            <div>
              <h3>Verify</h3>
              <p className="small">
                Confirm your ANU email with Supabase Auth and share the basic details needed for eligibility.
              </p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-emoji">2</span>
            <div>
              <h3>Answer questions</h3>
              <p className="small">
                Choose where you sit on values, lifestyle, habits, and relationship intent.
              </p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-emoji">3</span>
            <div>
              <h3>Get your match</h3>
              <p className="small">
                Fated scores compatible pairs and reveals one introduction when the round runs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading narrow">
          <span className="eyebrow">Sample match</span>
          <h2>This is what a Friday match looks like.</h2>
          <p className="hint">Real names replaced. Everything else is exactly how it works.</p>
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
              <span className="match-bullet-check">✓</span>
              Both value slow, intentional communication over fast texting
            </div>
            <div className="match-bullet">
              <span className="match-bullet-check">✓</span>
              Similar outlook on weekends — prefer low-key plans over big social events
            </div>
            <div className="match-bullet">
              <span className="match-bullet-check">✓</span>
              Aligned on long-term relationship goals and timeline
            </div>
            <div className="match-bullet">
              <span className="match-bullet-check">✓</span>
              Complementary energy levels and need for personal space
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Inside a round</span>
          <h2>The app filters, scores, and pairs the pool.</h2>
          <p className="hint">
            Each round starts with eligibility checks, then ranks compatible pairs using weighted answers
            and relationship intent. The highest scoring non-overlapping pairs are revealed.
          </p>
        </div>
        <div className="feature-grid">
          <Feature
            number="1"
            title="Eligibility"
            text="Only active, verified ANU students with mutual gender interest enter the candidate pool."
          />
          <Feature
            number="2"
            title="Compatibility"
            text="Question answers are compared with weighted Euclidean distance, so important mismatches count more."
          />
          <Feature
            number="3"
            title="Intent"
            text="Relationship intent is part of the score, with pure long-term and pure short-term treated as incompatible."
          />
          <Feature
            number="4"
            title="Reveal"
            text="The round chooses the strongest available pairs so each student receives at most one match."
          />
        </div>
      </section>

      <section className="cta-band">
        <div>
          <span className="eyebrow">Ready for the next round?</span>
          <h2>Someone is waiting to watch the sunset too.</h2>
        </div>
        <Link className="button button-large" href="/register">
          Start registration
        </Link>
      </section>
      </div>
    </main>
  );
}

function Feature({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="feature-card">
      <span className="step-number">{number}</span>
      <div>
        <h3>{title}</h3>
        <p className="small">{text}</p>
      </div>
    </div>
  );
}
