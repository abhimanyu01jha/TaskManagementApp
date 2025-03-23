import Task from "../models/task.js";

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    if (tasks.length === 0) {
      return res.status(200).json({ message: "No tasks found" }); 
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to update this task" });
    }
    if (!["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    task.status = status;
    await task.save();

    res.json({ message: "Task status updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
