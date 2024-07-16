import axios from 'axios';
import {jwtDecode} from 'jwt-decode'


const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
const API_URL = BACKEND_URI+'/users';

export const registerUser = async (user) => {
  console.log(user)
  await axios.post(`${API_URL}/register`, user)
  .then((e) => {
    console.log(e)
  })
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

export const updateUserProfile = async (user) => {
  const response = await axios.put(`${API_URL}/myprofile`, user, {
    headers: { "x-auth-token": `${localStorage.getItem("token")}`
    }
    });
    return response.data;
}