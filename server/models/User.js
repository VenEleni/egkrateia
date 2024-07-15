const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  age : { type: Number, required: true},
  gender : { type: String, required: true},
  height : { type: Number, required: true},
  currentWeight : { type: Number, required: true},
  goal: {type: String, required: true},
  active: {type: String, required: true},
  goalCalories: {type: Number}
},
{
  timestamps: true,
}
);

UserSchema.pre('save', function (next){
  const user = this;
  const {
   age, gender, height, currentWeight, active, goal
  } = user;

  let bmr; 
  if (gender === 'male') {
    bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5
  }
  else {
    bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161
  }

  const activityLevel = {
    'sedentary': 1.2, 
    'lightly active': 1.375,
    'moderately active': 1.55,
    'very active': 1.725,
    'extra active': 1.9
  }

  const totalCalories = bmr * activityLevel[active]
  console.log ("activity number :", activityLevel[active])

  let goalCalories;
  if (goal === 'loose') {
    goalCalories = totalCalories * 0.85;
  } else if (goal === 'gain') {
    goalCalories = totalCalories * 1.15; 
  } else if (goal === 'maintain') {
    goalCalories = totalCalories; 
  }

  user.goalCalories = Math.floor(goalCalories);
  console.log (user)
  next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
