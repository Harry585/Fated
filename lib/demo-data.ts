import type { CompatibilityAnswers, UserProfile } from "./types";

const answers = (
  extroversion: number,
  planning: number,
  ambition: number,
  nightlife: number,
  fitness: number,
  communication: number,
  affection: number,
  independence: number
): CompatibilityAnswers => ({
  extroversion,
  planning,
  ambition,
  nightlife,
  fitness,
  communication,
  affection,
  independence
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
    selfAnswers: answers(4, 6, 6, 2, 5, 6, 5, 4),
    preferenceAnswers: answers(5, 5, 6, 3, 4, 6, 5, 4)
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
    selfAnswers: answers(5, 5, 6, 3, 5, 5, 5, 4),
    preferenceAnswers: answers(4, 6, 6, 2, 5, 6, 5, 4)
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
    selfAnswers: answers(6, 3, 4, 5, 2, 7, 6, 3),
    preferenceAnswers: answers(6, 3, 4, 5, 2, 7, 6, 3)
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
    selfAnswers: answers(6, 4, 4, 5, 2, 6, 6, 4),
    preferenceAnswers: answers(6, 3, 4, 5, 2, 6, 6, 4)
  }
];
