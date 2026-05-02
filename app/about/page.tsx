import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link className="brand" href="/">
          Fated
        </Link>
        <div className="nav-links">
          <Link className="nav-link" href="/register">Register</Link>
          <Link className="nav-link" href="/login">Login</Link>
        </div>
      </nav>

      <div className="about-layout">
        <header className="about-header">
          <span className="eyebrow">About</span>
          <h1>Dating apps are broken.</h1>
        </header>

        <div className="about-body">
          <p>
            Modern apps are designed to keep you scrolling, not to help you find meaningful connection. They reduce people
            to a handful of photos, a height, and a one-liner — then reward whoever plays the algorithm best.
          </p>
          <p>
            But fixing this matters. The single biggest predictor of a long, healthy life isn&rsquo;t wealth, status, or
            career success. It&rsquo;s the quality of your relationships.
          </p>
          <p>
            Fated is built on that premise. One introduction per week, matched on values, lifestyle, and what
            you&rsquo;re actually looking for — not your best selfie. No browsing, no swiping, no performance.
            Just a thoughtful introduction to someone who genuinely fits.
          </p>

          <div className="about-actions">
            <Link className="button button-large" href="/register">
              Join Fated
            </Link>
            <Link className="button secondary" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
