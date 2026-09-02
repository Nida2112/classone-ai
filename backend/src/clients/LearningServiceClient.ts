import { getJson } from "./httpClient";

export interface LearningProgress {
  studentId: string;
  topicId: string;
  state: string;
  progress: number;
  mastery: number;
  attempts: number;
  correctAnswers: number;
  incorrectAnswers: number;
  lastStudied?: string;
}

export type LearningProgressUpdate =
  Partial<
    Pick<
      LearningProgress,
      | "progress"
      | "mastery"
      | "attempts"
      | "correctAnswers"
      | "incorrectAnswers"
      | "state"
    >
  >;

export class LearningServiceClient {
  private readonly baseUrl =
    process.env.LEARNING_SERVICE_URL ||
    "http://localhost:4002";

  async getStudentProgress(
    studentId: string
  ): Promise<LearningProgress[]> {
    return getJson<LearningProgress[]>(
      `${this.baseUrl}/learning/${encodeURIComponent(studentId)}/progress`
    );
  }

  async getTopicProgress(
    studentId: string,
    topicId: string
  ): Promise<LearningProgress | null> {
    const response = await fetch(
      `${this.baseUrl}/learning/${encodeURIComponent(studentId)}/topics/${encodeURIComponent(topicId)}`
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        `Learning Service request failed with status ${response.status}`
      );
    }

    return response.json() as Promise<LearningProgress>;
  }

  async updateTopicProgress(
    studentId: string,
    topicId: string,
    updates: LearningProgressUpdate
  ): Promise<LearningProgress> {
    const response = await fetch(
      `${this.baseUrl}/learning/${encodeURIComponent(studentId)}/topics/${encodeURIComponent(topicId)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updates)
      }
    );

    if (!response.ok) {
      throw new Error(
        `Learning Service request failed with status ${response.status}`
      );
    }

    return response.json() as Promise<LearningProgress>;
  }
}
