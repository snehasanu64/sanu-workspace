import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['Work to do', 'Job Apply', 'Internship', 'Project', 'Personal'],
    default: 'Work to do',
  },
  urgency: {
    type: String,
    enum: ['High Priority', 'Medium Priority', 'Low Priority'],
    default: 'Medium Priority',
  },
  dueDate: {
    type: String, // Storing as string for simplicity in this MVP, or use Date
    default: 'Today',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
