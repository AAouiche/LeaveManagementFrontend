import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    console.log('Redirecting to /public/login');
    return <Navigate to="/public/login" />;
  }

  console.log('Rendering Outlet');
  return <Outlet />;
}