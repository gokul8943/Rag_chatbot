import express from "express";

const router = express.Router();
import { chat, history, deleteHistory } from "../controllers/chatController";

router.post("/:sessionId", chat);
router.get("/:sessionId", history);
router.delete("/:sessionId", deleteHistory);

export default router;