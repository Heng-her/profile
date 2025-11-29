import { Routes, Route } from "react-router-dom";
import PublicPage from "./page/Public";
import About from "./page/Public/about";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<h1>Contact Page</h1>} />

      {/* 404 Fallback */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
