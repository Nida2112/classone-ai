import {
  getJson,
  patchJson,
} from "./httpClient";

import {
  LearningProgress,
  LearningProgressUpdate,
} from "./types";

export class LearningServiceClient {
  private readonly baseUrl =
    process.env.LEARNING_SERVICE_URL ||
    "http://localhost:4002";

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
    return patchJson<LearningProgress>(
      `${this.baseUrl}/learning/${encodeURIComponent(studentId)}/topics/${encodeURIComponent(topicId)}`,
      updates
    );
  }
}
