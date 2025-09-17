import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

export async function askGemini(query: string, context: string[]): Promise<string> {
  const prompt = `
Context:
${context.join("\n")}

Question:
${query}
  `;

  const { data } = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
      GEMINI_API_KEY,
    {
      contents: [{ parts: [{ text: prompt }] }],
    }
  );

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}
