import axios from 'axios';

// Define your bot token and group ID
const TELEGRAM_BOT_TOKEN = "7942841245:AAFe2zTPRsa1R5FpTeZQD2co0J726lQgnMM";
const TELEGRAM_GROUP_ID = "-1003527366189";

// Function to send a message to the group
async function sendTelegramNotification(message : string) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const params = {
    chat_id: TELEGRAM_GROUP_ID,
    text: message,
  };

  try {
    await axios.post(url, params);
    console.log('Notification sent to Telegram group');
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
}
export { sendTelegramNotification };