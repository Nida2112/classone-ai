import { AssessmentAttempt, Question } from "../types";

const questions: Question[] = [
  {
    id: "q-phy-1",
    topicId: "topic-phy-measurement",
    question: "Which SI unit is used to measure length?",
    options: ["Kilogram", "Metre", "Second", "Kelvin"],
    correctAnswer: "Metre",
  },
  {
    id: "q-phy-2",
    topicId: "topic-phy-measurement",
    question: "Which instrument is commonly used to measure length?",
    options: ["Thermometer", "Balance", "Ruler", "Stopwatch"],
    correctAnswer: "Ruler",
  },
];

const attempts: AssessmentAttempt[] = [];

export class AssessmentRepository {
  getQuestions(topicId?: string) {
    if (!topicId) {
      return questions;
    }

    return questions.filter(
      (question) => question.topicId === topicId
    );
  }

  saveAttempt(attempt: AssessmentAttempt) {
    attempts.push(attempt);
    return attempt;
  }

  getAttemptsByStudent(studentId: string) {
    return attempts.filter(
      (attempt) => attempt.studentId === studentId
    );
  }
}