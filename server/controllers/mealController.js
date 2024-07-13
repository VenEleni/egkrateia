const Meal = require('../models/Meal');

exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user.userId});
    console.log("got the meals");
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMeal = async (req, res) => {
  const { name, date, mealType, calories } = req.body;

  const newMeal = new Meal({ name, date, mealType, calories, user: req.user.userId });
  try {
    const savedMeal = await newMeal.save();
    res.status(200).json(savedMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMeal = async (req, res) => {
  const { id } = req.params;
  const { name, date, mealType, calories } = req.body;

  try {
    const updatedMeal = await Meal.findByIdAndUpdate(id, { name, date, mealType, calories, user: req.user.userId }, { new: true });
    res.status(200).json(updatedMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMeal = async (req, res) => {
  const { id } = req.params;

  try {
    await Meal.findByIdAndDelete({id, user: req.user.userId});
    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

