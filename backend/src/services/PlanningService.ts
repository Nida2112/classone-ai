import { LearningRepository } from "../repositories/LearningRepository";

export class PlanningService {
  constructor(
    private readonly learningRepository =
      new LearningRepository()
  ) {}

  getTodayPlan(studentId: string) {
    const progress =
      this.learningRepository.findByStudentId(
        studentId
      );

    return progress
      .filter(
        (item) =>
          item.state === "NEEDS_PRACTICE" ||
          item.state === "NEEDS_REVISION"
      )
      .map((item) => ({
        topicId: item.topicId,
        recommendedActivity:
          item.state === "NEEDS_PRACTICE"
            ? "Practice"
            : "Revision",
        reason:
          item.state === "NEEDS_PRACTICE"
            ? "Recent performance shows this topic needs more practice."
            : "This topic should be revised to strengthen retention.",
      }));
  }
}