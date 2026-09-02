import {
  AssessmentAttempt,
  AssessmentQuestion,
} from "./types";

import {
  questions,
  attempts,
} from "./data";

export class AssessmentRepository {
  getQuestionsByTopic(
    topicId: string
  ): AssessmentQuestion[] {
    return questions.filter(
      (question) =>
        question.topicId === topicId
    );
  }

  getQuestion(
    questionId: string
  ): AssessmentQuestion | undefined {
    return questions.find(
      (question) =>
        question.id === questionId
    );
  }

  saveAttempt(
    attempt: AssessmentAttempt
  ): AssessmentAttempt {
    attempts.push(attempt);
    return attempt;
  }

  getAttemptsByStudent(
    studentId: string
  ): AssessmentAttempt[] {
    return attempts.filter(
      (attempt) =>
        attempt.studentId === studentId
    );
  }
}
