import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Diet Tracker</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/meals">Meals</Link>
        <Link to="/users/login">Login</Link>
        <Link to="/users/register">Register</Link>
      </div>
    </nav>
  );
};

export default NavBar;

