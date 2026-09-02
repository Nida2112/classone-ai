# ClassOne AI — Mathematics RAG ingestion

This ingestion script is designed for the uploaded scanned Class 9 FBISE Mathematics textbook.

## Windows setup

From the project root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r scripts/rag/math9/requirements.txt
```

Tesseract OCR must also be installed and available as `tesseract` on PATH.

## Test on the first 10 pages

```powershell
python scripts/rag/math9/ingest_textbook.py "path\to\9 Mathematics Book FBISE (Study++).pdf" --start 1 --end 10 --output data/math9_chunks_test.json
```

## Full ingestion

```powershell
python scripts/rag/math9/ingest_textbook.py "path\to\9 Mathematics Book FBISE (Study++).pdf" --output data/math9_chunks.json
```

The output is JSON chunks with FBISE/Class 9/Mathematics/unit/page metadata, ready for the embedding/vector-search stage.
