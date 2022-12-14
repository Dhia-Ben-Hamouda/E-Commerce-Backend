import mongoose from "mongoose";

const Schema = mongoose.Schema;

const keyboardSchema = new Schema({
  name:String,
  price:String,
  brand:String,
  picture:String,
  description:String,
  mechanical:String,
  wireless:String
})

export default mongoose.model("keyboards" , keyboardSchema);