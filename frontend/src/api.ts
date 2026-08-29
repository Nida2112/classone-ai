const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function fetchStudent(studentId: string) {
  const response = await fetch(
    `${API_BASE_URL}/students/${studentId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch student");
  }

  return response.json();
}

export async function fetchCurriculum() {
  const response = await fetch(
    `${API_BASE_URL}/curriculum`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch curriculum");
  }

  return response.json();
}

export async function fetchProgress(studentId: string) {
  const response = await fetch(
    `${API_BASE_URL}/learning/${studentId}/progress`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch progress");
  }

  return response.json();
}