import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ListTodo } from 'lucide-react';
import TaskCard from './TaskCard';

const CalendarView = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewDate, setViewDate] = useState(new Date());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const currentMonth = months[viewDate.getMonth()];
  const currentYear = viewDate.getFullYear();
  
  // Helper to get days in month
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(viewDate.getMonth(), viewDate.getFullYear());
  const firstDay = getFirstDayOfMonth(viewDate.getMonth(), viewDate.getFullYear());

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingDays = Array.from({ length: firstDay }, (_, i) => i);

  const tasksForSelectedDate = tasks.filter(t => t.dueDate === selectedDate);

  const handleMonthChange = (offset) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setViewDate(newDate);
  };

  return (
    <div className="main-content" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }}>
      {/* Left Column: Calendar Grid */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px' }}>Calendar</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '12px' }}>
            <ChevronLeft size={20} style={{ cursor: 'pointer' }} onClick={() => handleMonthChange(-1)} />
            <span style={{ fontWeight: '600', minWidth: '140px', textAlign: 'center' }}>{currentMonth} {currentYear}</span>
            <ChevronRight size={20} style={{ cursor: 'pointer' }} onClick={() => handleMonthChange(1)} />
          </div>
        </div>

        <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {days.map(day => (
              <div key={day} style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{day}</div>
            ))}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
            {paddingDays.map(i => <div key={`padding-${i}`} />)}
            
            {calendarDays.map(day => {
              const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedDate === dateStr;
              const hasTasks = tasks.some(t => t.dueDate === dateStr);
              
              return (
                <div 
                  key={day} 
                  onClick={() => setSelectedDate(dateStr)}
                  style={{ 
                    aspectRatio: '1', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: '12px',
                    background: isSelected ? 'var(--accent-blue)' : 'rgba(255,255,255,0.03)',
                    border: isSelected ? 'none' : '1px solid var(--border-glass)',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  className="smooth-transition"
                >
                  <span style={{ fontSize: '16px', fontWeight: '600', color: isSelected ? 'white' : 'var(--text-primary)' }}>{day}</span>
                  {hasTasks && (
                    <div style={{ 
                      width: '4px', 
                      height: '4px', 
                      borderRadius: '50%', 
                      background: isSelected ? 'white' : 'var(--accent-green)', 
                      marginTop: '4px' 
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Right Column: Tasks for Selected Date */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <CalendarIcon size={20} color="var(--accent-blue)" />
            <h2 style={{ fontSize: '18px' }}>{selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : selectedDate}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {tasksForSelectedDate.length > 0 ? (
              tasksForSelectedDate.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onToggleComplete={onToggleComplete} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                />
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <ListTodo size={40} style={{ marginBottom: '16px', opacity: 0.2 }} />
                <p>No tasks scheduled for this date.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarView;
