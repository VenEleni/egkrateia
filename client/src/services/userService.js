import axios from 'axios';
import {jwtDecode} from 'jwt-decode'

const API_URL = 'http://localhost:5001/users';

export const registerUser = async (user) => {
  console.log(user)
  return await axios.post(`${API_URL}/register`, user);
};

export const loginUser = async (user) => {
  const response = await axios.post(`${API_URL}/login`, user);
  const token = response.data.token;
  const userData = jwtDecode(token); 
  localStorage.setItem("token", response.data.token);
  return userData.user;
};

export const getUserCalories = async () => {
  const response = await axios.get(`${API_URL}/calories`,{
    headers: { "x-auth-token": `${localStorage.getItem("token")}` }
  });
  return response.data;
};