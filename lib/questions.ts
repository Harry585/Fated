import type { Question } from "./types";

export const compatibilityQuestions: Question[] = [
  {
    key: "intellectualChallenge",
    label: "I expect my partner to challenge me intellectually.",
    lowLabel: "Strongly disagree",
    highLabel: "Strongly agree",
    weight: 2
  },
  {
    key: "communicationFrequency",
    label: "I want to be in constant communication with my partner.",
    lowLabel: "I need space",
    highLabel: "Constant contact",
    weight: 2
  },
  {
    key: "growthMindset",
    label: "My partner should actively push me to become a better person.",
    lowLabel: "Accept me as I am",
    highLabel: "Challenge me",
    weight: 2
  },
  {
    key: "qualityTime",
    label: "I want to spend most of my free time with my partner.",
    lowLabel: "Strongly disagree",
    highLabel: "Strongly agree",
    weight: 1.5
  },
  {
    key: "appreciation",
    label: "I regularly express appreciation for others' efforts.",
    lowLabel: "Strongly disagree",
    highLabel: "Strongly agree",
    weight: 1
  },
  {
    key: "drinkingComfort",
    label: "I am comfortable with my partner drinking.",
    lowLabel: "Nope",
    highLabel: "Bottoms up",
    weight: 1.5
  },
  {
    key: "weedComfort",
    label: "I am comfortable with my partner smoking weed.",
    lowLabel: "Strongly disagree",
    highLabel: "Strongly agree",
    weight: 1.5
  },
  {
    key: "activeLifestyle",
    label: "I lead a very active lifestyle.",
    lowLabel: "Strongly disagree",
    highLabel: "Strongly agree",
    weight: 1.5
  },
  {
    key: "financialSecurity",
    label: "I prefer saving money for long-term security over spending for current enjoyment.",
    lowLabel: "YOLO",
    highLabel: "Nest egg",
    weight: 1
  },
  {
    key: "morningPerson",
    label: "I am a morning person.",
    lowLabel: "Night owl",
    highLabel: "Morning person",
    weight: 0.5
  },
  {
    key: "ambitionBalance",
    label: "Career advancement should take priority over work-life balance.",
    lowLabel: "Work to live",
    highLabel: "Live to work",
    weight: 1.5
  },
  {
    key: "childrenPreference",
    label: "For me, a fulfilling life includes having children.",
    lowLabel: "Hard pass",
    highLabel: "It's my dream",
    weight: 1.5
  }
];

export const defaultAnswerValue = 4;
