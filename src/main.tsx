import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Header from "./components/Header";
import { TranslationProvider } from "./components/TranslationContext";
const hiddenRoutes = ["/login", "/register"];
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TranslationProvider>
        {!hiddenRoutes.includes(window.location.pathname) && <Header />}
        <App />
      </TranslationProvider>
    </BrowserRouter>
  </StrictMode>
);
