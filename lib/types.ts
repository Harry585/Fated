export type Gender = "woman" | "man" | "non_binary" | "other";

export type RelationshipIntent = "serious" | "open_to_either" | "casual";

export type UserProfile = {
  id: string;
  email: string;
  verifiedUniversityEmail: boolean;
  displayName: string;
  age: number;
  gender: Gender;
  interestedIn: Gender[];
  bio: string;
  relationshipIntent: RelationshipIntent;
  active: boolean;
  blockedUserIds: string[];
  declinedUserIds: string[];
  selfAnswers: CompatibilityAnswers;
  preferenceAnswers: CompatibilityAnswers;
};

export type CompatibilityAnswers = {
  extroversion: number;
  planning: number;
  ambition: number;
  nightlife: number;
  fitness: number;
  communication: number;
  affection: number;
  independence: number;
};

export type Question = {
  key: keyof CompatibilityAnswers;
  label: string;
  lowLabel: string;
  highLabel: string;
};

export type MatchCandidate = {
  userA: UserProfile;
  userB: UserProfile;
  score: number;
  reasons: string[];
};

export type MatchRound = {
  id: string;
  cadence: "weekly" | "fortnightly" | "monthly";
  runAt: string;
  matches: MatchCandidate[];
};
