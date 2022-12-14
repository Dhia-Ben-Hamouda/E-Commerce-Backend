import mongoose from "mongoose";

const Schema = mongoose.Schema;

const computerSchema = new Schema({
  name:String,
  description:String,
  price:String,
  picture:String,
  brand:String,
  memory:String,
  drive:String,
  procesor:String,
  graphicsCard:String
})

export default mongoose.model("computers" , computerSchema);