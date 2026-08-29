import {
  subjects,
  chapters,
  topics,
} from "../db/seed";

export class CurriculumRepository {
  getSubjects(classLevel: number) {
    return subjects.filter(
      (subject) => subject.classLevel === classLevel
    );
  }

  getChapters(subjectId: string) {
    return chapters.filter(
      (chapter) => chapter.subjectId === subjectId
    );
  }

  getTopics(chapterId: string) {
    return topics.filter(
      (topic) => topic.chapterId === chapterId
    );
  }

  getAll() {
    return {
      subjects,
      chapters,
      topics,
    };
  }
}