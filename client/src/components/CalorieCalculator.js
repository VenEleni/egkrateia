import React, { useState } from 'react';
import './CalorieCalculator.css';

const CalorieCalculator = ({ meals, dailyCalorieGoal }) => {
  const [showResults, setShowResults] = useState(false);

  const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);
  const caloriesLeft = dailyCalorieGoal - totalCalories;

  return (
    <div className="calorie-calculator">
      <button onClick={() => setShowResults(true)} className="calculate-button">
        Calculate Calories
      </button>
      {showResults && (
        <div className="calorie-results">
          <p>Total Calories Consumed: {totalCalories}</p>
          <p>Calories Left: {caloriesLeft}</p>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
