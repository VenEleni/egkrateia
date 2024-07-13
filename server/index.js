const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mealRoutes = require('./routes/meals');
const userRoutes = require('./routes/users');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
  origin: 'http://localhost:3000', // allow your client app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});