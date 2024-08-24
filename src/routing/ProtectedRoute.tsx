import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  
    const isLoggedIn = useSelector((state :RootState) => state.user.isLoggedIn);
  
    if (!isLoggedIn) {
      console.log('Redirecting to /login');
      return <Navigate to="/login" />;
    }
  
    console.log('Rendering Outlet');
    return <Outlet />;
  }