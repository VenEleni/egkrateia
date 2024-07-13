import axios from 'axios';
import {jwtDecode} from 'jwt-decode'

const API_URL = 'http://localhost:5001/users';

export const registerUser = async (user) => {
  return await axios.post(`${API_URL}/register`, user);
};

export const loginUser = async (user) => {
  const response = await axios.post(`${API_URL}/login`, user);
  const token = response.data.token;
  const userData = jwtDecode(token); 
  return userData.user;
};

