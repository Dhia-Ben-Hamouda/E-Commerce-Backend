import jwt from "jsonwebtoken";

const authMiddleware = async( req,res,next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const jwtAuth = token.length < 500;

    let decodedData;

    if(jwtAuth)
    {
      decodedData = jwt.verify(token , process.env.JWT_SECRET);
    }
    else
    {
      decodedData = jwt.decode(token);
    }

    next();
  }catch(err){
    console.error(err);
  }
}