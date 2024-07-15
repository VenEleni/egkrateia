import React from 'react';
import MealForm from '../components/MealForm';
import './Home.css';
import { useUser } from '../userContext/UserContext';
import { Link } from 'react-router-dom';
import logo from "../Assets/logo.png"

const Home = () => {
  const { user} = useUser();

  return (
    <div className="home-container">
       <div className="welcome-message">
        <img className="logo" src={logo} alt="logo" />
        <h1>Let's get healthy!</h1>
      </div>
      {user ? (
        <div className='box-register-login'>
        <button>
          <Link className="login-register-link" to="/users/login">Login</Link>
        </button>
        <button>
          <Link className="login-register-link" to="/users/register">Register</Link>
        </button>
        </div>
      )
      :
      (
        <>
        <div className="meal-form-container">
        <MealForm refreshMeals={() => {}} />

      </div>
        </>
      )}

    </div>
  );
};

export default Home;
