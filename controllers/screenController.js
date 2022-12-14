import Screen from "../models/screen.js";

export const getAllScreens = async (req,res)=>{
  let { page , brand , size , resolution , priceRange } = req.body;
   
  if(brand.length != 0 || size.length != 0 ||resolution.length != 0 || priceRange[0] != 0 || priceRange[1] != 1500 )
  {
    try{
      if(brand.length === 0)
      {
        brand = ["HP" , "Redragon" , "Dell" , "Samsung"];
      }
      if(size.length === 0)
      {
        size = ["21" , "24" , "27" , "32"];
      }
      if(resolution.length === 0)
      {
        resolution = ["HD" , "Full HD" , "QHD" , "4K"];
      }
  
      let screens = await Screen.find()
        .where("brand").in(brand)
        .where("size").in(size)
        .where("resolution").in(resolution);
  
      screens = screens.filter((screen) => {
        return parseFloat(screen.price) > priceRange[0] && parseFloat(screen.price) < priceRange[1];
      })
  
      return res.status(200).json({
        screens,
        numberOfPages:1
      })
    }catch(err){
      return res.status(400).json({
        msg:"error while filtering screens"
      })
    } 
  }
  else
  {
    try {
      const pageSize = 4;
      const skip = (page - 1) * pageSize;
      const numberOfDocuments = await Screen.countDocuments();
      const numberOfPages = Math.ceil(numberOfDocuments / pageSize);
  
      const screens = await Screen.find().sort({price:1}).skip(skip).limit(pageSize);
  
      res.status(200).json({
        screens,
        numberOfPages,
      });
    } catch (err) {
      res.status(400).json({
        msg: "error while fetching screens"
      })
    }
  }
}

export const insertScreen = async (req,res)=>{
  try{
    const screen = req.body;
    await Screen.create(screen);
    res.status(201).json({
      msg:"screen inserted succesfully"
    })
  }catch(err){
    res.status(400).json({
      msg:"error while inserting screen"
    })
  }
}