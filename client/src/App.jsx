import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskCard from './components/TaskCard';
import CreateTaskModal from './components/CreateTaskModal';
import CalendarView from './components/CalendarView';
import SettingsView from './components/SettingsView';
import NotepadView from './components/NotepadView';
import './App.css';

const API_BASE_URL = '/api/tasks';

/**
 * Sanu Workspace - Main Application Component
 * 
 * This is the heart of the application. It handles everything from
 * fetching your tasks to sending you friendly reminders.
 */
function App() {
  // --- 📦 Application State ---
  // We use these variables to keep track of what's happening in your app.
  const [tasks, setTasks] = useState([]);          // Holds the list of all your tasks
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the "Create Task" popup
  const [taskToEdit, setTaskToEdit] = useState(null);    // Stores the task you're currently editing
  const [loading, setLoading] = useState(true);          // Shows a loading message while we fetch data
  const [currentTab, setCurrentTab] = useState('Dashboard'); // Tracks which page you're looking at

  // --- 🚀 Startup Logic ---
  // These run once when you first open the app.
  useEffect(() => {
    fetchTasks();                    // Load your tasks from the database
    requestNotificationPermission(); // Ask if we can send you desktop alerts
  }, []);

  // Check for upcoming deadlines whenever your tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      checkUpcomingTasks();
    }
  }, [tasks]);

  // --- 🔔 Notification System ---
  // This part sends you an alert 2 days before a task is due.
  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const checkUpcomingTasks = () => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    tasks.forEach(task => {
      if (task.completed) return;
      
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // If a task is due in exactly 2 days, show a desktop alert!
      if (diffDays === 2) {
        const notifiedKey = `notified_${task._id}`;
        if (!localStorage.getItem(notifiedKey)) {
          new Notification('Upcoming Task Reminder', {
            body: `Don't forget: "${task.title}" is due in 2 days!`,
            icon: '/favicon.ico'
          });
          localStorage.setItem(notifiedKey, 'true'); // Remember that we alerted you
        }
      }
    });
  };

  // --- 🛠️ Server Communication (API) ---
  
  // Fetches your tasks from the backend (or the local tasks.json file)
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Oops! Could not load tasks:', error);
      setLoading(false);
    }
  };

  // Saves a new task or updates an existing one
  const handleSaveTask = async (taskData, id = null) => {
    try {
      if (id) {
        // We're editing an existing task
        const response = await axios.put(`${API_BASE_URL}/${id}`, taskData);
        setTasks(tasks.map(t => t._id === id ? response.data : t));
      } else {
        // We're creating a brand new task
        const response = await axios.post(API_BASE_URL, taskData);
        setTasks([response.data, ...tasks]);
      }
      setIsModalOpen(false);
      setTaskToEdit(null);
    } catch (error) {
      console.error('Could not save your changes:', error);
    }
  };

  // Deletes a task after asking for your confirmation
  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task forever?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        setTasks(tasks.filter(t => t._id !== id));
      } catch (error) {
        console.error('Could not delete the task:', error);
      }
    }
  };

  // Marks a task as "Done" or "To Do"
  const toggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, {
        completed: !task.completed
      });
      setTasks(tasks.map(t => t._id === id ? response.data : t));
    } catch (error) {
      console.error('Could not update status:', error);
    }
  };

  // Opens the "Create Task" modal in editing mode
  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // --- 🎨 Page Rendering ---
  // Decides which component to show based on the active tab
  const renderContent = () => {
    switch (currentTab) {
      case 'Dashboard':
        return (
          <Dashboard 
            tasks={tasks} 
            onToggleComplete={toggleComplete} 
            onAddTask={() => { setTaskToEdit(null); setIsModalOpen(true); }} 
            onEditTask={openEditModal}
            onDeleteTask={deleteTask}
          />
        );
      case 'Tasks':
        return (
          <div className="main-content">
            <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>All Tasks</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {tasks.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onToggleComplete={toggleComplete} 
                  detailed 
                  onEdit={openEditModal}
                  onDelete={deleteTask}
                />
              ))}
              {tasks.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No tasks here yet!</p>}
            </div>
          </div>
        );
      case 'Calendar':
        return (
          <CalendarView 
            tasks={tasks} 
            onToggleComplete={toggleComplete} 
            onEdit={openEditModal} 
            onDelete={deleteTask} 
          />
        );
      case 'Notepad':
        return <NotepadView />;
      case 'Settings':
        return <SettingsView />;
      default:
        return (
          <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ color: 'var(--text-muted)' }}>{currentTab}</h1>
              <p style={{ color: 'var(--text-muted)' }}>Coming soon in a future update!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {/* 🧭 Left Navigation */}
      <Sidebar tasks={tasks} activeTab={currentTab} onTabChange={setCurrentTab} />
      
      {/* 🖼️ Main Content Area */}
      {loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="smooth-transition" style={{ color: 'var(--accent-green)', fontSize: '20px' }}>
            Launching Sanu Workspace...
          </div>
        </div>
      ) : (
        renderContent()
      )}

      {/* ➕ Create/Edit Modal */}
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setTaskToEdit(null); }} 
        onSave={handleSaveTask} 
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

export default App;
