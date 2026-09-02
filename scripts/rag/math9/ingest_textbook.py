from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import pypdfium2 as pdfium
import pytesseract
from PIL import Image, ImageEnhance, ImageFilter


UNITS = [
    (1, "Real Numbers", 5),
    (2, "Logarithms", 26),
    (3, "Sets and Relations", 45),
    (4, "Factorization and Algebraic Manipulation", 69),
    (5, "Linear Equations and Inequalities", 99),
    (6, "Trigonometry and Bearing", 113),
    (7, "Coordinate Geometry", 144),
    (8, "Geometry of Straight Lines", 158),
    (9, "Geometry and Polygons", 186),
    (10, "Practical Geometry", 228),
    (11, "Basic Statistics", 238),
]


# Repeated textbook text that is not useful for RAG retrieval.
REMOVE_PATTERNS = [
    r"National Book Foundation",
    r"Federal Textbook Board",
    r"Unit-\d+\s+Real Numbers",
]


def fix_encoding(text: str) -> str:
    """
    Repair common UTF-8 -> Latin-1/Windows-1252 mojibake.
    Example:
        â€™ -> ’
        Â©  -> ©
    """

    if not text:
        return ""

    # Try the most common mojibake repair first.
    if any(marker in text for marker in ("Ã", "Â", "â", "ð")):
        try:
            repaired = text.encode("latin1").decode("utf-8")
            text = repaired
        except (UnicodeEncodeError, UnicodeDecodeError):
            pass

    return text


def normalize_symbols(text: str) -> str:
    """
    Normalize Unicode punctuation and common OCR symbols while
    preserving mathematical meaning.
    """

    replacements = {
        "\x0c": " ",
        "’": "'",
        "‘": "'",
        "“": '"',
        "”": '"',
        "–": "-",
        "—": "-",
        "−": "-",
        "…": "...",
        "\u00a0": " ",
        "\t": " ",
    }

    for old, new in replacements.items():
        text = text.replace(old, new)

    return text


def repair_common_ocr(text: str) -> str:
    """
    Fix only very common OCR errors.

    We deliberately avoid aggressive spelling correction because
    mathematical terminology, variables, and examples can otherwise
    be damaged.
    """

    replacements = {
        "belicVe": "believe",
        "Conftjbution": "Contribution",
        "aumbers": "numbers",
        "numbets": "numbers",
        "musltiplicatic": "multiplication",
        "moliptiontiye": "multiplicative",
        "Moliptiontiye": "Multiplicative",
        "nolldW": "hollow",
        "rÃ©views": "reviews",
        "introdiiced": "introduced",
        "extenSive": "extensive",
        "friÃ©ndly": "friendly",
        "squarÃ©\\roots": "square roots",
        "cubie roat": "cubic root",
        "Intemational": "International",
        "Curriculm": "Curriculum",
        "Deparment": "Department",
        "Headquarter": "Headquarters",
        "institutions": "institutions",
    }

    for old, new in replacements.items():
        text = text.replace(old, new)

    return text


def remove_noise(text: str) -> str:
    """
    Remove repeated headers/footers and obvious OCR noise.
    """

    for pattern in REMOVE_PATTERNS:
        text = re.sub(pattern, " ", text, flags=re.IGNORECASE)

    # Remove isolated page numbers.
    text = re.sub(r"(?<!\w)\d{1,3}(?!\w)", " ", text)

    # Remove repeated vertical bars and decorative OCR characters.
    text = re.sub(r"[|]{2,}", " ", text)

    # Remove extremely common decorative fragments.
    text = re.sub(r"\s+[•·]{2,}\s+", " ", text)

    return text


def clean_text(text: str) -> str:
    """
    Full text-cleaning pipeline.
    """

    text = fix_encoding(text)
    text = normalize_symbols(text)
    text = repair_common_ocr(text)
    text = remove_noise(text)

    # Normalize whitespace.
    text = re.sub(r"\s+", " ", text).strip()

    return text


def unit_for_page(page_number: int):
    current = UNITS[0]

    for unit in UNITS:
        if page_number >= unit[2]:
            current = unit
        else:
            break

    return current


