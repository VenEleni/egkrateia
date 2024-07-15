const Exercise = require("../models/Exercise");

exports.addExercise = async (req, res) => {
    const {burnedCalories, date, exerciseName} = req.body
    const newExercise = new Exercise({burnedCalories, date, exerciseName, user: req.user.userId});
    try {
        const savedExercise = await newExercise.save();
        res.status(200).json(savedExercise);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

exports.getAllExercises = async (req, res) => {
  try {
    const allExercises = await Exercise.find({ user: req.user.userId});
    console.log("got the exercises");
    res.status(200).json(allExercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

