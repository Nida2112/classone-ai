export async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `HTTP request failed with status ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}