def split_long_text(text: str, max_chars: int = 1400, overlap: int = 180):
    """
    Split OCR text into RAG-friendly chunks.

    We prefer sentence boundaries but also have a hard fallback
    for pages containing equations/tables where OCR produces
    unusually long runs without punctuation.
    """

    text = clean_text(text)

    if not text:
        return []

    sentences = re.split(r"(?<=[.!?])\s+", text)

    chunks = []
    current = ""

    for sentence in sentences:
        sentence = sentence.strip()

        if not sentence:
            continue

        # If a single OCR sentence is extremely long, split it safely.
        if len(sentence) > max_chars:
            if current:
                chunks.append(current)
                current = ""

            start = 0

            while start < len(sentence):
                end = start + max_chars
                piece = sentence[start:end].strip()

                if piece:
                    chunks.append(piece)

                start = max(
                    end - overlap,
                    start + 1
                )

            continue

        candidate = f"{current} {sentence}".strip()

        if current and len(candidate) > max_chars:
            chunks.append(current)

            tail = current[-overlap:]
            current = f"{tail} {sentence}".strip()
        else:
            current = candidate

    if current:
        chunks.append(current)

    return chunks


def preprocess_image(image: Image.Image) -> Image.Image:
    """
    Improve OCR readability using grayscale, contrast,
    sharpening and thresholding.
    """

    image = image.convert("L")

    image = ImageEnhance.Contrast(image).enhance(1.5)

    image = image.filter(ImageFilter.SHARPEN)

    # Keep grayscale rather than using an aggressive binary threshold.
    # This generally preserves mathematical symbols better.
    return image


def ocr_page(page, scale: float = 2.2) -> str:
    """
    Render a PDF page at higher resolution and run Tesseract OCR.
    """

    bitmap = page.render(scale=scale)

    pil_image = bitmap.to_pil()

    pil_image = preprocess_image(pil_image)

    return pytesseract.image_to_string(
        pil_image,
        config="--psm 6 -c preserve_interword_spaces=1",
        lang="eng",
    )


def main():
    parser = argparse.ArgumentParser(
        description=(
            "OCR and chunk the Class 9 FBISE Mathematics "
            "textbook for RAG."
        )
    )

    parser.add_argument(
        "pdf",
        type=Path,
        help="Path to the textbook PDF",
    )

    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/math9_chunks.json"),
        help="Output JSON file",
    )

    parser.add_argument(
        "--start",
        type=int,
        default=1,
        help="First page to process",
    )

    parser.add_argument(
        "--end",
        type=int,
        default=None,
        help="Last page to process",
    )

    parser.add_argument(
        "--scale",
        type=float,
        default=2.2,
        help="PDF rendering scale for OCR",
    )

    args = parser.parse_args()

    if not args.pdf.exists():
        raise FileNotFoundError(
            f"PDF not found: {args.pdf.resolve()}"
        )

    doc = pdfium.PdfDocument(str(args.pdf))

    total_pages = len(doc)

    start = max(1, args.start)
    end = min(total_pages, args.end or total_pages)

    if start > end:
        raise ValueError(
            f"Invalid page range: {start}-{end}"
        )

    chunks = []

    for page_number in range(start, end + 1):
        page = doc[page_number - 1]

        try:
            raw = ocr_page(page, args.scale)
            text_chunks = split_long_text(raw)

            unit_number, unit_title, _ = unit_for_page(
                page_number
            )

            for index, text in enumerate(text_chunks):
                chunks.append(
                    {
                        "id": (
                            f"math9-p{page_number:03d}-"
                            f"{index:03d}"
                        ),
                        "text": text,
                        "metadata": {
                            "board": "FBISE",
                            "classLevel": 9,
                            "subject": "Mathematics",
                            "unit": unit_title,
                            "unitNumber": unit_number,
                            "pageNumber": page_number,
                            "source": (
                                "9 Mathematics Book FBISE "
                                "(Study++)"
                            ),
                        },
                    }
                )

            print(
                f"OCR page {page_number}/{end}: "
                f"{len(text_chunks)} chunks"
            )

        finally:
            page.close()

    args.output.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    args.output.write_text(
        json.dumps(
            chunks,
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    print()
    print(
        f"Wrote {len(chunks)} chunks to "
        f"{args.output}"
    )


if __name__ == "__main__":
    main()
