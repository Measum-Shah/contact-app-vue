import express from 'express';
import dotenv from 'dotenv';
const app = express();


// dotenv configuration
dotenv.config(
   { path: './.env'}
);

// routes
import contactRoutes from './routes/contactRoutes.js';
app.use('/api/contacts', contactRoutes);



const port = process.env.POR || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});