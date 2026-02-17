import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const message = req.body?.message;
  const chatId = message?.chat?.id;
  const text = message?.text;

  if (text === "/start") {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: "Hello 👋 I am running on Vercel!"
    });
  }

  if (text === "hi") {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: "Hello there 😄"
    });
  }

  return res.status(200).send("ok");
}
