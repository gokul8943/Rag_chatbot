import { QdrantClient } from "@qdrant/js-client-rest";

export const vectorStore = new QdrantClient({
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY, 
 }as any);


export async function initCollection() {
  await vectorStore.createCollection("news", {
    vectors: { size: 768, distance: "Cosine" }, 
  }).catch((err) => {
    if (!String(err).includes("already exists")) {
      throw err;
    }
  });
}
