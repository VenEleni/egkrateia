import axios from 'axios';
// import Exercise from '../../../server/models/Exercise';


const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;
const API_URL = BACKEND_URI+'/exercise';


export const addExercise = async (activity) => {
  console.log("Test")
  console.log(activity)
  try {
    await axios.post(`${API_URL}/add`, activity, {
      headers: { "x-auth-token": `${localStorage.getItem("token")}` }
    });
  } catch (error) {
    console.log(error)
  }

   
};

export const getAllExercises = async () => {
  try {
    return await axios.get(`${API_URL}/getallexercises`, {
      headers: { "x-auth-token": `${localStorage.getItem("token")}` }
    });
    // console.log(excercies.data);
    // return excercies.data;
  } catch (error) {
    console.log(error)
  }
};