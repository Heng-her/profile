import { Routes, Route } from "react-router-dom";
import PublicPage from "./page/Public";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./page/Dashboard/dashboard";
import Register from "./page/auth/register";
import Contact from "./page/Public/contact";
import Verify from "./page/Verify";
import UserProfile from "./page/Public/user";
import { Login } from "./page/auth/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/:username" element={<UserProfile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/verify" element={<Verify />} />
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
