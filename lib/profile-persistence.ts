import type { Gender, RelationshipIntent } from "./types";
import { type WorkflowState } from "./workflow";

export type RegistrationProfile = {
  displayName: string;
  age: number;
  gender: Gender;
  interestedIn: Gender[];
  bio: string;
  relationshipIntent: RelationshipIntent;
};

export type ProfileRow = {
  id: string;
  email: string;
  display_name: string;
  age: number;
  gender: Gender;
  interested_in: Gender[];
  bio: string;
  relationship_intent: RelationshipIntent;
  active: boolean;
};

const genders: Gender[] = ["woman", "man", "non_binary"];
const relationshipIntents: RelationshipIntent[] = [
  "long_term",
  "long_term_open_to_short",
  "short_term_open_to_long",
  "short_term"
];

function isGender(value: unknown): value is Gender {
  return typeof value === "string" && genders.includes(value as Gender);
}

function isRelationshipIntent(value: unknown): value is RelationshipIntent {
  return typeof value === "string" && relationshipIntents.includes(value as RelationshipIntent);
}

export function workflowStateToRegistrationProfile(state: WorkflowState): RegistrationProfile {
  return {
    displayName: state.displayName,
    age: state.age,
    gender: state.gender,
    interestedIn: state.interestedIn,
    bio: state.bio,
    relationshipIntent: state.relationshipIntent
  };
}

export function metadataToRegistrationProfile(metadata: Record<string, unknown>) {
  const displayName = typeof metadata.displayName === "string" ? metadata.displayName.trim() : "";
  const age = typeof metadata.age === "number" ? metadata.age : Number(metadata.age);
  const gender = metadata.gender;
  const interestedIn = Array.isArray(metadata.interestedIn) ? metadata.interestedIn.filter(isGender) : [];
  const relationshipIntent = metadata.relationshipIntent;
  const bio = typeof metadata.bio === "string" ? metadata.bio : "";

  if (
    !displayName ||
    !Number.isFinite(age) ||
    age < 18 ||
    !isGender(gender) ||
    interestedIn.length === 0 ||
    !isRelationshipIntent(relationshipIntent)
  ) {
    return null;
  }

  return {
    displayName,
    age,
    gender,
    interestedIn,
    bio,
    relationshipIntent
  };
}

export function registrationProfileToProfileRow(userId: string, email: string, profile: RegistrationProfile): ProfileRow {
  return {
    id: userId,
    email,
    display_name: profile.displayName,
    age: profile.age,
    gender: profile.gender,
    interested_in: profile.interestedIn,
    bio: profile.bio,
    relationship_intent: profile.relationshipIntent,
    active: false
  };
}
