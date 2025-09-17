import express from "express";

const router = express.Router();
import { chat, history, deleteHistory } from "../controllers/chatController";
router.post("/chat/:sessionId", chat);
router.get("/history/:sessionId", history);
router.delete("/history/:sessionId", deleteHistory);