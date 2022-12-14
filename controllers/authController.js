import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { img } from "./img.js";

export const signIn = async (req,res)=>{
  try{
    const { email , password } = req.body;
    
    const exists = await User.findOne({email});

    if(!exists)
    {
      return res.status(404).json({
        msg:"user with the given email doesn't exist"
      })
    }
    else
    {
      const match = await bcrypt.compare(password , exists.password);

      if(match)
      {
        return res.status(200).json({
          id:exists._id,
          token:generateToken(exists._id),
          email:exists.email,
          picture:exists.picture,
          name:exists.name,
          msg:"ok"
        })
      }
      else
      {
        return res.status(400).json({
          msg:"wrong password"
        })
      }
    }
  }catch(err){
    return res.status(400).json({
      msg:"error while signing in"
    })
  }
}

export const signUp = async (req,res)=>{
  try{
    const { name , phone , email , password } = req.body;

    const exists = await User.findOne({email});

    if(exists)
    {
      return res.status(400).json({
        msg:"User with the same email already exists"
      })
    }
    else
    {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password , salt);

      const user = await User.create({
        name,
        phone,
        email,
        password:hashedPassword,
        picture:img
      })

      return res.status(201).json({
        msg:"user created succesfully"
      })
    }
  }catch(err){
    return res.status(400).json({
      msg:"error while creating user"
    })
  }
}

function generateToken(id)
{
  return jwt.sign({id} , process.env.JWT_SECRET , { expiresIn:"3d" });
}