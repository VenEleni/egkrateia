const express = require('express');
const { registerUser, loginUser, getUsers, getgoalCalories } = require('../controllers/userController');
const authMiddleware = require ("../middleware/middleware")

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/allusers', getUsers)
router.get('/calories',authMiddleware, getgoalCalories)

module.exports = router;
