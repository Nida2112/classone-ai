import { StudentRepository } from "./repository";

export class StudentService {
  constructor(
    private readonly studentRepository = new StudentRepository()
  ) {}

  getStudent(id: string) {
    return this.studentRepository.findById(id);
  }

  getStudents() {
    return this.studentRepository.findAll();
  }
}
