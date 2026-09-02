from __future__ import annotations

import json
import sys
from pathlib import Path


def load_chunks(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def search(chunks, query: str, top_k: int = 3):
    query_words = set(query.lower().split())

    scored = []

    for chunk in chunks:
        text = chunk["text"].lower()

        score = sum(
            1 for word in query_words
            if len(word) > 2 and word in text
        )

        if score > 0:
            scored.append((score, chunk))

    scored.sort(key=lambda item: item[0], reverse=True)

    return scored[:top_k]


def main():
    if len(sys.argv) < 2:
        print(
            "Usage: python test_retrieval.py <json_file>"
        )
        sys.exit(1)

    json_path = Path(sys.argv[1])

    if not json_path.exists():
        print(f"File not found: {json_path}")
        sys.exit(1)

    chunks = load_chunks(json_path)

    print(f"Loaded {len(chunks)} chunks.")
    print()

    queries = [
        "What is the Trichotomy Property?",
        "What are the properties of equality?",
        "What is a principal square root?",
        "What is the product rule for radicals?",
        "What are rational exponents?",
        "What is the distance formula?",
        "By Distance Formula, distance between two points",
    ]

    for query in queries:
        print("=" * 70)
        print(f"QUERY: {query}")
        print("=" * 70)

        results = search(chunks, query)

        if not results:
            print("No results found.")
            print()
            continue

        for rank, (score, chunk) in enumerate(results, start=1):
            metadata = chunk["metadata"]

            print(
                f"\n#{rank} | score={score} | "
                f"page={metadata['pageNumber']} | "
                f"chunk={chunk['id']}"
            )

            print(chunk["text"][:800])
            print()


if __name__ == "__main__":
    main()