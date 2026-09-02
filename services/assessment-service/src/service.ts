import {
  AssessmentRepository,
} from "./repository";

import {
  AssessmentAttempt,
  LearningProgressUpdate,
} from "./types";

import {
  LearningServiceClient,
} from "./learningServiceClient";

export class AssessmentService {
  constructor(
    private readonly assessmentRepository =
      new AssessmentRepository(),

    private readonly learningServiceClient =
      new LearningServiceClient()
  ) {}

  getQuestions(topicId: string) {
    return this.assessmentRepository
      .getQuestionsByTopic(topicId);
  }

  async submitAnswer(
    studentId: string,
    questionId: string,
    answer: string
  ) {
    const question =
      this.assessmentRepository
        .getQuestion(questionId);

    if (!question) {
      return null;
    }

    const correct =
      question.correctAnswer === answer;

    const attempt: AssessmentAttempt = {
      id: `attempt-${Date.now()}`,
      studentId,
      questionId,
      answer,
      correct,
    };

    const savedAttempt =
      this.assessmentRepository
        .saveAttempt(attempt);

    const currentProgress =
      await this.learningServiceClient
        .getTopicProgress(
          studentId,
          question.topicId
        );

    if (currentProgress) {
      const newAttempts =
        currentProgress.attempts + 1;

      const newCorrectAnswers =
        currentProgress.correctAnswers +
        (correct ? 1 : 0);

      const newIncorrectAnswers =
        currentProgress.incorrectAnswers +
        (correct ? 0 : 1);

      const totalAnswers =
        newCorrectAnswers +
        newIncorrectAnswers;

      const accuracy =
        totalAnswers > 0
          ? newCorrectAnswers / totalAnswers
          : 0;

      let newState =
        currentProgress.state;

      if (
        accuracy >= 0.8 &&
        newAttempts >= 2
      ) {
        newState = "MASTERED";
      } else if (accuracy < 0.6) {
        newState = "NEEDS_PRACTICE";
      } else {
        newState = "LEARNING";
      }

      const updates: LearningProgressUpdate = {
        attempts: newAttempts,
        correctAnswers:
          newCorrectAnswers,
        incorrectAnswers:
          newIncorrectAnswers,
        mastery:
          Math.round(accuracy * 100),
        state: newState,
        progress:
          currentProgress.progress,
      };

      await this.learningServiceClient
        .updateTopicProgress(
          studentId,
          question.topicId,
          updates
        );
    }

    return savedAttempt;
  }

  getStudentAttempts(
    studentId: string
  ) {
    return this.assessmentRepository
      .getAttemptsByStudent(studentId);
  }
}
