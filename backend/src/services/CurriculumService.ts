import { CurriculumRepository } from "../repositories/CurriculumRepository";

export class CurriculumService {
  constructor(
    private readonly curriculumRepository =
      new CurriculumRepository()
  ) {}

  getCurriculum() {
    return this.curriculumRepository.getAll();
  }

  getSubjects(classLevel: number) {
    return this.curriculumRepository.getSubjects(classLevel);
  }

  getChapters(subjectId: string) {
    return this.curriculumRepository.getChapters(subjectId);
  }

  getTopics(chapterId: string) {
    return this.curriculumRepository.getTopics(chapterId);
  }
}