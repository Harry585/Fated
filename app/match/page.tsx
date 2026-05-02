"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { demoUsers } from "@/lib/demo-data";
import { createGreedyMatches } from "@/lib/matching";
import { loadWorkflowState, saveWorkflowState, workflowStateToProfile, type WorkflowState } from "@/lib/workflow";

export default function MatchPage() {
  const router = useRouter();
  const [state, setState] = useState<WorkflowState | null>(null);
  const [hasRunRound, setHasRunRound] = useState(false);

  useEffect(() => {
    const storedState = loadWorkflowState();
    if (!storedState.active) {
      router.replace(storedState.verifiedUniversityEmail ? "/questions" : "/register");
      return;
    }

    setState(storedState);
  }, [router]);

  const localUser = useMemo(() => (state ? workflowStateToProfile(state) : null), [state]);
  const currentMatch = useMemo(() => {
    if (!localUser || !hasRunRound) return null;

    return createGreedyMatches([localUser, ...demoUsers]).find((match) => {
      return match.userA.id === localUser.id || match.userB.id === localUser.id;
    });
  }, [hasRunRound, localUser]);

  if (!state || !localUser) {
    return null;
  }

  const matchedPerson = currentMatch?.userA.id === localUser.id ? currentMatch.userB : currentMatch?.userA;
  const scorePercent = currentMatch ? Math.round(currentMatch.score * 100) : 0;

  function acceptMatch() {
    if (!state) return;

    const nextState: WorkflowState = {
      ...state,
      matchAccepted: true
    };
    setState(nextState);
    saveWorkflowState(nextState);
  }

  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link className="brand" href="/">
          Fated
        </Link>
        <span className="progress-text">Step 3 of 3</span>
      </nav>

      <section className="match-layout">
        <aside className="side-panel">
          <span className="eyebrow">You are in</span>
          <h1>Welcome to the next round, {state.displayName}.</h1>
          <p className="lede">
            Each week we run a fresh round and reveal one introduction. Try it now to see your match.
          </p>
          <button className="button button-large" type="button" onClick={() => setHasRunRound(true)}>
            Run this week&rsquo;s match
          </button>
        </aside>

        <section className="card stack">
          <span className="eyebrow">Match reveal</span>
          {!hasRunRound ? (
            <div className="empty-state">
              <h2>Your match is ready to generate.</h2>
              <p className="hint">
                Tap the button to see who we think you&rsquo;d hit it off with this week.
              </p>
            </div>
          ) : matchedPerson && currentMatch ? (
            <div className="match-card hero-match">
              <div className="row">
                <div className="score">{scorePercent}%</div>
                <div>
                  <span className="eyebrow">Most compatible</span>
                  <h2>{matchedPerson.displayName}</h2>
                  <p className="hint">{matchedPerson.bio}</p>
                </div>
              </div>
              <div>
                <strong>Why this match works</strong>
                <div className="choice-row spaced">
                  {currentMatch.reasons.map((reason) => (
                    <span className="choice-pill active" key={reason}>
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button className="button" type="button" onClick={acceptMatch}>
                  Opt in to connect
                </button>
                <button className="button secondary" type="button" onClick={() => setHasRunRound(false)}>
                  Not this round
                </button>
              </div>
              {state.matchAccepted ? (
                <p className="success">
                  Opt-in recorded. Contact details unlock once both of you say yes.
                </p>
              ) : null}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No match found this round.</h2>
              <p className="hint">Try changing your preferences or add more seeded users to the demo pool.</p>
            </div>
          )}
        </section>
      </section>

    </main>
  );
}
