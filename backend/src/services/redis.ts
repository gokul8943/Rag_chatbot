import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL });
redis.connect();

export async function saveMessage(sessionId: string, role: "user" | "bot", text: string) {
  await redis.rPush(`session:${sessionId}`, JSON.stringify({ role, text }));
  await redis.expire(`session:${sessionId}`, 1800); // TTL 30min
}

export async function getHistory(sessionId: string) {
  const messages = await redis.lRange(`session:${sessionId}`, 0, -1);
  return messages.map((m) => JSON.parse(m));
}

export async function clearHistory(sessionId: string) {
  await redis.del(`session:${sessionId}`);
}
