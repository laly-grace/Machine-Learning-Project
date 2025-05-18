// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token"); // check if token exists
  return isAuthenticated ? children : <Navigate to="/" />;
}
