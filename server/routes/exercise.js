const ExerciseController = require("../controllers/exerciseController")
const express = require('express');
const router = express.Router();
const authMiddleware = require ("../middleware/middleware")



router.post("/add",authMiddleware, ExerciseController.addExercise)
router.get("/getallexercises",authMiddleware, ExerciseController.getAllExercises)

module.exports = router;