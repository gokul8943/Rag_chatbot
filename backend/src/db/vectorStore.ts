import { QdrantClient } from "@qdrant/js-client-rest";

export const vectorStore = new QdrantClient({ url: process.env.QDRANT_URL! });

export async function search(queryEmbedding: number[]) {
  return vectorStore.search("news", {
    vector: queryEmbedding,
    limit: 3,
  });
}
