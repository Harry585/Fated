import { compatibilityQuestions } from "./questions";
import type { CompatibilityAnswers, MatchCandidate, UserProfile } from "./types";

const maxAnswerDistance = 6;

export function isAnuEmail(email: string) {
  return /^[^\s@]+@anu\.edu\.au$/i.test(email.trim());
}

export function isEligibleForPool(user: UserProfile) {
  return user.active && user.verifiedUniversityEmail && isAnuEmail(user.email) && user.age >= 18;
}

export function hasMutualGenderInterest(userA: UserProfile, userB: UserProfile) {
  return userA.interestedIn.includes(userB.gender) && userB.interestedIn.includes(userA.gender);
}

export function canMatch(userA: UserProfile, userB: UserProfile) {
  if (userA.id === userB.id) return false;
  if (!isEligibleForPool(userA) || !isEligibleForPool(userB)) return false;
  if (!hasMutualGenderInterest(userA, userB)) return false;
  if (userA.blockedUserIds.includes(userB.id) || userB.blockedUserIds.includes(userA.id)) return false;
  if (userA.declinedUserIds.includes(userB.id) || userB.declinedUserIds.includes(userA.id)) return false;

  return true;
}

export function similarity(preferences: CompatibilityAnswers, self: CompatibilityAnswers) {
  const totalDistance = compatibilityQuestions.reduce((sum, question) => {
    return sum + Math.abs(preferences[question.key] - self[question.key]);
  }, 0);

  const maxDistance = compatibilityQuestions.length * maxAnswerDistance;
  return 1 - totalDistance / maxDistance;
}

export function compatibilityScore(userA: UserProfile, userB: UserProfile) {
  const aToB = similarity(userA.preferenceAnswers, userB.selfAnswers);
  const bToA = similarity(userB.preferenceAnswers, userA.selfAnswers);
  const intentPenalty = userA.relationshipIntent === userB.relationshipIntent ? 0 : 0.08;

  return Math.max(0, (aToB + bToA) / 2 - intentPenalty);
}

export function compatibilityReasons(userA: UserProfile, userB: UserProfile) {
  return compatibilityQuestions
    .map((question) => {
      const aDistance = Math.abs(userA.preferenceAnswers[question.key] - userB.selfAnswers[question.key]);
      const bDistance = Math.abs(userB.preferenceAnswers[question.key] - userA.selfAnswers[question.key]);

      return {
        label: question.label,
        distance: aDistance + bDistance
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
