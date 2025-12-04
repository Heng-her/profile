import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Header from "./components/Header";
const hiddenRoutes = ["/login", "/register"];
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {!hiddenRoutes.includes(window.location.pathname) && <Header />}
        <App />
    </BrowserRouter>
  </StrictMode>
);
