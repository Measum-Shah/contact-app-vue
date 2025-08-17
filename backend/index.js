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
app.use(cors({
  origin: "https://savecontactt.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// middleware built-in
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// error handler middleware
import errorHandler from './middleware/errorHandler.js';
app.use(errorHandler);

// routes
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);

// db connection
connectDB();


const port = process.env.POR || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});