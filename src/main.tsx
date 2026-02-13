import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { TranslationProvider } from "./components/TranslationContext";
import RouteTracker from "./RouteTracker"; // Import the new RouteTracker component

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TranslationProvider>
        <RouteTracker />
        {/* {!hiddenRoutes.includes(window.location.pathname) && <Header />} */}
        <App />
      </TranslationProvider>
    </BrowserRouter>
  </StrictMode>
);
