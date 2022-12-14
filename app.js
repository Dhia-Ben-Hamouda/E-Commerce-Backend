import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import computerRoutes from "./routes/computerRoutes.js";
import keyboardRoutes from "./routes/keyboardRoutes.js";
import screenRoutes from "./routes/screenRoutes.js";
import mouseRoutes from "./routes/mouseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import Computer from "./models/computer.js";
import Keyboard from "./models/keyboard.js";
import Mouse from "./models/mouse.js";
import Screen from "./models/screen.js";

const app = express();

// middleware

dotenv.config();
app.use(cors({
  origin:"*"
}))

// env variables

const port = process.env.PORT;
const url = process.env.URL;

// connecting to mongoDB

mongoose.connect(url)
.then(()=>{console.log("connected to mongoDB !")})
.catch((err)=>{console.error(err)});

// launching the app

app.listen(port,()=>{
  console.log(`listening to requests on port ${port}`);
})

// handling routes

app.get("/product/:id" , async (req,res)=>{
  try{
    const id = req.params.id;
    
    const computers = await Computer.find({_id : id});
    const screens = await Screen.find({_id : id});
    const keyboards = await Keyboard.find({_id : id});
    const mouses = await Mouse.find({_id :id });

    res.status(200).json([
      ...computers,...screens,...keyboards,...mouses
    ])
  }catch(err){
    res.status(400).json({
      msg:"error while fetching data by id"
    })
  }
})

app.get("/getAllProducts" , async (req,res)=>{
  try{
    const computers = await Computer.find();
    const screens = await Screen.find();
    const keyboards = await Keyboard.find();
    const mouses = await Mouse.find();

    return res.status(200).json([
      ...computers , ...screens , ...keyboards , ...mouses
    ])

  }catch(err){
    return res.status(400).json({
      msg:"error while fetching products"
    })
  }
})

app.use("/auth" , authRoutes);
app.use("/computers" , computerRoutes );
app.use("/keyboards" , keyboardRoutes);
app.use("/screens" , screenRoutes);
app.use("/mouses" , mouseRoutes);
