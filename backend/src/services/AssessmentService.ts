import {
  AssessmentServiceClient,
} from "../clients/AssessmentServiceClient";

export class AssessmentService {
  constructor(
    private readonly assessmentServiceClient =
      new AssessmentServiceClient()
  ) {}

  getQuestions(topicId: string) {
    return this.assessmentServiceClient
      .getQuestions(topicId);
  }

  submitAnswer(
    studentId: string,
    questionId: string,
    answer: string
  ) {
    return this.assessmentServiceClient
      .submitAnswer(
        studentId,
        questionId,
        answer
      );
  }

  getStudentAttempts(
    studentId: string
  ) {
    return this.assessmentServiceClient
      .getStudentAttempts(studentId);
  }
}
