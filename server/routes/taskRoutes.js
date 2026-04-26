import express from 'express';
import Task from '../models/Task.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const TASKS_FILE = path.join(process.cwd(), 'tasks.json');

// In-memory fallback storage with file persistence
let memoryTasks = [];
if (fs.existsSync(TASKS_FILE)) {
  try {
    memoryTasks = JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
  } catch (e) {
    console.error('Failed to load memory tasks from file', e);
  }
}

const saveMemoryTasks = () => {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(memoryTasks, null, 2));
};

// Get all tasks
router.get('/', async (req, res) => {
  if (req.dbConnected) {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      return res.json(tasks);
    } catch (err) {
      console.error('DB fetch failed, falling back to memory', err);
    }
  }
  res.json(memoryTasks);
});

// Create a task
router.post('/', async (req, res) => {
  const taskData = {
    _id: Math.random().toString(36).substr(2, 9),
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    urgency: req.body.urgency,
    dueDate: req.body.dueDate,
    progress: req.body.progress || 0,
    completed: false,
    createdAt: new Date().toISOString()
  };

  if (req.dbConnected) {
    try {
      const task = new Task(req.body);
      const newTask = await task.save();
      return res.status(201).json(newTask);
    } catch (err) {
      console.error('DB save failed, falling back to memory', err);
    }
  }
  
  memoryTasks.unshift(taskData);
  saveMemoryTasks();
  res.status(201).json(taskData);
});

// Update a task
router.put('/:id', async (req, res) => {
  if (req.dbConnected) {
    try {
      const task = await Task.findById(req.params.id);
      if (task) {
        if (req.body.title != null) task.title = req.body.title;
        if (req.body.description != null) task.description = req.body.description;
        if (req.body.category != null) task.category = req.body.category;
        if (req.body.urgency != null) task.urgency = req.body.urgency;
        if (req.body.dueDate != null) task.dueDate = req.body.dueDate;
        if (req.body.completed != null) task.completed = req.body.completed;
        if (req.body.progress != null) task.progress = req.body.progress;

        const updatedTask = await task.save();
        return res.json(updatedTask);
      }
    } catch (err) {
      console.error('DB update failed, falling back to memory', err);
    }
  }

  const index = memoryTasks.findIndex(t => t._id === req.params.id);
  if (index !== -1) {
    memoryTasks[index] = { ...memoryTasks[index], ...req.body };
    saveMemoryTasks();
    return res.json(memoryTasks[index]);
  }
  
  res.status(404).json({ message: 'Task not found' });
});

// Delete a task
router.delete('/:id', async (req, res) => {
  if (req.dbConnected) {
    try {
      const task = await Task.findById(req.params.id);
      if (task) {
        await task.deleteOne();
        return res.json({ message: 'Task deleted' });
      }
    } catch (err) {
      console.error('DB delete failed, falling back to memory', err);
    }
  }

  const index = memoryTasks.findIndex(t => t._id === req.params.id);
  if (index !== -1) {
    memoryTasks.splice(index, 1);
    saveMemoryTasks();
    return res.json({ message: 'Task deleted from memory' });
  }
  
  res.status(404).json({ message: 'Task not found' });
});

export default router;
