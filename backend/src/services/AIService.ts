export class AIService {
  generateTutorResponse(
    question: string,
    topic?: string
  ) {
    const context = topic
      ? ` about ${topic}`
      : "";

    return {
      mode: "demo",
      response:
        `Let's work through your question${context}. ` +
        `Start by identifying the key concept involved, ` +
        `then break the problem into smaller steps.`,
    };
  }
}