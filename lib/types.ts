export type Gender = "woman" | "man" | "non_binary";

export type RelationshipIntent =
  | "long_term"
  | "long_term_open_to_short"
  | "short_term_open_to_long"
  | "short_term";

export type GroupSize = "1-on-1" | "small group" | "either";

export type HangoutVibe = "chill" | "active" | "intellectual" | "mixed";

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
  answers: CompatibilityAnswers;
};

export type CompatibilityAnswers = {
  intellectualChallenge: number;
  communicationFrequency: number;
  growthMindset: number;
  qualityTime: number;
  appreciation: number;
  drinkingComfort: number;
  weedComfort: number;
  activeLifestyle: number;
  financialSecurity: number;
  morningPerson: number;
  ambitionBalance: number;
  childrenPreference: number;
};

export type Question = {
  key: keyof CompatibilityAnswers;
  label: string;
  lowLabel: string;
  highLabel: string;
  weight: number;
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
