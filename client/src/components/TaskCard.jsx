import React from 'react';
import { CheckCircle2, Circle, Clock, Tag, Edit3, Trash2, ExternalLink } from 'lucide-react';

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete, detailed = false }) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High Priority': return 'var(--accent-red)';
      case 'Medium Priority': return 'var(--accent-cyan)';
      case 'Low Priority': return 'var(--text-muted)';
      default: return 'var(--accent-blue)';
    }
  };

  // Helper to render text with clickable links
  const renderDescription = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'var(--accent-blue)', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {part} <ExternalLink size={10} />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div 
      className="glass smooth-transition" 
      style={{ 
        padding: detailed ? '20px' : '16px', 
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        opacity: task.completed ? 0.7 : 1,
        borderLeft: detailed ? `4px solid ${getUrgencyColor(task.urgency)}` : '1px solid var(--border-glass)',
        position: 'relative',
        group: 'true'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <button 
          onClick={() => onToggleComplete(task._id)}
          style={{ background: 'none', padding: 0, marginTop: '2px' }}
        >
          {task.completed ? (
            <CheckCircle2 size={20} color="var(--accent-green)" />
          ) : (
            <Circle size={20} color="var(--text-muted)" />
          )}
        </button>
        
        <div style={{ flex: 1 }}>
          <h4 style={{ 
            fontSize: detailed ? '16px' : '14px', 
            fontWeight: '600',
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)'
          }}>
            {task.title}
          </h4>
          {detailed && task.description && (
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', wordBreak: 'break-all' }}>
              {renderDescription(task.description)}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => onEdit(task)}
            style={{ background: 'none', color: 'var(--text-muted)', padding: '4px' }}
            className="smooth-transition"
          >
            <Edit3 size={14} />
          </button>
          <button 
            onClick={() => onDelete(task._id)}
            style={{ background: 'none', color: 'var(--accent-red)', padding: '4px' }}
            className="smooth-transition"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <Clock size={12} />
            <span>{task.dueDate}</span>
          </div>
          {detailed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <Tag size={12} />
              <span>{task.category}</span>
            </div>
          )}
        </div>
        
        {detailed && (
           <span style={{ 
            fontSize: '10px', 
            padding: '4px 10px', 
            borderRadius: '10px', 
            background: 'rgba(255,255,255,0.05)',
            color: getUrgencyColor(task.urgency),
            fontWeight: '600'
          }}>
            {task.urgency}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
