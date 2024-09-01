
import { Navigate, Outlet } from 'react-router-dom';
import './App.css'

import 'react-toastify/dist/ReactToastify.css';
import AppNavbar from './components/common/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/Store';
import { useEffect } from 'react';
import { fetchCurrentUser, initializeApp } from './redux/slices/UserSlice';
import Loader from './components/common/Loader';


function App() {
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const loading = useSelector((state: RootState) => state.user.loading);

    useEffect(() => {
        console.log('App initializing...');
        dispatch(initializeApp());
    }, [dispatch]);

    if (loading) {
        return <Loader />; 
    }
    if (!isLoggedIn && location.pathname !== '/login') {
        return <Navigate to="/login" />;
      }
    return (
        <div className="content-area">
            <ToastContainer position="bottom-right" />
            {isLoggedIn && <AppNavbar />} 
            <div className="page-content">
                
                <Outlet />
            </div>
        </div>
    );
}

export default App;