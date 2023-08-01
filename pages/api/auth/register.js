import { User } from "@/models/user";
import { connectDb, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from 'bcrypt';

const { asyncError, errorHandler } = require("@/middlewares/error");

const handler = asyncError(async (req, res) => {
    if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed");
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return errorHandler(res, 400, "Requried Field cannot be empty");
  await connectDb();
  let user = await User.findOne({ email });
  if (user) return errorHandler(res, 400, "User Already Exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password:hashedPassword,
  });
  const token = generateToken(user._id);
  cookieSetter(res, token, true);
  res.status(201).json({
    success: true,
    message: "User Registered successfully!",
    user,
  });
});

export default handler;
