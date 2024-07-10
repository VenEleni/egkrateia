import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMeals, deleteMeal, updateMeal } from '../services/mealService';
import MealForm from '../components/MealForm';
import CalorieCalculator from '../components/CalorieCalculator';
import './Meals.css';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dailyCalorieGoal = 2000; // Define your daily calorie goal here

  const fetchMeals = async () => {
    const response = await getMeals();
    setMeals(response.data);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleDelete = async (id) => {
    await deleteMeal(id);
    fetchMeals();
  };

  const handleEdit = (meal) => {
    setEditingMeal(meal);
  };

  const handleUpdate = async (meal) => {
    await updateMeal(meal._id, meal);
    setEditingMeal(null);
    fetchMeals();
  };

  const filteredMeals = meals.filter(
    (meal) => new Date(meal.date).toDateString() === selectedDate.toDateString()
  );

  const categorizedMeals = filteredMeals.reduce((acc, meal) => {
    acc[meal.mealType] = acc[meal.mealType] || [];
    acc[meal.mealType].push(meal);
    return acc;
  }, {});

  return (
    <div className="meals-page">
      <div className="date-picker-container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => (
        <div key={mealType} className="meal-category">
          <h3>{mealType}</h3>
          <ul>
            {categorizedMeals[mealType] &&
              categorizedMeals[mealType].map((meal) => (
                <li key={meal._id}>
                  {editingMeal && editingMeal._id === meal._id ? (
                    <MealForm
                      existingMeal={editingMeal}
                      refreshMeals={fetchMeals}
                      handleUpdate={handleUpdate}
                    />
                  ) : (
                    <>
                      {meal.name} - {new Date(meal.date).toLocaleDateString()} - {meal.calories} calories
                      <button onClick={() => handleEdit(meal)}>Edit</button>
                      <button onClick={() => handleDelete(meal._id)}>Delete</button>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}
      <CalorieCalculator meals={filteredMeals} dailyCalorieGoal={dailyCalorieGoal} />
    </div>
  );
};

export default Meals;
