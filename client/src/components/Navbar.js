import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import logo from "../Assets/logo.png";
import { useUser } from '../userContext/UserContext';
import './Navbar.css';

const NavBar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogOut=() => {
    logout(); 
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href='/'><img src={logo} alt="logo" style={{width: "180px"}} /></a>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/meals">Dashboard</Link>
        <Link to="/addmeals">Add Meal</Link>
        <Link to="/exercise">Add Exercise</Link>

        {user && ( 
          <>
            <span className='username'>Hello, {user.username}!</span> 
            <Link to="/myprofile">My Profile</Link>

            <button onClick={handleLogOut} className="log-out">Logout</button> 
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;



