import { LearningServiceClient } from "../clients/LearningServiceClient";

export class PlanningService {
  constructor(
    private readonly learningServiceClient =
      new LearningServiceClient()
  ) {}

  async getTodayPlan(studentId: string) {
    const progress =
      await this.learningServiceClient.getStudentProgress(
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
