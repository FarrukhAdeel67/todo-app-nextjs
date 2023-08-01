import { asyncError, errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { checkAuth, connectDb } from "@/utils/features";

const  handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
 return  errorHandler(res, 400, "Only GET Method is allowed!");
  await connectDb();

 const user = await checkAuth(req);
 if(!user) return     errorHandler(res, 401, "Login First");
 const tasks = await Task.find({user:user._id});
 

  res.status(200).json({
    success: true,
    message: "my task",
    tasks,
  });
});
export default handler;