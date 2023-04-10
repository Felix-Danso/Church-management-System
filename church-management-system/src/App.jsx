import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/"element={<Login/>}/>
            <Route path="/forgotPassword"element={<ForgotPassword/>}/>
            <Route path="/resetPassword"element={<ResetPassword/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
