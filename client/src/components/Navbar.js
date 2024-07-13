import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { useUser } from '../userContext/UserContext';
import './NavBar.css';
=======
import './Navbar.css';
>>>>>>> 0daa82e (Meals form changes and API Implementation)

const NavBar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-brand">Diet Tracker</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/meals">Meals</Link>

        {user && ( 
          <>
            <span className='username'>Hello, {user.username}!</span> 
            <button onClick={logout} className="log-out">Logout</button> 
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

