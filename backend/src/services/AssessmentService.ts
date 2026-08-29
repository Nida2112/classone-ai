import {
  AssessmentRepository,
  AssessmentAttempt,
} from "../repositories/AssessmentRepository";

export class AssessmentService {
  constructor(
    private readonly assessmentRepository =
      new AssessmentRepository()
  ) {}

  getQuestions(topicId: string) {
    return this.assessmentRepository.getQuestionsByTopic(topicId);
  }

  submitAnswer(
    studentId: string,
    questionId: string,
    answer: string
  ) {
    const question =
      this.assessmentRepository.getQuestion(questionId);

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

    return this.assessmentRepository.saveAttempt(attempt);
  }

  getStudentAttempts(studentId: string) {
    return this.assessmentRepository.getAttemptsByStudent(
      studentId
    );
  }
}