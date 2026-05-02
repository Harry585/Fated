import { compatibilityQuestions, defaultAnswerValue } from "./questions";
import type { CompatibilityAnswers, Gender, RelationshipIntent, UserProfile } from "./types";

export const workflowStorageKey = "anu-match-workflow";

export const genderOptions: { label: string; value: Gender }[] = [
  { label: "Woman", value: "woman" },
  { label: "Man", value: "man" },
  { label: "Non-binary", value: "non_binary" },
  { label: "Other", value: "other" }
];

export const answerOptions = [1, 2, 3, 4, 5, 6, 7];

export type RegistrationDraft = {
  email: string;
  verifiedUniversityEmail: boolean;
  displayName: string;
  age: number;
  gender: Gender;
  interestedIn: Gender[];
  bio: string;
  relationshipIntent: RelationshipIntent;
};

export type WorkflowState = RegistrationDraft & {
  selfAnswers: CompatibilityAnswers;
  preferenceAnswers: CompatibilityAnswers;
  active: boolean;
  matchAccepted: boolean;
};

export function createDefaultAnswers(): CompatibilityAnswers {
  return compatibilityQuestions.reduce((answers, question) => {
    answers[question.key] = defaultAnswerValue;
    return answers;
  }, {} as CompatibilityAnswers);
}

export function createDefaultWorkflowState(): WorkflowState {
  return {
    email: "",
    verifiedUniversityEmail: false,
    displayName: "",
    age: 21,
    gender: "woman",
    interestedIn: ["man"],
    bio: "",
    relationshipIntent: "serious",
    selfAnswers: createDefaultAnswers(),
    preferenceAnswers: createDefaultAnswers(),
    active: false,
    matchAccepted: false
  };
}

export function loadWorkflowState() {
  if (typeof window === "undefined") {
    return createDefaultWorkflowState();
  }

  const stored = window.localStorage.getItem(workflowStorageKey);
  if (!stored) {
    return createDefaultWorkflowState();
  }

  try {
    return {
      ...createDefaultWorkflowState(),
      ...JSON.parse(stored)
    } as WorkflowState;
  } catch {
    return createDefaultWorkflowState();
  }
}

export function saveWorkflowState(state: WorkflowState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(workflowStorageKey, JSON.stringify(state));
}

export function workflowStateToProfile(state: WorkflowState): UserProfile {
  return {
    id: "current-user",
    email: state.email,
    verifiedUniversityEmail: state.verifiedUniversityEmail,
    displayName: state.displayName,
    age: state.age,
    gender: state.gender,
    interestedIn: state.interestedIn,
    bio: state.bio,
    relationshipIntent: state.relationshipIntent,
    active: state.active,
    blockedUserIds: [],
    declinedUserIds: [],
    selfAnswers: state.selfAnswers,
    preferenceAnswers: state.preferenceAnswers
  };
}
