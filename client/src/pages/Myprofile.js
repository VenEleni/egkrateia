import React, { useState } from 'react'
import { updateUserProfile } from '../services/userService'
import "./Myprofile.css"
import { useUser } from "../userContext/UserContext";
import { useNavigate} from "react-router-dom";
import logo from "../Assets/logo.png";


function Myprofile() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    password: '',
    age: user.age || '',
    gender: user.gender || '',
    height: user.height || '',
    currentWeight: user.currentWeight || '',
    goal: user.goal || '',
    active: user.active || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const goBackToHome = () => {
    navigate('/')
  }

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    const { username, email, password, age, gender, height, currentWeight, goal, active } = formData;
    const userData  = { username, email, password, age, gender, height, currentWeight, goal, active };

    try {
      await updateUserProfile(userData);
      updateUser(userData);
      console.log("User updated successfully");
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
   
  return (
    <div className='update-body'>
      <div className='update-header'>
      <img src={logo} alt="logo" style={{ width: "250px" }} />
      </div>
     
     <div className='update-box'>
      <h2>My Profile</h2>
      <form onSubmit={handleUpdateDetails}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <label>Password</label>
        </div>
        <div className="user-box">
          <input
            type="number"
            name="age"
            required
            value={formData.age}
            onChange={handleChange}
          />
          <label>Age</label>
        </div>
        <div className="user-box">
          <input
            type="number"
            name="height"
            required
            value={formData.height}
            onChange={handleChange}
          />
          <label>Height (cm)</label>
        </div>
        <div className="user-box">
          <input
            type="number"
            name="currentWeight"
            required
            value={formData.currentWeight}
            onChange={handleChange}
          />
          <label>Weight (kg)</label>
        </div>
        <div className="user-box">
          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label>Gender</label>
        </div>
        <div className="user-box">
          <select
            id="active"
            name="active"
            required
            value={formData.active}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Activity Level
            </option>
            <option value="sedentary">I'm not active at all</option>
            <option value="lightly active">I work out once in a while</option>
            <option value="moderately active">I work out 2 times/ week</option>
            <option value="very active">I work out 3-4 times/ week</option>
            <option value="extra active">Gym is my second home</option>
          </select>
          <label>Activity Level</label>
        </div>
        <div className="user-box">
          <select
            id="goal"
            name="goal"
            required
            value={formData.goal}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Goal
            </option>
            <option value="loose">I want to loose weight</option>
            <option value="gain">I want to gain weight</option>
            <option value="maintain">I want to remain at the same weight</option>
          </select>
          <label>Goals</label>
        </div>
        <a href="#" onClick={handleUpdateDetails}>
            Save Changes
          </a>
          <a href="#" onClick={goBackToHome}>
            Go Back
          </a>
      </form>
    </div>
    </div>
  );
}

export default Myprofile