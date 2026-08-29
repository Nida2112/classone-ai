import { AssessmentRepository } from "../repositories/AssessmentRepository";

export class AssessmentService {
  constructor(
    private readonly assessmentRepository =
      new AssessmentRepository()
  ) {}

  getQuestions(topicId?: string) {
    return this.assessmentRepository.getQuestions(topicId);
  }

  submitAssessment(
    studentId: string,
    answers: Record<string, string>
  ) {
    const questions =
      this.assessmentRepository.getQuestions();

    let correct = 0;

    for (const question of questions) {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    }

    const score =
      questions.length === 0
        ? 0
        : Math.round((correct / questions.length) * 100);

    const attempt = {
      id: `attempt-${Date.now()}`,
      studentId,
      questionIds: questions.map((q) => q.id),
      answers,
      score,
      submittedAt: new Date().toISOString(),
    };

    return this.assessmentRepository.saveAttempt(attempt);
  }

  getStudentAttempts(studentId: string) {
    return this.assessmentRepository.getAttemptsByStudent(
      studentId
    );
  }
}