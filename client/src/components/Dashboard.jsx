import React from 'react';
import TaskCard from './TaskCard';

const Dashboard = ({ tasks, onToggleComplete, onAddTask, onEditTask, onDeleteTask }) => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="main-content">
      {/* Header Section */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>{getGreeting()}, Sanu</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Ready to find your flow today? You have <span style={{ color: 'var(--accent-red)' }}>{tasks.filter(t => t.urgency === 'High Priority' && !t.completed).length} high-priority</span> tasks waiting.
          </p>
        </div>
        <button 
          onClick={onAddTask}
          className="smooth-transition" 
          style={{ 
            background: 'var(--accent-green)', 
            color: 'var(--bg-deep)', 
            padding: '12px 24px', 
            borderRadius: 'var(--radius-sm)',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          Create Task
        </button>
      </header>

      {/* Hero Stats */}
      <div className="dashboard-grid">
        <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
           <div style={{ position: 'relative', width: '180px', height: '180px' }}>
              <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent-green)" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * progressPercent) / 100} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease-out' }} />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <h2 style={{ fontSize: '32px' }}>{progressPercent}%</h2>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Daily Progress</p>
              </div>
           </div>
           <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>What is your next focus?</p>
              <button style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--accent-green)', padding: '8px 24px', borderRadius: '20px', marginTop: '12px', fontSize: '12px', border: '1px solid rgba(0,255,163,0.2)' }}>Focus</button>
           </div>
        </div>

        <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px' }}>Current Objectives</h2>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{completedTasks}/{tasks.length} Completed</span>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {tasks.length > 0 ? (
                tasks.slice(0, 4).map(task => (
                  <TaskCard key={task._id} task={task} onToggleComplete={onToggleComplete} onEdit={onEditTask} onDelete={onDeleteTask} />
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No objectives set for today.</p>
              )}
           </div>
        </div>
      </div>

      {/* Task List Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px' }}>Strategy Launch</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
             <span style={{ padding: '4px 12px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', fontSize: '12px' }}>Filter</span>
             <span style={{ padding: '4px 12px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', fontSize: '12px' }}>Sort</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {tasks.map(task => (
            <TaskCard key={task._id} task={task} onToggleComplete={onToggleComplete} detailed onEdit={onEditTask} onDelete={onDeleteTask} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
