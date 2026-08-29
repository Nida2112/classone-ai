export interface Question {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface AssessmentAttempt {
  id: string;
  studentId: string;
  questionIds: string[];
  answers: Record<string, string>;
  score: number;
  submittedAt: string;
}