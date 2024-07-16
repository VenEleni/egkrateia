import './Meals.css';
import MealForm from '../components/MealForm';
import "./Addmeal.css"

import React from 'react'
import NavBar from '../components/Navbar';

function Addmeal() {
  return (
    <>
    <NavBar/>
    <MealForm refreshMeals={() => {}} />
    </>
  )
}

export default Addmeal
