"use client";

import { useMemo, useState } from "react";
import { demoUsers } from "@/lib/demo-data";
import { createGreedyMatches, isAnuEmail } from "@/lib/matching";
import { compatibilityQuestions, defaultAnswerValue } from "@/lib/questions";
import type { CompatibilityAnswers, Gender, RelationshipIntent, UserProfile } from "@/lib/types";

const genderOptions: { label: string; value: Gender }[] = [
  { label: "Woman", value: "woman" },
  { label: "Man", value: "man" },
  { label: "Non-binary", value: "non_binary" },
  { label: "Other", value: "other" }
];

const initialAnswers = compatibilityQuestions.reduce((answers, question) => {
  answers[question.key] = defaultAnswerValue;
  return answers;
}, {} as CompatibilityAnswers);

export default function Home() {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [displayName, setDisplayName] = useState("Alex");
  const [age, setAge] = useState(21);
  const [gender, setGender] = useState<Gender>("woman");
  const [interestedIn, setInterestedIn] = useState<Gender[]>(["man"]);
  const [relationshipIntent, setRelationshipIntent] = useState<RelationshipIntent>("serious");
  const [bio, setBio] = useState("ANU student who wants a thoughtful match without endless swiping.");
  const [selfAnswers, setSelfAnswers] = useState<CompatibilityAnswers>(initialAnswers);
  const [preferenceAnswers, setPreferenceAnswers] = useState<CompatibilityAnswers>(initialAnswers);
  const [hasJoinedPool, setHasJoinedPool] = useState(false);
  const [hasRunRound, setHasRunRound] = useState(false);
  const [matchAccepted, setMatchAccepted] = useState(false);
  const [error, setError] = useState("");

  const localUser: UserProfile = useMemo(
    () => ({
      id: "current-user",
      email,
      verifiedUniversityEmail: isVerified,
      displayName,
      age,
      gender,
      interestedIn,
      bio,
      relationshipIntent,
      active: hasJoinedPool,
      blockedUserIds: [],
      declinedUserIds: [],
      selfAnswers,
      preferenceAnswers
    }),
    [
      age,
      bio,
      displayName,
      email,
      gender,
      hasJoinedPool,
      interestedIn,
      isVerified,
      preferenceAnswers,
      relationshipIntent,
      selfAnswers
    ]
  );

  const currentMatch = useMemo(() => {
    if (!hasRunRound) return null;

    return createGreedyMatches([localUser, ...demoUsers]).find((match) => {
      return match.userA.id === localUser.id || match.userB.id === localUser.id;
    });
  }, [hasRunRound, localUser]);

  const matchedPerson = currentMatch?.userA.id === localUser.id ? currentMatch.userB : currentMatch?.userA;
  const scorePercent = currentMatch ? Math.round(currentMatch.score * 100) : 0;

  function verifyEmail() {
    if (!isAnuEmail(email)) {
      setError("Use your university email, for example name@anu.edu.au.");
      setIsVerified(false);
      return;
    }

    setError("");
    setIsVerified(true);
  }

  function joinPool() {
    if (!isVerified) {
      setError("Verify your ANU email before joining the match pool.");
      return;
    }

    if (age < 18) {
      setError("You must be 18 or older to join the dating pool.");
      return;
    }

    if (interestedIn.length === 0) {
      setError("Choose at least one gender you are interested in.");
      return;
    }

    setError("");
    setHasJoinedPool(true);
    setHasRunRound(false);
    setMatchAccepted(false);
  }

  function toggleInterestedIn(value: Gender) {
    setInterestedIn((current) => {
      if (current.includes(value)) {
        return current.filter((item) => item !== value);
      }

      return [...current, value];
    });
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Hackathon MVP</span>
          <h1>One ANU match, no swiping.</h1>
          <p className="lede">
            ANU Match verifies student emails, asks what people are like and what they value, then runs a
            weekly matching round that gives each person one compatible introduction.
          </p>
          <div className="hero-actions">
            <a className="button" href="#demo">
              Try the demo flow
            </a>
            <a className="button secondary" href="#matching">
              See matching logic
            </a>
          </div>
        </div>

        <div className="card workflow">
          <FlowStep number="1" title="Verify" text="Only @anu.edu.au emails can enter the match pool." />
          <FlowStep number="2" title="Answer" text="Users describe themselves and what they seek in a partner." />
          <FlowStep number="3" title="Match" text="A scheduled job scores eligible pairs and assigns one match each." />
          <FlowStep number="4" title="Reveal" text="Contact details stay private until both people opt in." />
        </div>
      </section>

      <section className="grid" id="demo">
        <div className="card stack">
          <div>
            <span className="eyebrow">Onboarding</span>
            <h2>Register for the next round</h2>
            <p className="hint">
              This client-side demo mirrors the MVP flow. In production, Supabase Auth verifies the email
              and stores the profile before the weekly cron job runs.
            </p>
          </div>

          <div className="field">
            <label htmlFor="email">ANU email</label>
            <div className="row">
              <input
                id="email"
                placeholder="name@anu.edu.au"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setIsVerified(false);
                }}
              />
              <button className="button ghost" type="button" onClick={verifyEmail}>
                Verify
              </button>
            </div>
            {isVerified ? <span className="success">University email verified</span> : null}
          </div>

          <div className="field">
            <label htmlFor="display-name">Display name</label>
            <input id="display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                min={18}
                type="number"
                value={age}
                onChange={(event) => setAge(Number(event.target.value))}
              />
            </div>
            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select id="gender" value={gender} onChange={(event) => setGender(event.target.value as Gender)}>
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
            <div className="pill-row">
              {genderOptions.map((option) => (
                <button
                  className={`pill ${interestedIn.includes(option.value) ? "active" : ""}`}
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
              value={relationshipIntent}
              onChange={(event) => setRelationshipIntent(event.target.value as RelationshipIntent)}
            >
              <option value="serious">Looking for something serious</option>
              <option value="open_to_either">Open to either</option>
              <option value="casual">Keeping it casual</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="bio">Short bio</label>
            <textarea id="bio" value={bio} onChange={(event) => setBio(event.target.value)} />
          </div>

          {error ? <p className="error">{error}</p> : null}

          <button className="button" type="button" onClick={joinPool}>
            Join next matching round
          </button>
        </div>

        <div className="stack">
          <Questionnaire
            title="Describe yourself"
            answers={selfAnswers}
            onChange={setSelfAnswers}
            helper="These answers become the self vector."
          />
          <Questionnaire
            title="Describe your ideal partner"
            answers={preferenceAnswers}
            onChange={setPreferenceAnswers}
            helper="These answers become the preference vector."
          />
        </div>
      </section>

      <section className="grid" id="matching" style={{ marginTop: 24 }}>
        <div className="card stack">
          <span className="eyebrow">Match Round</span>
          <h2>Weekly matching job</h2>
          <p className="hint">
            The job filters for verified ANU students, mutual gender interest, age eligibility, and safety
            blocks, then greedily assigns the highest-scoring compatible pairs.
          </p>
          <button className="button" disabled={!hasJoinedPool} type="button" onClick={() => setHasRunRound(true)}>
            Run demo match round
          </button>
          {!hasJoinedPool ? <p className="small">Join the pool first to enable the demo scheduler.</p> : null}

          <div className="profile-list">
            <h3>Seeded ANU users</h3>
            {demoUsers.map((user) => (
              <div className="profile-mini" key={user.id}>
                <strong>{user.displayName}</strong>
                <p className="small">{user.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card stack">
          <span className="eyebrow">Reveal</span>
          <h2>Your match</h2>
          {!hasRunRound ? (
            <p className="hint">Run the match round to reveal one compatible person.</p>
          ) : matchedPerson && currentMatch ? (
            <div className="match-card">
              <div className="row">
                <div className="score">{scorePercent}%</div>
                <div>
                  <h3>{matchedPerson.displayName}</h3>
                  <p className="hint">{matchedPerson.bio}</p>
                </div>
              </div>
              <div>
                <strong>Why this match works</strong>
                <div className="pill-row" style={{ marginTop: 10 }}>
                  {currentMatch.reasons.map((reason) => (
                    <span className="pill active" key={reason}>
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
              <div className="row">
                <button className="button" type="button" onClick={() => setMatchAccepted(true)}>
                  Opt in to connect
                </button>
                <button className="button secondary" type="button" onClick={() => setHasRunRound(false)}>
                  Decline
                </button>
              </div>
              {matchAccepted ? (
                <p className="success">
                  Opt-in recorded. In production, contact or chat unlocks only after both users accept.
                </p>
              ) : null}
            </div>
          ) : (
            <p className="hint">
              No eligible match was found. Try changing preferences or adding more verified students.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

function FlowStep({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="step">
      <span className="step-number">{number}</span>
      <div>
        <h3>{title}</h3>
        <p className="small">{text}</p>
      </div>
    </div>
  );
}

function Questionnaire({
  title,
  helper,
  answers,
  onChange
}: {
  title: string;
  helper: string;
  answers: CompatibilityAnswers;
  onChange: (answers: CompatibilityAnswers) => void;
}) {
  return (
    <div className="card stack">
      <div>
        <span className="eyebrow">{title}</span>
        <h2>{title}</h2>
        <p className="hint">{helper}</p>
      </div>
      {compatibilityQuestions.map((question) => (
        <div className="question" key={question.key}>
          <strong>{question.label}</strong>
          <div className="range-row">
            <span className="small">{question.lowLabel}</span>
            <input
              min={1}
              max={7}
              type="range"
              value={answers[question.key]}
              onChange={(event) =>
                onChange({
                  ...answers,
                  [question.key]: Number(event.target.value)
                })
              }
            />
            <span className="small">{question.highLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
