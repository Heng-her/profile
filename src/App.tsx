import { Routes, Route } from "react-router-dom";
import PublicPage from "./page/Public";
import About from "./page/Public/about";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./page/Dashboard/dashboard";
import Login from "./page/auth/login";
import Contact from "./page/Public/contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* 404 Fallback */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
