import { NextResponse } from "next/server";

/*
Phase 2 design stub:

- Source corpus: embed blog MDX plus structured project metadata from `data/projects.ts`.
- Retrieval store: pgvector-backed semantic search with metadata filters for post/project/document type.
- Generation model: Claude Haiku for low-latency answer synthesis over retrieved snippets.
- Abuse controls: per-IP rate limiting plus a hard daily request cap before the model layer runs.
- API shape: accept a user question, retrieve relevant chunks, synthesize an answer with citations,
  and return both the answer and supporting source references.
*/

export async function POST() {
  return NextResponse.json({ error: "Not implemented." }, { status: 501 });
}

export async function GET() {
  return NextResponse.json({ error: "Not implemented." }, { status: 501 });
}
