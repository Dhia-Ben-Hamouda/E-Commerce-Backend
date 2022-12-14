import Computer from "../models/computer.js";

export const getAllComputers = async (req, res) => {
  let {page , brand , memory , procesor ,
  graphicsCard , drive , priceRange } = req.body;

  if(brand.length != 0 || memory.length != 0 || procesor.length != 0 || graphicsCard.length != 0 || drive.length != 0 || priceRange[0] != 0 || priceRange[1] != 4000)
  {

    if(brand.length === 0)
    {
      brand = ["HP" , "Asus" , "Dell"];
    }
    if(drive.length === 0)
    {
      drive = ["1hdd+256ssd" , "1ssd" , "512ssd"];
    }
    if(procesor.length === 0)
    {
      procesor = ["i5" , "i7" , "ryzen5" , "ryzen7"];
    }
    if(graphicsCard.length === 0)
    {
      graphicsCard = ["gtx1650" , "rtx3050" , "rtx3050ti"];
    }
    
    if(memory.length === 0)
    {
      memory = ["32gb" , "16gb" , "8gb"];
    }

    let computers = await Computer.find().where("brand").in(brand)
      .where("drive").in(drive)
      .where("memory").in(memory)
      .where("graphicsCard").in(graphicsCard)
      .where("procesor").in(procesor);

    computers = computers.filter((pc)=>{
      return parseFloat(pc.price) >= priceRange[0] && parseFloat(pc.price) <= priceRange[1];
    })


    return res.status(200).json({
      computers,
      numberOfPages:1
    });
  }
  else
  {
    try {
      const pageSize = 4;
      const skip = (page - 1) * pageSize;
      const numberOfDocuments = await Computer.countDocuments();
      const numberOfPages = Math.ceil(numberOfDocuments / pageSize);
  
      const computers = await Computer.find().sort({price:1}).skip(skip).limit(pageSize);
  
      return res.status(200).json({
        computers,
        numberOfPages,
      });
    } catch (err) {
      return res.status(400).json({
        msg: "error while fetching computers"
      })
    }
  }
}

export const insertComputer = async (req, res) => {
  try {
    const computer = req.body;
    await Computer.create(computer);
    return res.status(201).json({
      msg: "computer inserted succesfully"
    })
  } catch (err) {
    return res.status(400).json({
      msg: "error while inserting computer"
    })
  }
}