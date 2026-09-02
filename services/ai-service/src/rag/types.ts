export interface DocumentChunk {
  id: string;
  text: string;

  metadata: {
    board: "FBISE";
    classLevel: 9;
    subject: "Mathematics";
    unit: string;
    unitNumber: number;
    pageNumber: number;
    source: string;
  };
}