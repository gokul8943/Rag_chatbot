import { embedText } from "./jina";
import { search } from "../db/vectorStore";

export async function retrievePassages(query: string): Promise<string[]> {
  const queryEmbedding = await embedText(query);
  const results = await search(queryEmbedding);
  return results.map((r: any) => r.payload.text);
}
