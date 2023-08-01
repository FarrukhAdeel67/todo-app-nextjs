import { Task } from "@/models/task";
import { checkAuth, connectDb } from "@/utils/features";

const { asyncError, errorHandler } = require("@/middlewares/error");

const handler = asyncError(async (req, res) => {
  await connectDb();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");
  const taskId = req.query.id;
  const task = await Task.findById(taskId);
  if (!task) return errorHandler(res, 404, "Task does not exist");
  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res.status(200).json({
        success: true,
        message: "Task updated Successfully!",
      });
  } else if (req.method === "DELETE") {
    await task.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Task deleted Successfully!",
    });
  } else {
    return errorHandler(res, 400, "This method is not available");
  }

});

export default handler;
