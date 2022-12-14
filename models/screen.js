import mongoose from "mongoose";

const Schema = mongoose.Schema;

const screenSchema = new Schema({
  name:String,
  price:String,
  brand:String,
  description:String,
  picture:String,
  size:String,
  resolution:String
})

export default mongoose.model("screens" , screenSchema);