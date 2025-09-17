import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { embedText } from "../services/jina";
import { vectorStore } from "../db/vectorStore";

// Example: fetch articles from Reuters RSS
export async function ingestArticles() {
  const rssUrl =
    "https://www.reuters.com/arc/outboundfeeds/sitemap-index/?outputType=xml";
  const { data } = await axios.get(rssUrl);

  // TODO: parse XML → article links → fetch article text
  // For demo, hardcoding articles
  const articles = [
    { title: "Election 2024", content: "The US elections saw record turnout..." },
    { title: "Tech News", content: "Apple released its latest iPhone model..." },
  ];

  for (const article of articles) {
    const chunks = splitIntoChunks(article.content, 500);
    for (const chunk of chunks) {
      const embedding = await embedText(chunk);
      await vectorStore.upsert({
        id: uuidv4(),
        values: embedding,
        metadata: { text: chunk, title: article.title },
      });
    }
  }
}

function splitIntoChunks(text: string, size: number): string[] {
  const words = text.split(" ");
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }
  return chunks;
}
