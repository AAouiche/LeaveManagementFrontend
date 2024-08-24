import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import PublicRoute from "./PublicRoute";
import LoginForm from "../components/Authentication/login/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import LeaveRequests from "../components/leaveRequests/LeaveRequestIndex";

export const routes: RouteObject[] = [
    {
      path: '/',
      element: <App/>,
      children: [
        {
            path: '/',
            element: <PublicRoute />,
            children: [
              { path: 'login', element: <LoginForm /> },
              
            ]
          },
          {
            path: '/',
            element: <ProtectedRoute />, 
            children: [
              { path: 'leaverequests', element: <LeaveRequests /> },
              
            ],
          },
      ]
    }
  ];
  
  export const router = createBrowserRouter(routes);