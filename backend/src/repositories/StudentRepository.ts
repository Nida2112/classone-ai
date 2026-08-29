import { students } from "../db/seed";
import { Student } from "../types";

export class StudentRepository {
  findById(id: string): Student | undefined {
    return students.find((student) => student.id === id);
  }

  findAll(): Student[] {
    return students;
  }
}