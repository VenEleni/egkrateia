const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  mealType: { type: String, required: true },
  calories: { type: Number, required: true },
});

const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;

