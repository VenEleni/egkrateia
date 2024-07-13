import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Meals from './pages/Meals';
import Users from './pages/Users';
<<<<<<< HEAD
import NavBar from "./components/NavBar";
=======
import Navbar from './components/Navbar';
>>>>>>> 0daa82e (Meals form changes and API Implementation)
import './App.css';
import Dashboard from './components/Dashboard/dashboard';
import FoodAPI from "./components/FoodAPI";

import { UserProvider } from './userContext/UserContext';

const App = () => {
  return (
<<<<<<< HEAD
    <UserProvider>
<Router>
      <NavBar />

=======
    <Router>
      <Navbar/>
>>>>>>> 0daa82e (Meals form changes and API Implementation)
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/users/:action" element={<Users />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/foodapi" element={<FoodAPI />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
    
  );
};

export default App;

