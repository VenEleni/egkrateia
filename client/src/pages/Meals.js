import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';
import { getMeals, deleteMeal, updateMeal } from '../services/mealService';
import MealForm from '../components/MealForm';
import CalorieCalculator from '../components/CalorieCalculator';
import './Meals.css';
import NavBar from '../components/Navbar';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Summary from '../components/Summary';
import { getUserCalories } from '../services/userService';
import {getAllExercises} from "../services/exerciseService"
// import { base } from '../../../server/models/Meal';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [BaseCalories, SetBaseCalories] = useState(0);
  const [FoodCalories, SetFoodCalories] = useState(0);
  const [Exercise, SetExercise] = useState([]);
  const [totalExerciseCal, SetTotalExerciseCal] = useState(0);

  const fetchMeals = async () => {
    const response = await getMeals();
    console.log(response.data);
    setMeals(response.data);
  };

  const fetchUserCalories = async () => {
    const base = await getUserCalories();
    if (base) {
      SetBaseCalories(base);
    }
    console.log(base);
  };

  const fetchAllExercises = async () => {
    const response = await getAllExercises();
    if(response){
      SetExercise(response.data);
  }
  };

  useEffect( () => {
    const fetchData = async () => {
      await fetchMeals();
      await fetchUserCalories();
      await fetchAllExercises();
    };

    fetchData();
  }, []);

  useEffect(() => {
    SetFoodCalories(meals.reduce((total, meal) => total + meal.calories, 0));
  }, [meals]); // Depend on meals state

  const handleDelete = async (_id) => {
    await deleteMeal(_id);
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

  const filteredExercises = Exercise.filter(
    (ex) => new Date(ex.date).toDateString() === selectedDate.toDateString()
  );

  useEffect(() => {
    const totalExerciseCalories = filteredExercises.reduce((acc, ex) => {
      return acc + ex.burnedCalories;
    }, 0);
    SetTotalExerciseCal(totalExerciseCalories);
  }, [filteredExercises]);

  const categorizedMeals = filteredMeals.reduce((acc, meal) => {
    acc[meal.mealType] = acc[meal.mealType] || [];
    acc[meal.mealType].push(meal);
    return acc;
  }, {});

  return (
    <div className="meals-page">
      <NavBar/>
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
      {BaseCalories !== 0 ? (
        <Summary Base={BaseCalories} Food={FoodCalories} Exercise={totalExerciseCal} />
      ) : (
        <div>Loading...</div> 
      )}
      {/* <CalorieCalculator meals={filteredMeals} dailyCalorieGoal={BaseCalories} /> */}
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
     <div className="exercise-category">
        <h3>Exercises</h3>
        <ul className="exercise-category-ul">
        {filteredExercises.map((exercise) => (
      <li key={exercise._id} className="exercise-category-li">
        {exercise.exerciseName} - {new Date(exercise.date).toLocaleDateString()} - {exercise.burnedCalories} calories
      </li>))}
          </ul>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Meals;