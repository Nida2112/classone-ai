export type ClassLevel = 9 | 10;

export type Board = "FBISE";

export type LearningState =
  | "NOT_STARTED"
  | "LEARNING"
  | "NEEDS_PRACTICE"
  | "NEEDS_REVISION"
  | "MASTERED";

export interface Student {
  id: string;
  name: string;
  classLevel: ClassLevel;
  board: Board;
}

export interface Subject {
  id: string;
  name: string;
  classLevel: ClassLevel;
}

export interface Chapter {
  id: string;
  subjectId: string;
  name: string;
}

export interface Topic {
  id: string;
  chapterId: string;
  name: string;
}

export interface LearningProgress {
  studentId: string;
  topicId: string;
  state: LearningState;
  progress: number;
  mastery: number;
  attempts: number;
  correctAnswers: number;
  incorrectAnswers: number;
  lastStudied?: string;
}