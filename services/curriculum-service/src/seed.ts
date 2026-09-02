import {
  Subject,
  Chapter,
  Topic,
} from "./types";

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
