"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { compatibilityQuestions } from "@/lib/questions";
import type { CompatibilityAnswers } from "@/lib/types";
import { answerOptions, loadWorkflowState, saveWorkflowState, type WorkflowState } from "@/lib/workflow";

export default function QuestionsPage() {
  const router = useRouter();
  const [state, setState] = useState<WorkflowState | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedState = loadWorkflowState();
    if (!storedState.displayName || !storedState.verifiedUniversityEmail) {
      router.replace("/register");
      return;
    }

    setState(storedState);
  }, [router]);

  if (!state) {
    return null;
  }

  function updateAnswer(
    answerType: "selfAnswers" | "preferenceAnswers",
    key: keyof CompatibilityAnswers,
    value: number
  ) {
    setState((current) => {
      if (!current) return current;
      return {
        ...current,
        [answerType]: {
          ...current[answerType],
          [key]: value
        }
      };
    });
  }

  function finishQuestions() {
    if (!state) return;

    const nextState: WorkflowState = {
      ...state,
      active: true,
      matchAccepted: false
    };

    saveWorkflowState(nextState);
    router.push("/match");
  }

  return (
    <main className="page-shell">
      <nav className="top-nav">
        <Link className="brand" href="/">
          ANU Match
        </Link>
        <span className="progress-text">Step 2 of 3</span>
      </nav>

      <section className="section-heading narrow">
        <span className="eyebrow">Compatibility questions</span>
        <h1>Choose the number that feels most true.</h1>
        <p className="lede">
          Each topic appears once. Pick where you sit, then pick what feels right for an ideal match.
        </p>
      </section>

      <section className="question-layout">
        <CombinedQuestionBlock
          preferenceAnswers={state.preferenceAnswers}
          selfAnswers={state.selfAnswers}
          onChange={updateAnswer}
        />
      </section>

      {error ? <p className="error centered">{error}</p> : null}

      <section className="sticky-actions">
        <Link className="button secondary" href="/register">
          Back to profile
        </Link>
        <button
          className="button button-large"
          type="button"
          onClick={() => {
            setError("");
            finishQuestions();
          }}
        >
          Join the next round
        </button>
      </section>
    </main>
  );
}

function CombinedQuestionBlock({
  preferenceAnswers,
  selfAnswers,
  onChange
}: {
  preferenceAnswers: CompatibilityAnswers;
  selfAnswers: CompatibilityAnswers;
  onChange: (answerType: "selfAnswers" | "preferenceAnswers", key: keyof CompatibilityAnswers, value: number) => void;
}) {
  return (
    <section className="card question-card combined-question-card">
      <div>
        <span className="eyebrow">One question set</span>
        <h2>About you and your ideal match</h2>
        <p className="hint">
          Tell us about yourself, and we'll help you find your match.
        </p>
      </div>

      {compatibilityQuestions.map((question) => (
        <div className="number-question" key={question.key}>
          <div className="question-copy">
            <strong>{question.label}</strong>
            <div className="scale-labels">
              <span>{question.lowLabel}</span>
              <span>{question.highLabel}</span>
            </div>
          </div>
          <div className="answer-pair">
            <NumberScale
              label="Me"
              selectedValue={selfAnswers[question.key]}
              onSelect={(value) => onChange("selfAnswers", question.key, value)}
            />
            <NumberScale
              label="Ideal match"
              selectedValue={preferenceAnswers[question.key]}
              onSelect={(value) => onChange("preferenceAnswers", question.key, value)}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

function NumberScale({
  label,
  selectedValue,
  onSelect
}: {
  label: string;
  selectedValue: number;
  onSelect: (value: number) => void;
}) {
  return (
    <div className="number-scale-row">
      <span>{label}</span>
      <div className="number-grid" role="radiogroup" aria-label={label}>
        {answerOptions.map((value) => (
          <button
            aria-checked={selectedValue === value}
            className={`number-choice ${selectedValue === value ? "active" : ""}`}
            key={value}
            role="radio"
            type="button"
            onClick={() => onSelect(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
