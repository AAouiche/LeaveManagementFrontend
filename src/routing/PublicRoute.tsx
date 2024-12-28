import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/Store";

const PublicRoute: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/leaverequests" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;