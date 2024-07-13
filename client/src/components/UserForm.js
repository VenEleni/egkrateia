<<<<<<< HEAD

import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/userService';
import './UserForm.css';
import { useUser } from '../userContext/UserContext';

const UserForm = ({ isRegister }) => {
  const { login } = useUser();
  const [user, setUser] = useState({ username: '', email: '', password: '' });
=======
import React, { useState } from "react";
import { registerUser, loginUser } from "../services/userService";
import "./UserForm.css";

const UserForm = ({ isRegister }) => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
>>>>>>> 0daa82e (Meals form changes and API Implementation)


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerUser(user);
        alert("User registered successfully");
      } else {
<<<<<<< HEAD
        const loggedInUser = await loginUser(user);
        login(loggedInUser)
        alert('Login successful');
=======
        await loginUser(user);
        alert("Login successful");
>>>>>>> 0daa82e (Meals form changes and API Implementation)
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
      <button type="submit" className="user-form-button">
        {isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default UserForm;
