import express from 'express';
import dotenv from 'dotenv';
const app = express();
import connectDB from './connection/dbConnection.js';


// dotenv configuration
dotenv.config(
   { path: './.env'}
);

// middleware built-in
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// error handler middleware
import errorHandler from './middleware/errorHandler.js';
app.use(errorHandler);

// routes
import contactRoutes from './routes/contactRoutes.js';
app.use('/api/contacts', contactRoutes);

// db connection
connectDB();


const port = process.env.POR || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});