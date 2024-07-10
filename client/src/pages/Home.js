import React from 'react';
import MealForm from '../components/MealForm';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Let's get healthy!</h1>
      </div>
      <div className="meal-form-container">
        <MealForm refreshMeals={() => {}} />
      </div>
    </div>
  );
};

export default Home;
