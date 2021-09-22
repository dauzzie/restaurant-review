import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import restaurantRouter from './routes/restaurants.js';
import reviewRouter from './routes/reviews.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.RESTREVIEW_DB_URI;
mongoose.connect(uri, {useNewUrlParser: true})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const baseURL = "/api/v1";

app.use(baseURL + "/restaurants", restaurantRouter);
app.use(baseURL + "/review", reviewRouter);
app.use("*", (req, res) => res.status(404).json({error: "not found "}));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
