import {
  subjects,
  chapters,
  topics,
} from "./seed";

export class CurriculumRepository {
  getSubjects(): typeof subjects {
    return subjects;
  }

  getChapters(): typeof chapters {
    return chapters;
  }

  getTopics(): typeof topics {
    return topics;
  }

  getChaptersBySubject(
    subjectId: string
  ) {
    return chapters.filter(
      (chapter) =>
        chapter.subjectId === subjectId
    );
  }

  getTopicsByChapter(
    chapterId: string
  ) {
    return topics.filter(
      (topic) =>
        topic.chapterId === chapterId
    );
  }
}
