import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/"element={<Login/>}/>
            <Route path="/forgotPassword"element={<ForgotPassword/>}/>
            <Route path="/reset-password/:token"element={<ResetPassword/>}/>
            <Route path="dashboard/*"element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
