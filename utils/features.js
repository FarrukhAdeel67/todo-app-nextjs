import mongoose from "mongoose";
import { serialize } from "cookie";
import jwt  from "jsonwebtoken";
import { User } from "@/models/user";
export const connectDb = async () => {
  try {
    const dbURI = process.env.MONGO_URI;

    const { connection } = await mongoose.connect(dbURI);

    console.log(`Database connected on ${connection.host}`);
  } catch (error) {
    console.log("Error", error);
  }
};

export const cookieSetter = (res, token ,set) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", set?token:'', {
      path:'/',
      httpOnly: true,
      maxAge: set?15 * 24 * 60 * 60 * 1000:0,
    })
  );
};

export const generateToken = (_id) =>{
  return jwt.sign({_id}, process.env.JWT_SECRET);

}

//is authenticated
export const checkAuth =  async (req) =>{
  const cookie  =  req.headers.cookie;
  if(!cookie) return null;
  const token  =cookie.split('=')[1];
 const decodedToken =  jwt.verify(token, process.env.JWT_SECRET);
return  await User.findById(decodedToken._id);


}