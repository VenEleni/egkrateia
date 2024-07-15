import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Meals from './pages/Meals';
import Users from './pages/Users';
import Navbar from './components/Navbar';
import './App.css';
import Dashboard from './components/Dashboard/dashboard';
import FoodAPI from "./components/FoodAPI";
import { UserProvider } from './userContext/UserContext';
import Summary from './components/Summary';
import NotFound from './components/NotFound';
import ExerciseAPI from './components/ExerciseAPI';

const App = () => {
  return (
    <UserProvider>
<Router>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/users/:action" element={<Users />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/foodapi" element={<FoodAPI />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/*" element={<NotFound />} />

          <Route path="/exercise" element={<ExerciseAPI />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;