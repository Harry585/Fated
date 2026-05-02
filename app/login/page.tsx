"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAnuEmail } from "@/lib/matching";
import { loadWorkflowState, saveWorkflowState, type WorkflowState } from "@/lib/workflow";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [state, setState] = useState<WorkflowState | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const workflowState = loadWorkflowState();
    setState(workflowState);
    setEmail(workflowState.email);
  }, []);

  async function sendLoginLink() {
    if (!state) return;

    const trimmedEmail = email.trim();

    if (!isAnuEmail(trimmedEmail)) {
      setError("Use an ANU email address, for example name@anu.edu.au.");
      return;
    }

    const nextState: WorkflowState = {
      ...state,
      email: trimmedEmail,
      verifiedUniversityEmail: false,
      active: false,
      matchAccepted: false
    };

    saveWorkflowState(nextState);
    setState(nextState);
    setIsSubmitting(true);
    setError("");
    setStatus("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/auth/confirmed`
      }
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    setStatus("Check your ANU email for a login link.");
  }

  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link className="brand" href="/">
          Fated
        </Link>
        <Link className="nav-link" href="/register">
          Register
        </Link>
      </nav>

      <section className="form-layout">
        <aside className="side-panel">
          <span className="eyebrow">Login</span>
          <h1>Welcome back.</h1>
          <p className="lede">Enter your ANU email and we&apos;ll send a Supabase magic link.</p>
        </aside>

        <section className="card form-card">
          <div className="field">
            <label htmlFor="login-email">ANU email</label>
            <input
              id="login-email"
              placeholder="name@anu.edu.au"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <p className="hint">
              After verification, returning users continue to questions. New users finish profile setup first.
            </p>
          </div>

          {error ? <p className="error">{error}</p> : null}
          {status ? <p className="success">{status}</p> : null}

          <div className="form-actions">
            <Link className="button secondary" href="/">
              Back
            </Link>
            <button className="button" disabled={isSubmitting} type="button" onClick={sendLoginLink}>
              {isSubmitting ? "Sending link..." : "Send login link"}
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
