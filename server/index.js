import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zen_todo';

// Serve built frontend files from client/dist
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Middleware
app.use(cors());
app.use(express.json());

// Database connection logic
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log('Using local file fallback (MongoDB not connected)'));

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/notes', noteRoutes);

// Password Verification Endpoint
app.post('/api/verify-password', (req, res) => {
  const { password } = req.body;
  const correctPassword = process.env.WORKSPACE_PASSWORD || 'sanu6227';
  if (password === correctPassword) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// SPA Routing: Serve index.html for any request that isn't an API call
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
