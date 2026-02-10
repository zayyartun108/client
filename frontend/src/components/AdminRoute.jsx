import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isStaff = localStorage.getItem("is_staff");

  if (isStaff === "true") {
    return children; // Admin only
  } else {
    return <Navigate to="/login" />; // Not admin -> login page
  }
}
