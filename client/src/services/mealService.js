import axios from 'axios';


const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
const API_URL = BACKEND_URI+'/meals';

export const getMeals = async () => {
  return await axios.get(API_URL, {
    headers: { "x-auth-token": `${localStorage.getItem("token")}` }
  });
};

export const addMeal = async (meal) => {
  console.log(localStorage.getItem("token"));
  return await axios.post(API_URL, meal,
  {
    headers: { "x-auth-token": `${localStorage.getItem("token")}` }
  });
};

export const updateMeal = async (id, meal) => {
  return await axios.put(`${API_URL}/${id}`, meal,
    {
      headers: { "x-auth-token": `${localStorage.getItem("token")}` }
    });
};

export const deleteMeal = async (id) => {
  return await axios.delete(`${API_URL}/${id}`,
    {
      headers: { "x-auth-token": `${localStorage.getItem("token")}` }
    });
};
