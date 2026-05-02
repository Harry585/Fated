import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link className="brand" href="/">
          ANU Match
        </Link>
        <Link className="nav-link" href="/register">
          Register
        </Link>
      </nav>

      <section className="hero hero-large">
        <div className="hero-copy hero-panel">
          <span className="eyebrow">Dating without the swipe fatigue</span>
          <h1>Meet people without performing for strangers.</h1>
          <p className="lede">
            ANU Match is for students who want authentic connection without being judged by anonymous
            strangers, overthinking every text, or spending evenings swiping through profiles.
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
              <strong>No public judging</strong>
              <span>Your profile is not a swipe card</span>
            </div>
            <div>
              <strong>Less emotional labour</strong>
              <span>No endless texting strategy</span>
            </div>
            <div>
              <strong>Authentic connection</strong>
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
        <div className="section-heading">
          <span className="eyebrow">Why it is different</span>
          <h2>Built around student wellbeing, not attention loops.</h2>
          <p className="hint">
            Traditional dating apps often turn dating into evaluation, performance, and constant
            notifications. This MVP makes the process slower, safer, and more intentional.
          </p>
        </div>
        <div className="feature-grid">
          <Feature number="1" title="No anonymous judgement" text="Students are not shown as endless cards for strangers to approve or reject." />
          <Feature number="2" title="No swipe exhaustion" text="A scheduled round replaces the habit of checking, comparing, and scrolling." />
          <Feature number="3" title="Less texting pressure" text="The app creates a meaningful intro instead of pushing people into performative small talk." />
          <Feature number="4" title="More authentic fit" text="Matches are based on values, lifestyle, and mutual interest rather than snap decisions." />
        </div>
      </section>

      <section className="cta-band">
        <div>
          <span className="eyebrow">Ready for the next round?</span>
          <h2>Try a calmer way to meet someone.</h2>
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
