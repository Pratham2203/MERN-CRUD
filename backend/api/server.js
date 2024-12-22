const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("../routes/userRoutes"); // Adjust path due to api folder
const cors = require("cors");

dotenv.config();

const app = express();
const DB_NAME = "merndb";

app.use(express.json());
app.use(cors({
    origin: 'https://mern-crud-omega.vercel.app'|| '*', // Replace with your frontend's URL
    credentials: true,
}));

mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected successfully to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});

app.use(userRouter);

module.exports = app; // Export the app for Vercel
