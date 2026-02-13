import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendTelegramNotification } from "./service/botTelegram"; // Assuming this function is properly set up

const RouteTracker = () => {
  const location = useLocation(); // This gives us the pathname, search, and hash of the URL

  useEffect(() => {
    // Get the full URL (including domain, path, query params, hash)
    const fullUrl = window.location.href;

    // Send the full URL as a notification to Telegram
    sendTelegramNotification(`Bot started From: ${fullUrl}`);
  }, [location]); // Runs whenever the route changes

  return null; // This component does not render anything
};

export default RouteTracker;
