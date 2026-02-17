import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios, { AxiosError } from "axios";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

// Helper function to send a message
async function sendMessage(chatId: number, text: string) {
  try {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });
  } catch (error) {
    console.error("Error sending message to Telegram:", error instanceof AxiosError ? error.response?.data : error);
  }
}

// Main handler for incoming requests
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const message = req.body?.message;
  const chatId = message?.chat?.id;
  const text = message?.text?.toLowerCase(); // Convert to lower case for case-insensitive matching

  if (!chatId || !text) {
    return res.status(200).send("OK"); // Acknowledge request but do nothing if essential data is missing
  }

  let responseText: string;

  switch (text) {
    case "/start":
      responseText = "Hello 👋 I am running on Vercel!";
      break;
    case "hi":
    case "hello":
      responseText = "Hello there 😄";
      break;
    default:
      responseText = "Sorry, I don't understand that command.";
      break;
  }

  await sendMessage(chatId, responseText);

  return res.status(200).send("ok");
}
