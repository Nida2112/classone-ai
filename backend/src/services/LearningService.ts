import { LearningRepository } from "../repositories/LearningRepository";
import { StudentRepository } from "../repositories/StudentRepository";

export class LearningService {
  constructor(
    private readonly learningRepository = new LearningRepository(),
    private readonly studentRepository = new StudentRepository()
  ) {}

  getStudentProgress(studentId: string) {
    const student = this.studentRepository.findById(studentId);

    if (!student) {
      return null;
    }

    return this.learningRepository.findByStudentId(studentId);
  }

  getTopicProgress(studentId: string, topicId: string) {
    const student = this.studentRepository.findById(studentId);

    if (!student) {
      return null;
    }

    return this.learningRepository.findByStudentAndTopic(
      studentId,
      topicId
    );
  }
}