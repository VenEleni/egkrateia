import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Meals from './pages/Meals';
import Users from './pages/Users';
import Navbar from './components/Navbar';
import './App.css';
import Dashboard from './components/Dashboard/dashboard';
import FoodAPI from "./components/FoodAPI";

const App = () => {
  return (
    <Router>
      <Navbar/>
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
  );
};

export default App;