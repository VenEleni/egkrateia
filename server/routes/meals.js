const express = require('express');
const { getMeals, addMeal, updateMeal, deleteMeal } = require('../controllers/mealController');
const router = express.Router();
const authMiddleware = require ("../middleware/middleware")

router.get('/', authMiddleware, getMeals);
router.post('/', authMiddleware, addMeal);
router.put('/:id', authMiddleware, updateMeal);
router.delete('/:id', authMiddleware, deleteMeal);

module.exports = router;


