import axios from "axios";

const JINA_API_URL = "https://api.jina.ai/v1/embeddings";
const JINA_API_KEY = process.env.JINA_API_KEY!;

export async function embedText(text: string): Promise<number[]> {
  const { data } = await axios.post(
    JINA_API_URL,
    { input: text, model: "jina-embeddings-v2-base-en" },
    { headers: { Authorization: `Bearer ${JINA_API_KEY}` } }
  );
  return data.data[0].embedding;
}
