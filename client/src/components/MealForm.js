import React, { useState } from 'react';
import { addMeal } from '../services/mealService';
import './MealForm.css';

const MealForm = ({ refreshMeals, existingMeal, handleUpdate }) => {
  const [meal, setMeal] = useState(existingMeal || { name: '', date: '', mealType: '', calories: '' });

  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingMeal) {
      await handleUpdate(meal);
    } else {
      await addMeal(meal);
      refreshMeals();
      setMeal({ name: '', date: '', mealType: '', calories: '' });
    }
  };

  return (
    <form className="meal-form" onSubmit={handleSubmit}>
      <h3>{existingMeal ? 'Edit Meal' : 'Add Meal'}</h3>
      <input type="text" name="name" placeholder="Name" value={meal.name} onChange={handleChange} required />
      <input type="date" name="date" value={meal.date.split('T')[0]} onChange={handleChange} required />
      <select name="mealType" value={meal.mealType} onChange={handleChange} required>
        <option value="" disabled>Select Meal Type</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <input type="number" name="calories" placeholder="Calories" value={meal.calories} onChange={handleChange} required />
      <button type="submit">{existingMeal ? 'Update Meal' : 'Add Meal'}</button>
    </form>
  );
};

export default MealForm;





