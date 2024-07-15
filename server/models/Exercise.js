const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  exerciseName: { type: String, required: true },
  date: { type: Date, required: true },
  burnedCalories: { type: Number, required: true },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true
    }
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;

