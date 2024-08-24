import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/Store";

export default function PublicRoute() {
    const isLoggedIn = useSelector((state:RootState) => state.user.isLoggedIn);
  
   
    if (isLoggedIn) {
      return <Navigate to="/dashboard" />;
    }
  

    return <Outlet />;
  }