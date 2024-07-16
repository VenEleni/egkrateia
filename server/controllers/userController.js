const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { username, email, password , age, gender, height, currentWeight, goal, active } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    user = new User({ username, email, password, age, gender, height, currentWeight, goal, active });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error in Saving");
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const payload = {
      user: {
        userId: user.id,
        username: user.username,
        email: user.email,
        goalCalories: user.goalCalories
      },
    };
    const token = jwt.sign(
      payload, process.env.JWT_SECRET, { expiresIn: "3h" },
    );
    res.status(200).json({ token: token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }

};

exports.getgoalCalories = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId});
    console.log("got the calories and user!");
    res.status(200).json(user.goalCalories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.user.userId; 
  const { username, email, age, gender, height, currentWeight, goal, active, password } = req.body;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (age) user.age = age;
    if (gender) user.gender = gender;
    if (height) user.height = height;
    if (currentWeight) user.currentWeight = currentWeight;
    if (goal) user.goal = goal;
    if (active) user.active = active;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error updating user" });
  }
};