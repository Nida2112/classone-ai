import {
  AIServiceClient,
} from "../clients/AIServiceClient";

export class AIService {
  constructor(
    private readonly aiServiceClient =
      new AIServiceClient()
  ) {}

  generateTutorResponse(
    question: string,
    topic?: string
  ) {
    return this.aiServiceClient.chat(
      question,
      topic
    );
  }
}
