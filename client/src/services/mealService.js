import axios from 'axios';

const API_URL = 'http://localhost:5000/meals';

export const getMeals = async () => {
  return await axios.get(API_URL);
};

export const addMeal = async (meal) => {
  return await axios.post(API_URL, meal);
};

export const updateMeal = async (id, meal) => {
  return await axios.put(`${API_URL}/${id}`, meal);
};

export const deleteMeal = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
