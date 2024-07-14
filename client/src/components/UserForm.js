import React, { useState } from "react";
import { registerUser, loginUser } from "../services/userService";
import "./UserForm.css";
import { useUser } from "../userContext/UserContext";

const UserForm = ({ isRegister }) => {
  const { login } = useUser();
  const [user, setUser] = useState({ username: "", email: "", password: "" , age: "", gender: "",
    height: 0, currentWeight: 0, goal: "", active: "", goalCalories: 0
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log (user.active)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerUser(user);
        alert("User registered successfully");
      } else {
        const loggedInUser = await loginUser(user);
        login(loggedInUser);
        alert("Login successful");
      }
    } catch (err) {
      alert("Error in user form");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {isRegister && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="user-form-input"
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="user-form-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="user-form-input"
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
        required
        className="user-form-input"
      />
      <select id="gender" name="gender" required onChange={handleChange} value={user.gender} className="user-form-input">
        <option value="" disabled selected>
          Select your gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="number"
        name="height"
        placeholder="Height in cm (for example: 172)"
        // min= "1.20"
        // step="0.01"
        // max= "2.20"
        onChange={handleChange}
        required
        className="user-form-input"
      />
       <input
        type="number"
        name="currentWeight"
        placeholder="Weight in kg (for example: 67)"
        onChange={handleChange}
        required
        className="user-form-input"
      />
      <select id="active" name="active" required onChange={handleChange} value={user.active} className="user-form-input">
        <option value="" disabled selected>
          Please tell us how active you are
        </option>
        <option value="sedentary">I'm not active at all</option>
        <option value="lightly active">I work out once in a while </option>
        <option value="moderately active">I work out 2 times/ week</option>
        <option value="very active">I work out 3-4 times/ week</option>
        <option value="extra active">Gym is my second home</option>
      </select>
      <select id="goal" name="goal" required onChange={handleChange} value={user.goal} className="user-form-input">
        <option value="" disabled selected>
          Please tell what is your goal
        </option>
        <option value="loose">I want to loose weight</option>
        <option value="gain">I want to gain weight</option>
        <option value="maintain">I want to remain at the same weight</option>
      </select>
      <button type="submit" className="user-form-button">
        {isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default UserForm;
