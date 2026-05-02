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

const relationshipIntentReasons: Record<RelationshipIntent, string> = {
  long_term: "Aligned on long-term relationship goals and timeline",
  long_term_open_to_short: "Both open to something long-term if the connection feels right",
  short_term_open_to_long: "Both want to keep things relaxed while staying open to more",
  short_term: "Both looking for something casual and low-pressure right now"
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

function reasonForAnswer(key: keyof CompatibilityAnswers, sharedValue: number) {
  const isHigh = sharedValue >= 5;
  const isLow = sharedValue <= 3;

  switch (key) {
    case "intellectualChallenge":
      if (isHigh) return "You both enjoy being challenged and learning from each other";
      if (isLow) return "You both prefer a relationship that feels easygoing rather than overly intense";
      return "You both like a balance of thoughtful conversation and easy company";
    case "communicationFrequency":
      if (isHigh) return "You both value steady communication, even when life gets busy";
      if (isLow) return "You both appreciate room to breathe instead of constant texting";
      return "You both seem comfortable with a balanced communication rhythm";
    case "growthMindset":
      if (isHigh) return "You both like a partner who encourages growth and ambition";
      if (isLow) return "You both value feeling accepted as you are";
      return "You both want support without turning the relationship into a project";
    case "qualityTime":
      if (isHigh) return "You both want plenty of quality time together";
      if (isLow) return "You both understand the need for personal space";
      return "You both seem to balance time together with independent lives";
    case "appreciation":
      if (isHigh) return "You both care about showing appreciation in small, consistent ways";
      if (isLow) return "You both seem comfortable with a more understated kind of affection";
      return "You both value appreciation without needing constant reassurance";
    case "drinkingComfort":
      if (isHigh) return "You both feel relaxed around social drinks";
      if (isLow) return "You both lean toward quieter plans without much drinking";
      return "You both have a similar, flexible attitude toward drinking";
    case "weedComfort":
      if (isHigh) return "You have a similar comfort level around weed";
      if (isLow) return "You both prefer keeping weed out of the picture";
      return "You both land in a similar middle ground around weed";
    case "activeLifestyle":
      if (isHigh) return "You both like staying active and getting out of the house";
      if (isLow) return "You both enjoy slower days and low-key downtime";
      return "You both seem to mix active plans with relaxed downtime";
    case "financialSecurity":
      if (isHigh) return "You both think long-term when it comes to money and stability";
      if (isLow) return "You both like leaving room for spontaneity and enjoying the moment";
      return "You both balance future planning with enjoying life now";
    case "morningPerson":
      if (isHigh) return "You both have morning-person energy";
      if (isLow) return "You both understand the appeal of a slower start to the day";
      return "You both seem flexible about routines and sleep schedules";
    case "ambitionBalance":
      if (isHigh) return "You both respect big goals and career ambition";
      if (isLow) return "You both value balance outside work and study";
      return "You both care about ambition without losing sight of balance";
    case "childrenPreference":
      if (isHigh) return "You both picture family as part of the future";
      if (isLow) return "You are aligned on not rushing toward a traditional family path";
      return "You both seem open-minded about what the future could look like";
  }
}

export function compatibilityReasons(userA: UserProfile, userB: UserProfile) {
  const answerReasons = compatibilityQuestions.map((question) => {
    const distance = userA.answers[question.key] - userB.answers[question.key];

    return {
      label: reasonForAnswer(question.key, (userA.answers[question.key] + userB.answers[question.key]) / 2),
      distance: question.weight * distance ** 2
    };
  });

  const intentDistance = relationshipIntentValues[userA.relationshipIntent] - relationshipIntentValues[userB.relationshipIntent];
  const intentReasons =
    userA.relationshipIntent === userB.relationshipIntent
      ? [
          {
            label: relationshipIntentReasons[userA.relationshipIntent],
            distance: relationshipIntentWeight * intentDistance ** 2 - 0.5
          }
        ]
      : [];

  return [...intentReasons, ...answerReasons]
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
