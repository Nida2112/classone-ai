import { learningProgress } from "../db/seed";
import { LearningProgress } from "../types";

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
}