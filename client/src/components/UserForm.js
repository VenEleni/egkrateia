import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/userService';
import './UserForm.css';

const UserForm = ({ isRegister }) => {
  const [user, setUser] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerUser(user);
        alert('User registered successfully');
      } else {
        await loginUser(user);
        alert('Login successful');
      }
    } catch (err) {
      alert('Error in user form');
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {isRegister && <input type="text" name="username" placeholder="Username" onChange={handleChange} className="user-form-input" />}
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="user-form-input" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="user-form-input" />
      <button type="submit" className="user-form-button">{isRegister ? 'Register' : 'Login'}</button>
    </form>
  );
};

export default UserForm;
