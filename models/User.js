import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:String,
  phone:String,
  email:String,
  password:String,
  picture:String
})

export default mongoose.model("users" , userSchema);