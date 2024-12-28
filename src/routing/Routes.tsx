import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import PublicRoute from "./PublicRoute";
import LoginForm from "../components/Authentication/login/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import LeaveRequests from "../components/leaveRequests/LeaveRequestIndex";
import LeaveRequestForm from "../components/leaveRequests/CreateLeaveRequestForm";
import NotFound from "../components/common/Error/NotFound";
import LeaveTypesIndex from "../components/leaveTypes/LeaveTypesIndex";
import CreateLeaveType from "../components/leaveTypes/CreateLeaveType";
import EditLeaveType from "../components/leaveTypes/UpdateLeaveType";
import RegisterForm from "../components/Authentication/register/RegisterForm";
import HomePageRedirect from "../components/common/home/HomeRedirect";
import LeaveRequestDetails from "../components/leaveRequests/LeaveRequestDetails";
import LeaveRequestIndex from "../components/leaveRequests/LeaveRequestIndex";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />, // your main layout or wrapper
    children: [
      // If you want a real homepage, use a component:
      // {
      //   path: '',
      //   element: <LeaveRequestIndex />,
      // },
      // If you prefer to go straight to login when hitting '/',
      // you could do:
      { path: '', element: <Navigate to="/public/login" replace /> },

      {
        path: 'public',
        element: <PublicRoute />,
        children: [
          { path: 'login', element: <LoginForm /> },
          { path: 'register', element: <RegisterForm /> },
        ],
      },
      {
        path: 'leaverequests',
        element: <ProtectedRoute />,
        children: [
          { path: '', element: <LeaveRequests /> },
          { path: 'create', element: <LeaveRequestForm /> },
        ],
      },
      {
        path: 'admin/leavetypes',
        element: <ProtectedRoute />,
        children: [
          { path: '', element: <LeaveTypesIndex /> },
          { path: 'create', element: <CreateLeaveType /> },
          { path: 'edit/:id', element: <EditLeaveType /> },
        ],
      },
    ],
  },
  {
    path: 'not-found',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate replace to="/not-found" />,
  },
];

export const router = createBrowserRouter(routes);