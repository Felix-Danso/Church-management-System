import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Dashboard from './Pages/Dashboard';
import LandingPage from './Pages/LandingPage';
import {ProtectAuthRoutes, ProtectRoutes} from "./Utility/proctectRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<><Login/></>}/>
            <Route path="/forgotPassword" element={<ProtectAuthRoutes><ForgotPassword/></ProtectAuthRoutes>}/>
            <Route path="/reset-password/:token" element={<ProtectAuthRoutes><ResetPassword/></ProtectAuthRoutes>}/>
            <Route path="dashboard/*" element={<ProtectRoutes><Dashboard/></ProtectRoutes>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
