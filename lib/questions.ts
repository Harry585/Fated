import type { Question } from "./types";

export const compatibilityQuestions: Question[] = [
  {
    key: "extroversion",
    label: "How social are you?",
    lowLabel: "Quiet nights in",
    highLabel: "Always out with people"
  },
  {
    key: "planning",
    label: "How do you approach plans?",
    lowLabel: "Spontaneous",
    highLabel: "Organised in advance"
  },
  {
    key: "ambition",
    label: "How important is academic or career drive?",
    lowLabel: "Low pressure",
    highLabel: "Very driven"
  },
  {
    key: "nightlife",
    label: "How much do you enjoy nightlife?",
    lowLabel: "Rarely",
    highLabel: "Most weekends"
  },
  {
    key: "fitness",
    label: "How central is fitness or sport?",
    lowLabel: "Not central",
    highLabel: "Very central"
  },
  {
    key: "communication",
    label: "How much communication do you prefer?",
    lowLabel: "Low maintenance",
    highLabel: "Frequent check-ins"
  },
  {
    key: "affection",
    label: "How openly affectionate are you?",
    lowLabel: "Reserved",
    highLabel: "Very affectionate"
  },
  {
    key: "independence",
    label: "How much independence do you like in a relationship?",
    lowLabel: "Do most things together",
    highLabel: "Lots of personal space"
  }
];

export const defaultAnswerValue = 4;
