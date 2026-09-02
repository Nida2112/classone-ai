export interface AssessmentQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface AssessmentAttempt {
  id: string;
  studentId: string;
  questionId: string;
  answer: string;
  correct: boolean;
}

export interface LearningProgress {
  studentId: string;
  topicId: string;
  state: string;
  progress: number;
  mastery: number;
  attempts: number;
  correctAnswers: number;
  incorrectAnswers: number;
  lastStudied?: string;
}

export type LearningProgressUpdate =
  Partial<
    Pick<
      LearningProgress,
      | "progress"
      | "mastery"
      | "attempts"
      | "correctAnswers"
      | "incorrectAnswers"
      | "state"
    >
  >;
