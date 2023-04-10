import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/"element={<Login/>}/>
            <Route path="/forgotpassword"element={<ForgotPassword/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
