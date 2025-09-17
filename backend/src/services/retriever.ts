import { embedText } from "./jina";
import { vectorStore } from "../db/vectorStore";

export async function retrievePassages(query: string): Promise<string[]> {
  const queryEmbedding = await embedText(query);

  const results = await vectorStore.search("news", {
    vector: queryEmbedding,
    limit: 3,
  });

  return results.map((r: any) => r.payload.text);
}
