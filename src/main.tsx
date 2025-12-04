import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastProvider } from "./components/toast/ToastContext";
import "./index.css";
import Header from "./components/Header";
const hiddenRoutes = ["/login", "/register"];
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        {!hiddenRoutes.includes(window.location.pathname) && <Header />}
        <App />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
