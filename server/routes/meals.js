const express = require('express');
const { getMeals, addMeal, updateMeal, deleteMeal } = require('../controllers/mealController');

const router = express.Router();

router.get('/', getMeals);
router.post('/', addMeal);
router.put('/:id', updateMeal);
router.delete('/:id', deleteMeal);

module.exports = router;


