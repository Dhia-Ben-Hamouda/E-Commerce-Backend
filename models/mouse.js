import mongoose from "mongoose";

const Schema = mongoose.Schema;

const mouseSchema = new Schema({
  name:String,
  brand:String,
  price:String,
  description:String,
  picture:String,
  wireless:String
})

export default mongoose.model("mouses" , mouseSchema);