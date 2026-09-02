export class StudentServiceClient {
  private readonly baseUrl =
    process.env.STUDENT_SERVICE_URL || "http://localhost:4001";

  async getStudent(id: string) {
    const response = await fetch(
      `${this.baseUrl}/students/${encodeURIComponent(id)}`
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        `Student Service request failed with status ${response.status}`
      );
    }

    return response.json();
  }
}
