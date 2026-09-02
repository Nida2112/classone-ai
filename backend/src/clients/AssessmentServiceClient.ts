export interface AssessmentQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface AssessmentAttempt {
  id: string;
  studentId: string;
  questionId: string;
  answer: string;
  correct: boolean;
}

export class AssessmentServiceClient {
  private readonly baseUrl =
    process.env.ASSESSMENT_SERVICE_URL ||
    "http://localhost:4003";

  async getQuestions(topicId: string) {
    const response = await fetch(
      `${this.baseUrl}/assessments/topic/${encodeURIComponent(topicId)}/questions`
    );

    if (!response.ok) {
      throw new Error(
        `Assessment Service request failed with status ${response.status}`
      );
    }

    return response.json() as Promise<AssessmentQuestion[]>;
  }

  async submitAnswer(
    studentId: string,
    questionId: string,
    answer: string
  ) {
    const response = await fetch(
      `${this.baseUrl}/assessments/student/${encodeURIComponent(studentId)}/question/${encodeURIComponent(questionId)}/answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Assessment Service request failed with status ${response.status}`
      );
    }

    return response.json() as Promise<AssessmentAttempt>;
  }

  async getStudentAttempts(studentId: string) {
    const response = await fetch(
      `${this.baseUrl}/assessments/student/${encodeURIComponent(studentId)}/attempts`
    );

    if (!response.ok) {
      throw new Error(
        `Assessment Service request failed with status ${response.status}`
      );
    }

    return response.json() as Promise<AssessmentAttempt[]>;
  }
}
