import React from 'react';
import { LayoutDashboard, ListTodo, Calendar, Settings, Search, CheckCircle2, Clock, FileText } from 'lucide-react';

const Sidebar = ({ tasks, activeTab, onTabChange }) => {
  const focusedTasks = tasks.slice(0, 3); // Just show first 3 for summary

  return (
    <aside className="glass-heavy smooth-transition sidebar-container" style={{ 
      width: 'var(--sidebar-width)', 
      height: '100vh', 
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      position: 'sticky',
      top: 0
    }}>
      {/* Profile Section */}
      <div className="sidebar-profile" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>SW</div>
        <div>
          <h3 style={{ fontSize: '16px' }}>Sanu Workspace</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Lead Strategist</p>
        </div>
        <Search size={20} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => onTabChange('Dashboard')} />
        <NavItem icon={<ListTodo size={20} />} label="Tasks" active={activeTab === 'Tasks'} onClick={() => onTabChange('Tasks')} />
        <NavItem icon={<Calendar size={20} />} label="Calendar" active={activeTab === 'Calendar'} onClick={() => onTabChange('Calendar')} />
        <NavItem icon={<FileText size={20} />} label="Notepad" active={activeTab === 'Notepad'} onClick={() => onTabChange('Notepad')} />
        <NavItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'Settings'} onClick={() => onTabChange('Settings')} />
      </nav>

      {/* Today's Focus Section */}
      <div className="sidebar-focus" style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Today's Focus</h3>
          <span style={{ fontSize: '12px', color: 'var(--accent-blue)' }}>View All</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {focusedTasks.map(task => (
            <div key={task._id} className="glass" style={{ padding: '12px', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <CheckCircle2 size={14} color={task.completed ? 'var(--accent-green)' : 'var(--text-muted)'} />
                <span style={{ fontSize: '13px', fontWeight: '500' }}>{task.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)', marginLeft: '22px' }}>
                <Clock size={12} />
                <span>{task.dueDate}</span>
              </div>
            </div>
          ))}
          {focusedTasks.length === 0 && (
             <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '10px' }}>No tasks for today</p>
          )}
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className="smooth-transition nav-item" 
    style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    padding: '12px 16px', 
    borderRadius: 'var(--radius-sm)',
    background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
    cursor: 'pointer'
  }}>
    {icon}
    <span style={{ fontSize: '14px', fontWeight: '500' }}>{label}</span>
  </div>
);

export default Sidebar;
