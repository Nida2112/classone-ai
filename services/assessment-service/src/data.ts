import {
  AssessmentAttempt,
  AssessmentQuestion,
} from "./types";

export const questions: AssessmentQuestion[] = [
  {
    id: "q-phy-motion-1",
    topicId: "topic-phy-motion-basics",
    question: "Which quantity describes how fast an object is moving?",
    options: ["Speed", "Mass", "Density", "Temperature"],
    correctAnswer: "Speed",
  },
  {
    id: "q-phy-motion-2",
    topicId: "topic-phy-motion-basics",
    question: "What is the SI unit of speed?",
    options: ["Newton", "Metre per second", "Joule", "Kilogram"],
    correctAnswer: "Metre per second",
  },
  {
    id: "q-math-number-1",
    topicId: "topic-math-number-systems",
    question: "Which of the following is an irrational number?",
    options: ["2", "4", "√2", "8"],
    correctAnswer: "√2",
  },
];

export const attempts: AssessmentAttempt[] = [];
