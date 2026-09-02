export interface Subject {
  id: string;
  name: string;
  classLevel: number;
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

export interface Curriculum {
  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];
}

export class CurriculumServiceClient {
  private readonly baseUrl =
    process.env.CURRICULUM_SERVICE_URL ||
    "http://localhost:4004";

  async getCurriculum(): Promise<Curriculum> {
    const response = await fetch(
      `${this.baseUrl}/curriculum`
    );

    if (!response.ok) {
      throw new Error(
        `Curriculum Service request failed with status ${response.status}`
      );
    }

    return response.json() as Promise<Curriculum>;
  }

  async getSubjects(): Promise<Subject[]> {
    const response = await fetch(
      `${this.baseUrl}/subjects`
    );

    if (!response.ok) {
      throw new Error(
        `Curriculum Service request failed with status ${response.status}`
      );
    }

    return response.json() as Promise<Subject[]>;
  }

  async getChapters(): Promise<Chapter[]> {
    const response = await fetch(
      `${this.baseUrl}/chapters`
    );

    if (!response.ok) {
      throw new Error(
        `Curriculum Service request failed with status ${response.status}`
      );
    }

    return response.json() as Promise<Chapter[]>;
  }

  async getTopics(): Promise<Topic[]> {
    const response = await fetch(
      `${this.baseUrl}/topics`
    );

    if (!response.ok) {
      throw new Error(
        `Curriculum Service request failed with status ${response.status}`
      );
    }

    return response.json() as Promise<Topic[]>;
  }
}
