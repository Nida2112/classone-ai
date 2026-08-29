import {
  Student,
  Subject,
  Chapter,
  Topic,
  LearningProgress,
} from "../types";

export const students: Student[] = [
  {
    id: "student-demo-1",
    name: "Ayesha",
    classLevel: 9,
    board: "FBISE",
  },
];

export const subjects: Subject[] = [
  {
    id: "sub-math-9",
    name: "Mathematics",
    classLevel: 9,
  },
  {
    id: "sub-phy-9",
    name: "Physics",
    classLevel: 9,
  },
  {
    id: "sub-chem-9",
    name: "Chemistry",
    classLevel: 9,
  },
  {
    id: "sub-cs-9",
    name: "Computer Science",
    classLevel: 9,
  },
  {
    id: "sub-eng-9",
    name: "English",
    classLevel: 9,
  },
  {
    id: "sub-urdu-9",
    name: "Urdu",
    classLevel: 9,
  },
  {
    id: "sub-pst-9",
    name: "Pakistan Studies",
    classLevel: 9,
  },
  {
    id: "sub-isl-9",
    name: "Islamiat",
    classLevel: 9,
  },
];

export const chapters: Chapter[] = [
  {
    id: "chap-phy-physical",
    subjectId: "sub-phy-9",
    name: "Physical Quantities",
  },
  {
    id: "chap-phy-motion",
    subjectId: "sub-phy-9",
    name: "Motion",
  },
  {
    id: "chap-math-number",
    subjectId: "sub-math-9",
    name: "Number Systems",
  },
  {
    id: "chap-math-algebra",
    subjectId: "sub-math-9",
    name: "Algebraic Expressions",
  },
];

export const topics: Topic[] = [
  {
    id: "topic-phy-measurement",
    chapterId: "chap-phy-physical",
    name: "Measurement",
  },
  {
    id: "topic-phy-si-units",
    chapterId: "chap-phy-physical",
    name: "SI Units",
  },
  {
    id: "topic-phy-motion-basics",
    chapterId: "chap-phy-motion",
    name: "Motion",
  },
  {
    id: "topic-phy-speed",
    chapterId: "chap-phy-motion",
    name: "Speed and Velocity",
  },
  {
    id: "topic-math-number-systems",
    chapterId: "chap-math-number",
    name: "Number Systems",
  },
  {
    id: "topic-math-algebra-basics",
    chapterId: "chap-math-algebra",
    name: "Algebraic Expressions",
  },
];

export const learningProgress: LearningProgress[] = [
  {
    studentId: "student-demo-1",
    topicId: "topic-phy-measurement",
    state: "MASTERED",
    progress: 100,
    mastery: 95,
    attempts: 3,
    correctAnswers: 9,
    incorrectAnswers: 1,
    lastStudied: "2026-08-27",
  },
  {
    studentId: "student-demo-1",
    topicId: "topic-phy-motion-basics",
    state: "NEEDS_PRACTICE",
    progress: 70,
    mastery: 55,
    attempts: 3,
    correctAnswers: 5,
    incorrectAnswers: 5,
    lastStudied: "2026-08-28",
  },
  {
    studentId: "student-demo-1",
    topicId: "topic-math-number-systems",
    state: "MASTERED",
    progress: 100,
    mastery: 90,
    attempts: 2,
    correctAnswers: 9,
    incorrectAnswers: 1,
    lastStudied: "2026-08-26",
  },
  {
    studentId: "student-demo-1",
    topicId: "topic-math-algebra-basics",
    state: "NEEDS_REVISION",
    progress: 80,
    mastery: 60,
    attempts: 2,
    correctAnswers: 6,
    incorrectAnswers: 4,
    lastStudied: "2026-08-25",
  },
];