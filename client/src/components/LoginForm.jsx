import React, { useState } from "react";
import { registerUser, loginUser } from "../services/userService";
import "./LoginForm.css";
import { useUser } from "../userContext/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../Assets/logo.png";

const LoginForm = ({ isRegister }) => {
  const navigate = useNavigate();
  const { action } = useParams();
  const { login } = useUser();

  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    height: 0,
    currentWeight: 0,
    goal: "",
    active: "",
    goalCalories: 0,
  });

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerUser(user);
        setMessage("User registered successfully");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/");
        }, 3000);
      } else {
        const loggedInUser = await loginUser(loginDetails);
        login(loggedInUser);
        setMessage("Login successful");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.message || "Something went wrong"));
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
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

  return (
    <>
      <img src={logo} alt="logo" style={{ width: "250px" }} />
      <div className={isLogin && action === "login" ? "notDisplay" : "login-box"}>
        <h2>Sign up</h2>
        <form>
          {/* Signup form fields */}
          <div className="user-box">
            <input type="text" name="username" required onChange={handleSignupDetails} />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="email" name="email" required onChange={handleSignupDetails} />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required onChange={handleSignupDetails} />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input type="number" name="age" required onChange={handleSignupDetails} />
            <label>Age</label>
          </div>
          <div className="user-box">
            <input type="number" name="height" required onChange={handleSignupDetails} />
            <label>Height (cm)</label>
          </div>
          <div className="user-box">
            <input type="number" name="currentWeight" required onChange={handleSignupDetails} />
            <label>Weight (kg)</label>
          </div>
          <div className="user-box">
            <select name="gender" required onChange={handleSignupDetails}>
              <option value="selection" disabled selected>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label>Gender</label>
          </div>
          <div className="user-box">
            <select id="active" name="active" required onChange={handleSignupDetails}>
              <option value="selection" disabled selected>Select Activity Level</option>
              <option value="sedentary">I'm not active at all</option>
              <option value="lightly active">I work out once in a while</option>
              <option value="moderately active">I work out 2 times/ week</option>
              <option value="very active">I work out 3-4 times/ week</option>
              <option value="extra active">Gym is my second home</option>
            </select>
            <label>Activity Level</label>
          </div>
          <div className="user-box">
            <select id="goal" name="goal" required onChange={handleSignupDetails}>
              <option value="selection" disabled selected>Select Goal</option>
              <option value="loose">I want to loose weight</option>
              <option value="gain">I want to gain weight</option>
              <option value="maintain">I want to remain at the same weight</option>
            </select>
            <label>Goals</label>
          </div>
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/users/login")} className="toggles">Login</span>
          </p>
          <a href="#" onClick={handleSubmit}>Sign up</a>
        </form>
      </div>

      <div className={isLogin && action === "login" ? "login-box" : "notDisplay"}>
        <h2>Log in</h2>
        <form>
          <div className="user-box">
            <input type="text" name="email" required onChange={handleLoginDetails} />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required onChange={handleLoginDetails} />
            <label>Password</label>
          </div>
          <p>
            Don't have an account yet?{" "}
            <span onClick={() => navigate("/users/register")} className="toggles">Sign up</span>
          </p>
          <a href="#" onClick={handleSubmit}>Login</a>
        </form>
      </div>
      
      {showMessage && <div className="message-box">{message}</div>}
    </>
  );
};

export default LoginForm;
