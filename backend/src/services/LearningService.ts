import { LearningRepository } from "../repositories/LearningRepository";

export class LearningService {
  constructor(
    private readonly learningRepository =
      new LearningRepository()
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
}