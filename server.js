const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const contactRoutes = require('./routes/appRouter');

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "contact-management-backend-sigma.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

let isConnected = false;

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,  
    });
    isConnected = true;
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}


app.use((req, res, next) => {
  if (!isConnected) {
    connectToDatabase();
  } else {
    next();
  }
});


// Routes
app.use('/api/contacts', contactRoutes);

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = app;
