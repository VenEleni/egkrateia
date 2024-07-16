import './Meals.css';
import MealForm from '../components/MealForm';
import "./Addmeal.css"

import React from 'react'
import Navbar from '../components/Navbar';

function Addmeal() {
  return (
    <>
    <Navbar/>
    <MealForm refreshMeals={() => {}} />
    </>
  )
}

export default Addmeal
