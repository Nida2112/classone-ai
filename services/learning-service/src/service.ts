import { LearningRepository } from "./repository";
import { LearningProgress } from "./types";

export type LearningProgressUpdate =
  Partial<
    Pick<
      LearningProgress,
      | "progress"
      | "mastery"
      | "attempts"
      | "correctAnswers"
      | "incorrectAnswers"
      | "state"
    >
  >;

export class LearningService {
  constructor(
    private readonly learningRepository = new LearningRepository()
  ) {}

  getStudentProgress(studentId: string) {
    return this.learningRepository.findByStudentId(studentId);
  }

  getTopicProgress(
    studentId: string,
    topicId: string
  ) {
    return this.learningRepository.findByStudentAndTopic(
      studentId,
      topicId
    );
  }

  updateTopicProgress(
    studentId: string,
    topicId: string,
    updates: LearningProgressUpdate
  ) {
    return this.learningRepository.updateProgress(
      studentId,
      topicId,
      updates
    );
  }
}
