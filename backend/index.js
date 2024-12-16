import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import todoRoutes from './routes/todoRoutes.js';
import connectDB from './config/db.js';  


dotenv.config()

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

//  routes use controller
app.use('/todos', todoRoutes);

// Connect DB
connectDB();

// serverr 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 

    console.log(`Server running on port ${PORT}`
    ));
