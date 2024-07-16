const express = require('express');
const { registerUser, loginUser, getUsers, getgoalCalories, updateUser } = require('../controllers/userController');
const authMiddleware = require ("../middleware/middleware")

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/allusers', getUsers)
router.get('/calories',authMiddleware, getgoalCalories)
router.put('/myprofile', authMiddleware, updateUser)

module.exports = router;
