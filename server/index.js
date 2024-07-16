const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mealRoutes = require('./routes/meals');
const userRoutes = require('./routes/users');
const exerciseRoutes = require("./routes/exercise");
const dotenv = require("dotenv")
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URI = process.env.FRONTEND_URI

app.use(cors({
  origin: FRONTEND_URI, // allow your client app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], // allowed headers
  credentials: true // if you need to send cookies or other credentials
}));

app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Middleware to handle OPTIONS requests
app.options('*', cors());

app.use('/meals', mealRoutes);
app.use('/users', userRoutes);
app.use('/exercise', exerciseRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});