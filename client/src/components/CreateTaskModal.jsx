import React, { useState, useEffect } from 'react';
import { X, Save, Briefcase, Send, GraduationCap, Code, User, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateTaskModal = ({ isOpen, onClose, onSave, taskToEdit = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Work to do',
    urgency: 'Medium Priority',
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        category: taskToEdit.category || 'Work to do',
        urgency: taskToEdit.urgency || 'Medium Priority',
        dueDate: taskToEdit.dueDate || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({ 
        title: '', 
        description: '', 
        category: 'Work to do', 
        urgency: 'Medium Priority', 
        dueDate: new Date().toISOString().split('T')[0] 
      });
    }
  }, [taskToEdit, isOpen]);

  const categories = [
    { name: 'Work to do', icon: <Briefcase size={16} />, color: 'var(--accent-blue)' },
    { name: 'Job Apply', icon: <Send size={16} />, color: 'var(--accent-cyan)' },
    { name: 'Internship', icon: <GraduationCap size={16} />, color: 'var(--accent-green)' },
    { name: 'Project', icon: <Code size={16} />, color: 'var(--accent-purple)' },
    { name: 'Personal', icon: <User size={16} />, color: 'var(--text-muted)' }
  ];

  const urgencies = ['High Priority', 'Medium Priority', 'Low Priority'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, taskToEdit?._id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        background: 'rgba(0,0,0,0.8)', 
        backdropFilter: 'blur(8px)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 1000 
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-heavy" 
          style={{ 
            width: '100%', 
            maxWidth: '500px', 
            borderRadius: 'var(--radius-lg)', 
            padding: '32px',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <button onClick={onClose} style={{ color: 'var(--text-muted)', background: 'none' }}><X /></button>
            <h2 style={{ fontSize: '20px' }}>{taskToEdit ? 'Edit Task' : 'New Task'}</h2>
            <button 
              onClick={handleSubmit}
              style={{ background: 'var(--accent-green)', color: 'var(--bg-deep)', padding: '8px 20px', borderRadius: '20px', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Save size={16} /> Save
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', display: 'block' }}>Task Intent</label>
              <input 
                type="text" 
                placeholder="What needs to be done?"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-glass)', padding: '12px 0', fontSize: '20px', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', display: 'block' }}>Context & Notes</label>
              <textarea 
                placeholder="Add specific details or sub-steps..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '16px', fontSize: '14px', color: 'var(--text-primary)', outline: 'none', minHeight: '100px', resize: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', display: 'block' }}>Category</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {categories.map(c => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: c.name })}
                      className="smooth-transition"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        padding: '10px', 
                        borderRadius: 'var(--radius-sm)',
                        background: formData.category === c.name ? 'rgba(255,255,255,0.08)' : 'transparent',
                        border: `1px solid ${formData.category === c.name ? c.color : 'transparent'}`,
                        color: formData.category === c.name ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontSize: '13px'
                      }}
                    >
                      <span style={{ color: c.color }}>{c.icon}</span>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', display: 'block' }}>Urgency</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {urgencies.map(u => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setFormData({ ...formData, urgency: u })}
                      className="smooth-transition"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        padding: '10px', 
                        borderRadius: 'var(--radius-sm)',
                        background: formData.urgency === u ? 'rgba(255,255,255,0.08)' : 'transparent',
                        border: '1px solid transparent',
                        color: formData.urgency === u ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontSize: '13px'
                      }}
                    >
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: u === 'High Priority' ? 'var(--accent-red)' : u === 'Medium Priority' ? 'var(--accent-cyan)' : 'var(--text-muted)'
                      }} />
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', display: 'block' }}>Due Horizon</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input 
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="glass smooth-transition"
                  style={{ 
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-glass)',
                    fontSize: '14px',
                    outline: 'none',
                    colorScheme: 'dark'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Today', offset: 0 },
                  { label: 'Tomorrow', offset: 1 },
                  { label: 'Next Week', offset: 7 },
                  { label: 'Month End', type: 'monthEnd' }
                ].map(quickDate => (
                  <button
                    key={quickDate.label}
                    type="button"
                    onClick={() => {
                      const d = new Date();
                      if (quickDate.type === 'monthEnd') {
                        const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
                        setFormData({ ...formData, dueDate: lastDay.toISOString().split('T')[0] });
                      } else {
                        d.setDate(d.getDate() + quickDate.offset);
                        setFormData({ ...formData, dueDate: d.toISOString().split('T')[0] });
                      }
                    }}
                    style={{ 
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.03)',
                      color: 'var(--text-muted)',
                      fontSize: '11px',
                      border: '1px solid var(--border-glass)'
                    }}
                  >
                    {quickDate.label}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateTaskModal;
