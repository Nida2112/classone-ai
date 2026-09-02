import {
  LearningServiceClient,
  LearningProgressUpdate,
} from "../clients/LearningServiceClient";

export class LearningService {
  constructor(
    private readonly learningServiceClient =
      new LearningServiceClient()
  ) {}

  getStudentProgress(studentId: string) {
    return this.learningServiceClient.getStudentProgress(
      studentId
    );
  }

  getTopicProgress(
    studentId: string,
    topicId: string
  ) {
    return this.learningServiceClient.getTopicProgress(
      studentId,
      topicId
    );
  }

  updateTopicProgress(
    studentId: string,
    topicId: string,
    updates: LearningProgressUpdate
  ) {
    return this.learningServiceClient.updateTopicProgress(
      studentId,
      topicId,
      updates
    );
  }
}
