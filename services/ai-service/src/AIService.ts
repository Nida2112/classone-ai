import path from "path";
import { loadDocumentChunks } from "./rag/documentLoader";
import { retrieve } from "./rag";

export class AIService {
  private chunks;

  constructor() {
    const chunksPath = path.resolve(
      process.cwd(),
      "../../data/math9_chunks.json"
    );

    this.chunks = loadDocumentChunks(chunksPath);
  }

  generateTutorResponse(
    question: string,
    topic?: string
  ) {
    const query = topic
      ? `${topic} ${question}`
      : question;

    const results = retrieve(this.chunks, query, 3);

    if (results.length === 0) {
      return {
        mode: "rag",
        response:
          "I couldn't find this topic in the Class 9 FBISE Mathematics textbook. Try asking about a specific chapter or concept.",
        sources: [],
      };
    }

    const pages = results
      .map((result) => result.chunk.metadata.pageNumber)
      .join(", ");

    const lowerQuestion = question.toLowerCase();

    let response: string;

    if (
  lowerQuestion.includes("why do we square") ||
  lowerQuestion.includes("why square") ||
  lowerQuestion.includes("why are the differences squared")
) {
  response =
    `📚 **Why do we square the differences?**\n\n` +
    `When we find the distance between two points, we first find the horizontal and vertical differences:\n\n` +
    `**Δx = x₂ − x₁**\n` +
    `**Δy = y₂ − y₁**\n\n` +
    `These two differences represent the two shorter sides of a right triangle.\n\n` +
    `### 🧠 The important reason\n\n` +
    `The Pythagorean theorem tells us that for a right triangle:\n\n` +
    `**a² + b² = c²**\n\n` +
    `So we square the horizontal and vertical differences because the distance formula comes directly from the Pythagorean theorem.\n\n` +
    `### ✏️ Simple example\n\n` +
    `Suppose the horizontal difference is **3** and the vertical difference is **4**.\n\n` +
    `We square them:\n` +
    `**3² = 9**\n` +
    `**4² = 16**\n\n` +
    `Then add them:\n` +
    `**9 + 16 = 25**\n\n` +
    `Finally, take the square root:\n` +
    `**√25 = 5**\n\n` +
    `So the distance is **5 units**.\n\n` +
    `💡 **Remember:** We square the differences because the distance formula is based on the **Pythagorean theorem**.\n\n` +
    `📖 **Textbook:** Class 9 FBISE Mathematics — Coordinate Geometry ` +
    `(relevant pages: ${pages}).`;
} else if (lowerQuestion.includes("distance formula")) {
  response =
    `📚 **Let's learn the Distance Formula step-by-step!**\n\n` +
    `The distance formula helps us find the distance between two points on a coordinate plane.\n\n` +
    `### 📐 The Formula\n\n` +
    `If the two points are **A(x₁, y₁)** and **B(x₂, y₂)**, then:\n\n` +
    `**d = √[(x₂ − x₁)² + (y₂ − y₁)²]**\n\n` +
    `### 🧠 Why does it work?\n\n` +
    `Imagine the two points form a right triangle. ` +
    `The horizontal distance is **x₂ − x₁**, and the vertical distance is **y₂ − y₁**. ` +
    `The formula comes from the **Pythagorean theorem**.\n\n` +
    `### ✏️ Example\n\n` +
    `Suppose **A(1, 2)** and **B(4, 6)**.\n\n` +
    `Step 1: Find the difference between the x-coordinates:\n` +
    `**4 − 1 = 3**\n\n` +
    `Step 2: Find the difference between the y-coordinates:\n` +
    `**6 − 2 = 4**\n\n` +
    `Step 3: Put them into the formula:\n` +
    `**d = √(3² + 4²)**\n\n` +
    `Step 4: Simplify:\n` +
    `**d = √(9 + 16)**\n` +
    `**d = √25**\n` +
    `**d = 5 units**\n\n` +
    `### 💡 Remember\n\n` +
    `**Subtract → Square → Add → Square root**.\n\n` +
    `### 🎯 Quick Check\n\n` +
    `Try finding the distance between **A(2, 3)** and **B(5, 7)**. ` +
    `You can send me your answer and I'll help you check it step-by-step.\n\n` +
    `📖 **Textbook:** Class 9 FBISE Mathematics — Coordinate Geometry ` +
    `(relevant pages: ${pages}).`;
} else {
  response =
    `📚 **Let's learn this step-by-step!**\n\n` +
    `I found relevant material in your Class 9 FBISE Mathematics textbook.\n\n` +
    `### 📖 What your textbook says\n\n` +
    `${results[0].chunk.text.trim()}\n\n` +
    `### 🧠 Let's understand it\n\n` +
    `The important idea is to understand the concept first, then apply it to an example. ` +
    `If you tell me which part is confusing, I can break it down into smaller steps.\n\n` +
    `📖 **Textbook:** Class 9 FBISE Mathematics ` +
    `(relevant pages: ${pages}).`;
}

    return {
      mode: "rag",
      response,
      sources: results.map((result) => ({
        id: result.chunk.id,
        pageNumber: result.chunk.metadata.pageNumber,
        unit: result.chunk.metadata.unit,
        score: result.score,
      })),
    };
  }
}
