export type ClassLevel = 9 | 10;

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
