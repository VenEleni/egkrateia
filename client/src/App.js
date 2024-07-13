import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Meals from './pages/Meals';
import Users from './pages/Users';
import NavBar from './components/NavBar';
import './App.css';
import { UserProvider } from './userContext/UserContext';

const App = () => {
  return (
    <UserProvider>
<Router>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/users/:action" element={<Users />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
    
  );
};

export default App;

