import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';
import { getMeals, deleteMeal, updateMeal } from '../services/mealService';
import MealForm from '../components/MealForm';
import CalorieCalculator from '../components/CalorieCalculator';
import './Meals.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Summary from '../components/Summary';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [BaseCalories, SetBaseCalories] = useState(0);
  const [FoodCalories, SetFoodCalories] = useState(0);
  const [Exercise, SetExercise] = useState(0);

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
          className="custom-date-picker"
        />
      </div>
      <div className='data-container'>
      <div className='left-side'>
      <Summary Base={2000} Food={100} Exercise={400} />  
      <CalorieCalculator meals={filteredMeals} dailyCalorieGoal={BaseCalories} />
      </div>
    <div className='right-side'>
    {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => (
        <div key={mealType} className="meal-category">
          <h3>{mealType}</h3>
          <ul className="meal-category-ul">
            {categorizedMeals[mealType] &&
              categorizedMeals[mealType].map((meal) => (
                <li className="meal-category-li" key={meal._id}>
                  {editingMeal && editingMeal._id === meal._id ? (
                    <MealForm
                      existingMeal={editingMeal}
                      refreshMeals={fetchMeals}
                      handleUpdate={handleUpdate}
                      setEditingMeal={setEditingMeal}
                    />
                  ) : (
                    <>
                      {meal.name} - {new Date(meal.date).toLocaleDateString()} - {meal.calories} calories
                      <div>
                      <FaEdit className="icon" onClick={() => handleEdit(meal)}>Edit</FaEdit>
                      <FaTrashAlt className="icon" onClick={() => handleDelete(meal._id)}>Delete</FaTrashAlt>
                      </div>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
};

export default Meals;
