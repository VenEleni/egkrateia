import axios from 'axios';

const API_URL = 'http://localhost:5001/exercise';

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

