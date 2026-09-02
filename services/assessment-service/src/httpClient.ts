export async function getJson<T>(
  url: string
): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `HTTP request failed with status ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}

export async function patchJson<T>(
  url: string,
  body: unknown
): Promise<T> {
  const response = await fetch(
    url,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error(
      `HTTP request failed with status ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}
