import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cookieParser());
app.use(express.json())

// Connect user routes
app.use('/users', userRoutes);
const port = process.env.PORT || 3000; 

// Connect to MongoDB
const URI = process.env.MONGODB_URI;
mongoose.connect(URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

