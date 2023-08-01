import { User } from "@/models/user";
import { connectDb, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from 'bcrypt';

const { asyncError, errorHandler } = require("@/middlewares/error");

const handler = asyncError(async (req, res) => {
    if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed");
  const {  email, password } = req.body;
  if ( !email || !password)
    return errorHandler(res, 400, "Requried Field cannot be empty");
  await connectDb();
  const user = await User.findOne({ email }).select('+password');
  if (!user) return errorHandler(res, 400, "Invalid email or password!");
  const comparePassword = await bcrypt.compare(password,user.password );
  if (!comparePassword) return errorHandler(res, 400, "Invalid email or password!");


  const token = generateToken(user._id);
  cookieSetter(res, token, true);
  res.status(200).json({
    success: true,
    message: `Welcome back ${user.name}`,
    user,
  });
});

export default handler;
