import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link className="brand" href="/">
          ANU Match
        </Link>
        <div className="nav-links">
          <a className="nav-link" href="#how-it-works">
            How it works
          </a>
          <Link className="nav-link" href="/register">
            Register
          </Link>
        </div>
      </nav>

      <section className="hero hero-large">
        <div className="hero-copy hero-panel">
          <span className="eyebrow">🍂 Dating without the swipe fatigue</span>
          <h1>Find someone worth watching the sunset with.</h1>
          <p className="lede">
            ANU Match is for students who want something real — no judging strangers on a swipe card,
            no overthinking every message, no evenings lost to an endless scroll.
          </p>
          <div className="hero-actions">
            <Link className="button button-large" href="/register">
              Register for the next round
            </Link>
            <a className="button secondary" href="#how-it-works">
              How it works
            </a>
          </div>
          <div className="stat-row">
            <div>
              <strong>🍃 No public judging</strong>
              <span>Your profile is not a swipe card</span>
            </div>
            <div>
              <strong>🌅 Less emotional labour</strong>
              <span>No endless texting strategy</span>
            </div>
            <div>
              <strong>🌏 Authentic connection</strong>
              <span>Matched on values and fit</span>
            </div>
          </div>
        </div>

        <div className="phone-card">
          <div className="phone-header">
            <span />
            <span />
          </div>
          <div className="match-preview">
            <span className="eyebrow">Friday match</span>
            <h2>One thoughtful intro</h2>
            <p>No public likes, no swipe queue, no guessing whether to send the perfect message.</p>
            <div className="avatar-pair">
              <div>M</div>
              <div>N</div>
            </div>
          </div>
          <div className="mini-feed">
            <div />
            <div />
            <div />
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="section-heading narrow">
          <span className="eyebrow">🌿 Simple by design</span>
          <h2>Three steps to one meaningful match.</h2>
          <p className="hint">No swiping. No cold openers. No performance.</p>
        </div>
        <div className="step-row">
          <div className="step-card">
            <span className="step-emoji">📋</span>
            <div>
              <h3>Register</h3>
              <p className="small">
                Verify your ANU email and share a few basics. No profile photo, no public card.
              </p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-emoji">💬</span>
            <div>
              <h3>Answer questions</h3>
              <p className="small">
                A short set of values and lifestyle questions gives us the matching signal we need.
              </p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-emoji">💌</span>
            <div>
              <h3>Get your match</h3>
              <p className="small">
                Every Friday, one thoughtful introduction arrives. You both get the same message.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading narrow">
          <span className="eyebrow">🍁 Sample match</span>
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
          <span className="eyebrow">Why it is different</span>
          <h2>Built around student wellbeing, not attention loops.</h2>
          <p className="hint">
            Traditional dating apps often turn dating into evaluation, performance, and constant
            notifications. This makes the process slower, safer, and more intentional.
          </p>
        </div>
        <div className="feature-grid">
          <Feature
            number="1"
            title="No anonymous judgement"
            text="Students are not shown as endless cards for strangers to approve or reject."
          />
          <Feature
            number="2"
            title="No swipe exhaustion"
            text="A scheduled round replaces the habit of checking, comparing, and scrolling."
          />
          <Feature
            number="3"
            title="Less texting pressure"
            text="The app creates a meaningful intro instead of pushing people into performative small talk."
          />
          <Feature
            number="4"
            title="More authentic fit"
            text="Matches are based on values, lifestyle, and mutual interest rather than snap decisions."
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
