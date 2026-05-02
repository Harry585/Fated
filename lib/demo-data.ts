import type { CompatibilityAnswers, UserProfile } from "./types";

const answers = (
  intellectualChallenge: number,
  communicationFrequency: number,
  growthMindset: number,
  qualityTime: number,
  appreciation: number,
  drinkingComfort: number,
  weedComfort: number,
  activeLifestyle: number,
  financialSecurity: number,
  morningPerson: number,
  ambitionBalance: number,
  childrenPreference: number
): CompatibilityAnswers => ({
  intellectualChallenge,
  communicationFrequency,
  growthMindset,
  qualityTime,
  appreciation,
  drinkingComfort,
  weedComfort,
  activeLifestyle,
  financialSecurity,
  morningPerson,
  ambitionBalance,
  childrenPreference
});

export const demoUsers: UserProfile[] = [
  {
    id: "mia",
    email: "mia@anu.edu.au",
    verifiedUniversityEmail: true,
    displayName: "Mia",
    age: 21,
    gender: "woman",
    interestedIn: ["man", "non_binary"],
    bio: "Law student, coffee loyalist, and weekend market regular.",
    relationshipIntent: "serious",
    active: true,
    blockedUserIds: [],
    declinedUserIds: [],
    selfAnswers: answers(6, 5, 6, 5, 6, 4, 2, 5, 6, 5, 3, 5),
    preferenceAnswers: answers(6, 5, 6, 5, 6, 4, 2, 5, 6, 4, 3, 5)
  },
  {
    id: "noah",
    email: "noah@anu.edu.au",
    verifiedUniversityEmail: true,
    displayName: "Noah",
    age: 22,
    gender: "man",
    interestedIn: ["woman"],
    bio: "Computer science student who likes climbing, film nights, and dumplings.",
    relationshipIntent: "serious",
    active: true,
    blockedUserIds: [],
    declinedUserIds: [],
    selfAnswers: answers(6, 4, 6, 5, 5, 4, 2, 6, 5, 4, 4, 5),
    preferenceAnswers: answers(6, 5, 6, 5, 6, 4, 2, 5, 6, 5, 3, 5)
  },
  {
    id: "ava",
    email: "ava@anu.edu.au",
    verifiedUniversityEmail: true,
    displayName: "Ava",
    age: 20,
    gender: "woman",
    interestedIn: ["woman", "non_binary"],
    bio: "Music, art history, and finding Canberra's best pastries.",
    relationshipIntent: "open_to_either",
    active: true,
    blockedUserIds: [],
    declinedUserIds: [],
    selfAnswers: answers(5, 6, 5, 6, 6, 5, 4, 3, 4, 2, 2, 3),
    preferenceAnswers: answers(5, 6, 5, 6, 6, 5, 4, 3, 4, 2, 2, 3)
  },
  {
    id: "sam",
    email: "sam@anu.edu.au",
    verifiedUniversityEmail: true,
    displayName: "Sam",
    age: 23,
    gender: "non_binary",
    interestedIn: ["woman", "man", "non_binary"],
    bio: "Philosophy tutor, trivia menace, and board game enthusiast.",
    relationshipIntent: "open_to_either",
    active: true,
    blockedUserIds: [],
    declinedUserIds: [],
    selfAnswers: answers(5, 4, 5, 4, 5, 5, 5, 3, 5, 3, 3, 4),
    preferenceAnswers: answers(5, 5, 5, 4, 6, 5, 5, 3, 5, 3, 3, 4)
  }
];
