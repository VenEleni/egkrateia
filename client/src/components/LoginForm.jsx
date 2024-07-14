import React, { useState } from "react";
import { registerUser, loginUser } from "../services/userService";
import "./LoginForm.css";
import { useUser } from "../userContext/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const LoginForm = ({ isRegister }) => {
  const navigate = useNavigate();
  const { action } = useParams();
  const { login } = useUser();

  const [isLogin, setIsLogin] = useState(true);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    activity: "",
    goals: "",
  });

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerUser(user);
        console.log("User registered successfully");
      } else {
        const loggedInUser = await loginUser(loginDetails);
        login(loggedInUser);
        console.log("Login successful");
      }
    } catch (err) {
      console.log("Error in user form");
    }
  };

  const handleSignupDetails = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLoginDetails = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleToggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const showTest = () => {
    console.log("Signup:", user);
    console.log("Login:", loginDetails);
  };

  return (
    <>
      <div
        className={isLogin && action === "login" ? "notDisplay" : "login-box"}
      >
        <h2>Sign up</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              name="username"
              required
              onChange={handleSignupDetails}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="email"
              name="email"
              required
              onChange={handleSignupDetails}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              required
              onChange={handleSignupDetails}
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="age"
              required
              onChange={handleSignupDetails}
            />
            <label>Age</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="height"
              required
              onChange={handleSignupDetails}
            />
            <label>Height (cm)</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="weight"
              required
              onChange={handleSignupDetails}
            />
            <label>Weight (kg)</label>
          </div>
          <div className="user-box">
            <select name="gender" required onChange={handleSignupDetails}>
              <option value="selection" disabled selected>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label>Gender</label>
          </div>
          <div className="user-box">
            <select name="activity" required onChange={handleSignupDetails}>
              <option value="selection" disabled selected>
                Select Activity Level
              </option>
              <option value="lightly_active">Lightly Active</option>
              <option value="moderately_active">Moderately Active</option>
              <option value="very_active">Very Active</option>
              <option value="extra_active">Extra Active</option>
            </select>
            <label>Activity Level</label>
          </div>
          <div className="user-box">
            <select name="goals" required onChange={handleSignupDetails}>
              <option value="selection" disabled selected>
                Select Goal
              </option>
              <option value="lose_weight">Lose Weight</option>
              <option value="gain_weight">Gain Weight</option>
              <option value="stay_fit">Stay Fit</option>
            </select>
            <label>Goals</label>
          </div>
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/users/login")} className="toggles">
              Login
            </span>
          </p>
          <a href="#" onClick={handleSubmit}>
            Sign up
          </a>
        </form>
      </div>

      <div
        className={isLogin && action === "login" ? "login-box" : "notDisplay"}
      >
        <h2>Log in</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              name="username"
              required
              onChange={handleLoginDetails}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              required
              onChange={handleLoginDetails}
            />
            <label>Password</label>
          </div>
          <p>
            Don't have an account yet?{" "}
            <span
              onClick={() => navigate("/users/register")}
              className="toggles"
            >
              Sign up
            </span>
          </p>
          <a href="#" onClick={handleSubmit}>
            Login
          </a>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
