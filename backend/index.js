import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import connectDB from './connection/dbConnection.js';


// app instance
const app = express();

// dotenv configuration
dotenv.config(
   { path: './.env'}
);

// cors setting
app.use(cors())

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