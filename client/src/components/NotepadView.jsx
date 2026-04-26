import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Save, FileText, CheckCircle, List, ListOrdered, CheckSquare, Info } from 'lucide-react';

const API_BASE_URL = '/api/notes';

const NotepadView = () => {
  const [note, setNote] = useState({ title: 'My Workspace Notes', content: '' });
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      if (response.data && (Array.isArray(response.data) ? response.data.length > 0 : true)) {
        const noteData = Array.isArray(response.data) ? response.data[0] : response.data;
        setNote(noteData);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const saveNote = async (content) => {
    setSaving(true);
    try {
      await axios.post(API_BASE_URL, { ...note, content });
      setLastSaved(new Date().toLocaleTimeString());
      setSaving(false);
    } catch (error) {
      console.error('Error saving note:', error);
      setSaving(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (note.content !== undefined) {
        saveNote(note.content);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [note.content]);

  const insertText = (text) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = note.content;
    const newContent = currentContent.substring(0, start) + text + currentContent.substring(end);
    
    setNote({ ...note, content: newContent });
    
    // Reset focus and cursor position after state update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FileText size={24} color="var(--accent-cyan)" />
          <h1 style={{ fontSize: '32px' }}>Notepad</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {saving ? (
            <span style={{ fontSize: '12px', color: 'var(--accent-cyan)' }}>Saving...</span>
          ) : lastSaved ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--accent-green)' }}>
              <CheckCircle size={14} />
              <span>Saved at {lastSaved}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="glass-heavy" style={{ flex: 1, borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Toolbar */}
        <div style={{ 
          background: 'rgba(255,255,255,0.03)', 
          padding: '12px 32px', 
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
          <ToolbarButton icon={<List size={18} />} label="Bullet" onClick={() => insertText('\n• ')} />
          <ToolbarButton icon={<ListOrdered size={18} />} label="Number" onClick={() => insertText('\n1. ')} />
          <ToolbarButton icon={<CheckSquare size={18} />} label="Todo" onClick={() => insertText('\n[ ] ')} />
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '11px' }}>
            <Info size={14} />
            <span>Markdown shortcuts supported</span>
          </div>
        </div>

        <input 
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            borderBottom: '1px solid var(--border-glass)', 
            padding: '20px 32px', 
            fontSize: '18px', 
            fontWeight: '600', 
            color: 'var(--text-primary)',
            outline: 'none'
          }}
          placeholder="Note Title"
        />
        <textarea 
          ref={textareaRef}
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          placeholder="Start writing your thoughts..."
          style={{ 
            flex: 1, 
            background: 'transparent', 
            border: 'none', 
            padding: '32px', 
            fontSize: '16px', 
            lineHeight: '1.6', 
            color: 'var(--text-primary)', 
            outline: 'none',
            resize: 'none'
          }}
        />
      </div>
    </div>
  );
};

const ToolbarButton = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="smooth-transition"
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px', 
      background: 'rgba(255,255,255,0.05)', 
      color: 'var(--text-secondary)', 
      padding: '6px 12px', 
      borderRadius: '6px', 
      fontSize: '13px',
      border: '1px solid transparent'
    }}
    onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--border-glass)'}
    onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
  >
    {icon}
    {label}
  </button>
);

export default NotepadView;
