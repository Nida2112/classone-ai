import { LearningProgress } from "../types";

export interface AssessmentQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface AssessmentAttempt {
  id: string;
  studentId: string;
  questionId: string;
  answer: string;
  correct: boolean;
}

const questions: AssessmentQuestion[] = [
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

const attempts: AssessmentAttempt[] = [];

export class AssessmentRepository {
  getQuestionsByTopic(topicId: string) {
    return questions.filter((question) => question.topicId === topicId);
  }

  getQuestion(questionId: string) {
    return questions.find((question) => question.id === questionId);
  }

  saveAttempt(attempt: AssessmentAttempt) {
    attempts.push(attempt);
    return attempt;
  }

  getAttemptsByStudent(studentId: string) {
    return attempts.filter((attempt) => attempt.studentId === studentId);
  }
}