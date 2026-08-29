import {
  Student,
  Subject,
  Chapter,
  Topic,
  LearningProgress,
  Assessment,
  AssessmentQuestion,
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
export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q-phy-motion-1",
    topicId: "topic-phy-motion-basics",
    question: "Which quantity describes how fast an object changes its position?",
    type: "MCQ",
    options: ["Speed", "Mass", "Density", "Temperature"],
    correctAnswer: "Speed",
  },
  {
    id: "q-phy-motion-2",
    topicId: "topic-phy-motion-basics",
    question: "Velocity has both magnitude and direction.",
    type: "TRUE_FALSE",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: "q-phy-measurement-1",
    topicId: "topic-phy-measurement",
    question: "What is the SI unit of length?",
    type: "MCQ",
    options: ["Metre", "Kilogram", "Second", "Newton"],
    correctAnswer: "Metre",
  },
  {
    id: "q-math-number-1",
    topicId: "topic-math-number-systems",
    question: "Which of the following is an irrational number?",
    type: "MCQ",
    options: ["2", "0.5", "√2", "4"],
    correctAnswer: "√2",
  },
  {
    id: "q-math-algebra-1",
    topicId: "topic-math-algebra-basics",
    question: "Is 3x + 2 an algebraic expression?",
    type: "TRUE_FALSE",
    options: ["True", "False"],
    correctAnswer: "True",
  },
];

export const assessments: Assessment[] = [
  {
    id: "assessment-phy-motion",
    title: "Physics — Motion Quiz",
    topicId: "topic-phy-motion-basics",
    questionIds: [
      "q-phy-motion-1",
      "q-phy-motion-2",
    ],
  },
  {
    id: "assessment-phy-measurement",
    title: "Physics — Measurement Quiz",
    topicId: "topic-phy-measurement",
    questionIds: [
      "q-phy-measurement-1",
    ],
  },
  {
    id: "assessment-math-number",
    title: "Mathematics — Number Systems Quiz",
    topicId: "topic-math-number-systems",
    questionIds: [
      "q-math-number-1",
    ],
  },
  {
    id: "assessment-math-algebra",
    title: "Mathematics — Algebra Quiz",
    topicId: "topic-math-algebra-basics",
    questionIds: [
      "q-math-algebra-1",
    ],
  },
];