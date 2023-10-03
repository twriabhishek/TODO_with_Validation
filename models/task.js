// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
  },
  description: {
    type: String,
    required:true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  createdAt:{
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", userSchema);

export default Task;