import { asyncError, errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { checkAuth, connectDb } from "@/utils/features";
const  handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    errorHandler(res, 400, "Only POST Method is allowed!");
  await connectDb();
  const { title, description } = req.body;
  if(!title || !description) return errorHandler(res, 400, 'Required fields cannot be empty');
  const user = await checkAuth(req);
  if(!user) return errorHandler(res, 401, 'Login First');
  const task = await Task.create({
    title,
    description,
    user: user._id,
  });
  res.status(200).json({
    success: true,
    message: "task created successfully",
    task,
  });
});
export default handler;