import React, { useEffect, useState } from 'react';
import { getMeals, deleteMeal } from '../services/mealService';
import MealForm from './MealForm';

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);

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

  const refreshMeals = () => {
    fetchMeals();
    setEditingMeal(null);
  };

  return (
    <div>
      <h2>Meals</h2>
      <MealForm existingMeal={editingMeal} refreshMeals={refreshMeals} />
      <ul>
        {meals.map((meal) => (
          <li key={meal._id}>
            {meal.name} - {meal.mealType} - {meal.calories}
            <button onClick={() => handleEdit(meal)}>Edit</button>
            <button onClick={() => handleDelete(meal._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;
