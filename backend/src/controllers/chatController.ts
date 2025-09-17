import { Request, Response } from "express";
import { clearHistory, getHistory, saveMessage } from "../services/redis";
import { retrievePassages } from "../services/retriever";
import { askGemini } from "../services/gemini";


export const chat =  async (req:Request, res:Response) => {
    try {
    const { sessionId } = req.params;
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    await saveMessage(sessionId, "user", query);


    const passages = await retrievePassages(query);

 
    const answer = await askGemini(query, passages);

    await saveMessage(sessionId, "bot", answer);

    res.json({ answer, sources: passages });
  } catch (error: any) {
    console.error("Error in chat route:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export const history = async (req:Request, res:Response) => {
     try {
    const { sessionId } = req.params;
    const history = await getHistory(sessionId as any);
    res.json({ sessionId, history });
  } catch (error: any) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}

export const deleteHistory = async (req:Request, res:Response) => {
      try {
    const { sessionId } = req.params;
    await clearHistory(sessionId as any);
    res.json({ message: `Session ${sessionId} cleared` });
  } catch (error: any) {
    console.error("Error clearing history:", error);
    res.status(500).json({ error: "Failed to clear history" });
  }
}
