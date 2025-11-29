import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = Cookies.get("token"); // 👈 read token from cookies

  if (!token) {
    return <Navigate to="/login" replace />; // redirect if no token
  }

  return children; // allow access
}
