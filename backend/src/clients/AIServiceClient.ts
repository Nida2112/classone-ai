export interface AIResponse {
  mode: string;
  response: string;
  sources: Array<{
    id: string;
    pageNumber: number;
    unit?: string;
    score: number;
  }>;
}

export class AIServiceClient {
  private readonly baseUrl =
    process.env.AI_SERVICE_URL ||
    "http://localhost:4005";

  async chat(
    question: string,
    topic?: string
  ): Promise<AIResponse> {
    const response = await fetch(
      `${this.baseUrl}/ai/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          topic,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `AI Service request failed with status ${response.status}`
      );
    }

    return response.json() as Promise<AIResponse>;
  }
}
