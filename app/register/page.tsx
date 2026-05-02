"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAnuEmail } from "@/lib/matching";
import type { Gender, RelationshipIntent } from "@/lib/types";
import {
  genderOptions,
  loadWorkflowState,
  relationshipIntentOptions,
  saveWorkflowState,
  type WorkflowState
} from "@/lib/workflow";
import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [state, setState] = useState<WorkflowState | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setState(loadWorkflowState());
  }, []);

  if (!state) {
    return null;
  }

  function updateState(nextState: Partial<WorkflowState>) {
    setState((current) => {
      if (!current) return current;
      return { ...current, ...nextState };
    });
  }

  function toggleInterestedIn(value: Gender) {
    setState((current) => {
      if (!current) return current;
      const interestedIn = current.interestedIn.includes(value)
        ? current.interestedIn.filter((item) => item !== value)
        : [...current.interestedIn, value];

      return { ...current, interestedIn };
    });
  }

  async function continueToQuestions() {
    if (!state) return;

    const currentState = state;
    const trimmedEmail = currentState.email.trim();
    const trimmedName = currentState.displayName.trim();

    if (!trimmedName) {
      setError("Add a display name before continuing.");
      return;
    }

    if (!isAnuEmail(trimmedEmail)) {
      setError("Use an ANU email address, for example name@anu.edu.au.");
      return;
    }

    if (currentState.age < 18) {
      setError("You must be 18 or older to join the dating pool.");
      return;
    }

    if (currentState.interestedIn.length === 0) {
      setError("Choose at least one gender you are interested in.");
      return;
    }

    const nextState: WorkflowState = {
      ...currentState,
      email: trimmedEmail,
      displayName: trimmedName,
      verifiedUniversityEmail: false,
      active: false,
      matchAccepted: false
    };

    saveWorkflowState(nextState);
    setIsSubmitting(true);
    setError("");
    setStatus("");

    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    const authenticatedEmail = user?.email?.trim() ?? "";

    if (isAnuEmail(authenticatedEmail) && authenticatedEmail.toLowerCase() === trimmedEmail.toLowerCase()) {
      const verifiedState: WorkflowState = {
        ...nextState,
        verifiedUniversityEmail: true
      };

      saveWorkflowState(verifiedState);
      setState(verifiedState);
      setIsSubmitting(false);
      router.push("/questions");
      return;
    }

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

    setState(nextState);
    setStatus("Check your ANU email for a verification link to continue.");
  }

  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link className="brand" href="/">
          Fated
        </Link>
        <span className="progress-text">Step 1 of 3</span>
      </nav>

      <section className="form-layout">
        <aside className="side-panel">
          <span className="eyebrow">Registration</span>
          <h1>Tell us the basics.</h1>
          <p className="lede">
            This step is intentionally lightweight. The matching signal comes next from the compatibility
            questions.
          </p>
          <div className="timeline">
            <span className="active">Profile</span>
            <span>Questions</span>
            <span>Match</span>
          </div>
        </aside>

        <section className="card form-card">
          <div className="field">
            <label htmlFor="display-name">Display name</label>
            <input
              id="display-name"
              placeholder="Alex"
              value={state.displayName}
              onChange={(event) => updateState({ displayName: event.target.value })}
            />
          </div>

          <div className="field">
            <label htmlFor="email">ANU email</label>
            <input
              id="email"
              placeholder="name@anu.edu.au"
              type="email"
              value={state.email}
              onChange={(event) =>
                updateState({
                  email: event.target.value,
                  verifiedUniversityEmail: false
                })
              }
            />
            <p className="hint">We&apos;ll send a Supabase verification link to your ANU email.</p>
          </div>

          <div className="two-column">
            <div className="field">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                min={18}
                type="number"
                value={state.age}
                onChange={(event) => updateState({ age: Number(event.target.value) })}
              />
            </div>
            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={state.gender}
                onChange={(event) => updateState({ gender: event.target.value as Gender })}
              >
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <span className="label">Interested in</span>
            <div className="choice-row">
              {genderOptions.map((option) => (
                <button
                  className={`choice-pill ${state.interestedIn.includes(option.value) ? "active" : ""}`}
                  key={option.value}
                  type="button"
                  onClick={() => toggleInterestedIn(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="intent">Relationship intent</label>
            <select
              id="intent"
              value={state.relationshipIntent}
              onChange={(event) => updateState({ relationshipIntent: event.target.value as RelationshipIntent })}
            >
              {relationshipIntentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="bio">Short bio</label>
            <textarea
              id="bio"
              placeholder="A line or two about your campus life, interests, or ideal first date."
              value={state.bio}
              onChange={(event) => updateState({ bio: event.target.value })}
            />
          </div>

          {error ? <p className="error">{error}</p> : null}
          {status ? <p className="success">{status}</p> : null}

          <div className="form-actions">
            <Link className="button secondary" href="/">
              Back
            </Link>
            <Link className="button secondary" href="/login">
              Login
            </Link>
            <button className="button" disabled={isSubmitting} type="button" onClick={continueToQuestions}>
              {isSubmitting ? "Sending link..." : "Send verification link"}
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
