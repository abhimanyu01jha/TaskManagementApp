import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }, 
    status: { 
      type: String, 
      enum: ["Pending", "In Progress", "Completed"], 
      default: "Pending" 
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  }, { timestamps: true });

export default mongoose.model("Task", taskSchema);
