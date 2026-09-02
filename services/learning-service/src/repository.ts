import { learningProgress } from "./seed";
import { LearningProgress } from "./types";

export class LearningRepository {
  findByStudentId(studentId: string): LearningProgress[] {
    return learningProgress.filter(
      (item) => item.studentId === studentId
    );
  }

  findByStudentAndTopic(
    studentId: string,
    topicId: string
  ): LearningProgress | undefined {
    return learningProgress.find(
      (item) =>
        item.studentId === studentId &&
        item.topicId === topicId
    );
  }

  updateProgress(
    studentId: string,
    topicId: string,
    updates: Partial<LearningProgress>
  ): LearningProgress | undefined {
    const item = learningProgress.find(
      (progress) =>
        progress.studentId === studentId &&
        progress.topicId === topicId
    );

    if (!item) {
      return undefined;
    }

    Object.assign(item, updates);

    item.lastStudied = new Date()
      .toISOString()
      .split("T")[0];

    return item;
  }
}
