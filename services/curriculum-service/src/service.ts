import {
  CurriculumRepository,
} from "./repository";

export class CurriculumService {
  constructor(
    private readonly curriculumRepository =
      new CurriculumRepository()
  ) {}

  getCurriculum() {
    return {
      subjects:
        this.curriculumRepository.getSubjects(),
      chapters:
        this.curriculumRepository.getChapters(),
      topics:
        this.curriculumRepository.getTopics(),
    };
  }

  getSubjects() {
    return this.curriculumRepository
      .getSubjects();
  }

  getChapters() {
    return this.curriculumRepository
      .getChapters();
  }

  getTopics() {
    return this.curriculumRepository
      .getTopics();
  }

  getChaptersBySubject(
    subjectId: string
  ) {
    return this.curriculumRepository
      .getChaptersBySubject(subjectId);
  }

  getTopicsByChapter(
    chapterId: string
  ) {
    return this.curriculumRepository
      .getTopicsByChapter(chapterId);
  }
}
