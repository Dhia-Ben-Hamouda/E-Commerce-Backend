import Keyboard from "../models/keyboard.js";

export const getAllKeyboards = async (req, res) => {
  let { page, wireless, mechanical, priceRange, brand } = req.body;

  if (brand.length != 0 || wireless.length != 0 || mechanical.length != 0 || priceRange[0] != 0 || priceRange[1] != 300) 
  {
    try {
      if (brand.length === 0) {
        brand = ["HP", "Redragon", "Dell"];
      }
      if (wireless.length === 0) {
        wireless = ["yes", "no"];
      }
      if (mechanical.length === 0) {
        mechanical = ["yes", "no"];
      }

      let keyboards = await Keyboard.find().where("brand")
        .in(brand).where("wireless").in(wireless)
        .where("mechanical").in(mechanical);

      keyboards = keyboards.filter((keyboard) => {
        return parseFloat(keyboard.price) >= priceRange[0] && parseFloat(keyboard.price) <= priceRange[1];
      })

      return res.status(200).json({
        keyboards,
        numberOfPages: 1
      })
    }catch(err){
      return res.status(400).json({
        error:"error while filtering products"
      })
    }
  }
  else 
  {
    try{
      const pageSize = 4;
      const skip = (page - 1 ) * pageSize;
      const numberOfDocuments = await Keyboard.countDocuments();
      const numberOfPages = Math.ceil(numberOfDocuments / pageSize);

      const keyboards = await Keyboard.find().sort({price : 1}).skip(skip).limit(pageSize);

      return res.status(200).json({
        keyboards,
        numberOfPages
      })
    }catch(err){
      return res.status(400).json({
        error:"error while fetching keyboards"
      })
    }
  }
}

export const insertKeyboard = async (req, res) => {
  try {
    const keyboard = req.body;
    await Keyboard.create(keyboard);
    return res.status(201).json({
      msg: "keyboard inserted succesfully"
    })
  } catch (err) {
    return res.status(400).json({
      msg: "error while inserting keyboard"
    })
  }
}