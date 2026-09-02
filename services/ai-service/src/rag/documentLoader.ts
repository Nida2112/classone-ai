import fs from "fs";
import path from "path";
import { DocumentChunk } from "./types";

export function loadDocumentChunks(filePath: string): DocumentChunk[] {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`RAG document not found: ${absolutePath}`);
  }

  const raw = fs.readFileSync(absolutePath, "utf-8");
  const chunks = JSON.parse(raw) as DocumentChunk[];

  if (!Array.isArray(chunks)) {
    throw new Error("RAG document must contain a JSON array of chunks.");
  }

  return chunks;
}
