import Mouse from "../models/mouse.js";

export const getAllMouses = async (req,res)=>{
  
  let { page , wireless , priceRange , brand } = req.body;

  if(  wireless.length != 0 || brand.length != 0 || priceRange[0] != 0 || priceRange[1] != 300)
  {
    try{
      if( wireless.length === 0 )
      {
        wireless = ["yes" , "no" ];
      }

      if(brand.length === 0 )
      {
        brand = ["HP" , "Redragon" , "Dell"];
      }

      let mouses = await Mouse.find()
        .where("brand").in(brand)
        .where("wireless").in(wireless);

      mouses = mouses.filter((mouse)=>{
        return parseFloat(mouse.price) > priceRange[0] && parseFloat(mouse.price) < priceRange[1]; 
      })

      return res.status(200).json({
        mouses,
        numberOfPages:1
      })

    }catch(err){
      return res.status(400).json({
        msg:"error while filtering mouses"
      })
    }
  }
  else
  {
    try {
      const pageSize = 4;
      const skip = (page - 1) * pageSize;
      const numberOfDocuments = await Mouse.countDocuments();
      const numberOfPages = Math.ceil(numberOfDocuments / pageSize);
  
      const mouses = await Mouse.find().sort({price:1}).skip(skip).limit(pageSize);
  
      res.status(200).json({
        mouses,
        numberOfPages,
      });
    } catch (err) {
      res.status(400).json({
        msg: "error while fetching mouses"
      })
    }
  }
}

export const insertMouse = async (req,res)=>{
  try{
    const mouse = req.body;
    await Mouse.create(mouse);
    res.status(201).json({
      msg:"mouse inserted succesfully"
    })
  }catch(err){
    res.status(400).json({
      msg:"error while inserting mouse"
    })
  }
}