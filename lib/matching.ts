import { compatibilityQuestions } from "./questions";
import type { CompatibilityAnswers, MatchCandidate, RelationshipIntent, UserProfile } from "./types";

const maxAnswerDistance = 6;
const relationshipIntentWeight = 2;
const maxRelationshipIntentDistance = 3;

const relationshipIntentValues: Record<RelationshipIntent, number> = {
  long_term: 1,
  long_term_open_to_short: 2,
  short_term_open_to_long: 3,
  short_term: 4
};

export function isAnuEmail(email: string) {
  return /^[^\s@]+@anu\.edu\.au$/i.test(email.trim());
}

export function isEligibleForPool(user: UserProfile) {
  return user.active && user.verifiedUniversityEmail && isAnuEmail(user.email) && user.age >= 18;
}

export function hasMutualGenderInterest(userA: UserProfile, userB: UserProfile) {
  return userA.interestedIn.includes(userB.gender) && userB.interestedIn.includes(userA.gender);
}

export function hasCompatibleRelationshipIntent(userA: UserProfile, userB: UserProfile) {
  const pureLongAndShort =
    userA.relationshipIntent === "long_term" && userB.relationshipIntent === "short_term";
  const pureShortAndLong =
    userA.relationshipIntent === "short_term" && userB.relationshipIntent === "long_term";

  return !pureLongAndShort && !pureShortAndLong;
}

export function canMatch(userA: UserProfile, userB: UserProfile) {
  if (userA.id === userB.id) return false;
  if (!isEligibleForPool(userA) || !isEligibleForPool(userB)) return false;
  if (!hasMutualGenderInterest(userA, userB)) return false;
  if (!hasCompatibleRelationshipIntent(userA, userB)) return false;
  if (userA.blockedUserIds.includes(userB.id) || userB.blockedUserIds.includes(userA.id)) return false;
  if (userA.declinedUserIds.includes(userB.id) || userB.declinedUserIds.includes(userA.id)) return false;

  return true;
}

function answerWeightedSquaredDistance(answersA: CompatibilityAnswers, answersB: CompatibilityAnswers) {
  return compatibilityQuestions.reduce((sum, question) => {
    const distance = answersA[question.key] - answersB[question.key];
    return sum + question.weight * distance ** 2;
  }, 0);
}

function maxAnswerWeightedSquaredDistance() {
  return compatibilityQuestions.reduce((sum, question) => {
    return sum + question.weight * maxAnswerDistance ** 2;
  }, 0);
}

function relationshipIntentWeightedSquaredDistance(intentA: RelationshipIntent, intentB: RelationshipIntent) {
  const distance = relationshipIntentValues[intentA] - relationshipIntentValues[intentB];
  return relationshipIntentWeight * distance ** 2;
}

export function similarity(userA: UserProfile, userB: UserProfile) {
  const weightedSquaredDistance =
    answerWeightedSquaredDistance(userA.answers, userB.answers) +
    relationshipIntentWeightedSquaredDistance(userA.relationshipIntent, userB.relationshipIntent);

  const maxWeightedSquaredDistance =
    maxAnswerWeightedSquaredDistance() + relationshipIntentWeight * maxRelationshipIntentDistance ** 2;

  return 1 - Math.sqrt(weightedSquaredDistance / maxWeightedSquaredDistance);
}

export function compatibilityScore(userA: UserProfile, userB: UserProfile) {
  return Math.max(0, similarity(userA, userB));
}

export function compatibilityReasons(userA: UserProfile, userB: UserProfile) {
  return compatibilityQuestions
    .map((question) => {
      const distance = userA.answers[question.key] - userB.answers[question.key];

      return {
        label: question.label,
        distance: question.weight * distance ** 2
      };
    })
    .sort((left, right) => left.distance - right.distance)
    .slice(0, 3)
    .map((reason) => reason.label);
}

export function scoreCandidates(users: UserProfile[]) {
  const candidates: MatchCandidate[] = [];

  for (let i = 0; i < users.length; i += 1) {
    for (let j = i + 1; j < users.length; j += 1) {
      const userA = users[i];
      const userB = users[j];

      if (!canMatch(userA, userB)) continue;

      candidates.push({
        userA,
        userB,
        score: compatibilityScore(userA, userB),
        reasons: compatibilityReasons(userA, userB)
      });
    }
  }

  return candidates.sort((left, right) => right.score - left.score);
}

export function createGreedyMatches(users: UserProfile[]) {
  const matchedUserIds = new Set<string>();
  const matches: MatchCandidate[] = [];

  for (const candidate of scoreCandidates(users)) {
    if (matchedUserIds.has(candidate.userA.id) || matchedUserIds.has(candidate.userB.id)) {
      continue;
    }

    matches.push(candidate);
    matchedUserIds.add(candidate.userA.id);
    matchedUserIds.add(candidate.userB.id);
  }

  return matches;
}
