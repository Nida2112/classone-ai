import { getJson } from "../clients/httpClient";

export class StudentService {
  private readonly studentServiceUrl =
    process.env.STUDENT_SERVICE_URL || "http://localhost:4001";

  async getStudent(id: string) {
    try {
      return await getJson(
        `${this.studentServiceUrl}/students/${encodeURIComponent(id)}`
      );
    } catch (error: any) {
      if (error?.message?.includes("status 404")) {
        return undefined;
      }

      throw error;
    }
  }

  async getStudents() {
    return getJson(
      `${this.studentServiceUrl}/students`
    );
  }
}
