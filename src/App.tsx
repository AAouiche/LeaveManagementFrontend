
import { Outlet } from 'react-router-dom';
import './App.css'

import 'react-toastify/dist/ReactToastify.css';
import AppNavbar from './components/common/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';


function App() {
  const notify = () => toast("Test Notification!");
  return (
    <div className="content-area">
      <ToastContainer position='bottom-right'/>
      <AppNavbar /> 
      <div className="page-content">
        
          <Outlet /> 
        
      </div>
      
    </div>
  );
}

export default App;