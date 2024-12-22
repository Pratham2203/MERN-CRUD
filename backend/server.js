const express= require("express")
const mongoose = require("mongoose")
const app=express();
const dotenv=require("dotenv");
const userRouter=require('./routes/userRoutes')
const cors=require("cors");
dotenv.config();
app.use(express.json());
app.use(cors());
const DB_NAME="merndb";
console.log(process.env.MONGODB_URI)
mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`).then(()=>{
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000, (err)=>{
        if(err) console.log(err);
        console.log("running successfully at ",process.env.PORT);
    })
}).catch((error)=>{
    console.log("error:",error);
})
app.use(userRouter);

