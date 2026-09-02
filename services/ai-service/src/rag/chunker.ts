import { DocumentChunk } from "./types";

export function chunkText(
  text: string,
  maxChars: number = 1400,
  overlap: number = 180
): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();

  if (!cleaned) {
    return [];
  }

  const sentences = cleaned.split(/(?<=[.!?])\s+/);

  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (!sentence) continue;

    const candidate = current
      ? `${current} ${sentence}`
      : sentence;

    if (current && candidate.length > maxChars) {
      chunks.push(current);

      const tail = current.slice(-overlap);
      current = `${tail} ${sentence}`.trim();
    } else {
      current = candidate;
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

export function createDocumentChunks(
  text: string,
  metadata: DocumentChunk["metadata"],
  prefix: string
): DocumentChunk[] {
  return chunkText(text).map((chunk, index) => ({
    id: `${prefix}-${index.toString().padStart(3, "0")}`,
    text: chunk,
    metadata,
  }));
}
