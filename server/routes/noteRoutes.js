import express from 'express';
import Note from '../models/Note.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const NOTES_FILE = path.join(process.cwd(), 'notes.json');

// In-memory fallback storage with file persistence
let memoryNotes = [];
if (fs.existsSync(NOTES_FILE)) {
  try {
    memoryNotes = JSON.parse(fs.readFileSync(NOTES_FILE, 'utf8'));
  } catch (e) {
    console.error('Failed to load memory notes from file', e);
  }
}

const saveMemoryNotes = () => {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(memoryNotes, null, 2));
};

// Get all notes
router.get('/', async (req, res) => {
  if (req.dbConnected) {
    try {
      const notes = await Note.find().sort({ updatedAt: -1 });
      return res.json(notes);
    } catch (err) {
      console.error('DB fetch failed', err);
    }
  }
  res.json(memoryNotes);
});

// Create/Update a note (Single notepad logic: usually just one main note)
router.post('/', async (req, res) => {
  const noteData = {
    _id: req.body._id || Math.random().toString(36).substr(2, 9),
    title: req.body.title || 'My Notes',
    content: req.body.content || '',
    updatedAt: new Date().toISOString()
  };

  if (req.dbConnected) {
    try {
      // Find the first note and update it, or create if none
      let note = await Note.findOne();
      if (note) {
        note.content = req.body.content;
        note.title = req.body.title || note.title;
        const updatedNote = await note.save();
        return res.json(updatedNote);
      } else {
        const newNote = new Note(req.body);
        const savedNote = await newNote.save();
        return res.status(201).json(savedNote);
      }
    } catch (err) {
      console.error('DB save failed', err);
    }
  }
  
  // Single notepad memory logic
  if (memoryNotes.length > 0) {
    memoryNotes[0] = { ...memoryNotes[0], ...noteData };
  } else {
    memoryNotes.push(noteData);
  }
  saveMemoryNotes();
  res.json(memoryNotes[0]);
});

export default router;
