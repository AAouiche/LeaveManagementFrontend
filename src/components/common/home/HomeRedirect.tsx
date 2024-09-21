import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';

const HomePageRedirect: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  
    if (isLoggedIn) {
      
      return <Navigate to="/leaverequests" replace />;
    } else {
      
      return <Navigate to="/public/login" replace />;
    }
  };

  export default HomePageRedirect;