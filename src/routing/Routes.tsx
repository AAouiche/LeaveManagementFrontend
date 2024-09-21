import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../App";
import PublicRoute from "./PublicRoute";
import LoginForm from "../components/Authentication/login/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import LeaveRequests from "../components/leaveRequests/LeaveRequestIndex";
import LeaveRequestForm from "../components/leaveRequest/CreateLeaveRequestForm";
import NotFound from "../components/common/Error/NotFound";
import LeaveTypesIndex from "../components/leaveTypes/LeaveTypesIndex";
import CreateLeaveType from "../components/leaveTypes/CreateLeaveType";
import EditLeaveType from "../components/leaveTypes/UpdateLeaveType";
import RegisterForm from "../components/Authentication/register/RegisterForm";
import HomePageRedirect from "../components/common/home/HomeRedirect";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePageRedirect />,
      },
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
          // { path: 'allocate/:id', element: <LeaveAllocationForm /> },
          // { path: 'details/:id', element: <LeaveTypeDetails /> },
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

// Create the Router
export const router = createBrowserRouter(routes);