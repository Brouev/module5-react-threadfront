import { Navigate, Outlet } from "react-router-dom";

function Guard({ currentUser }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default Guard;
