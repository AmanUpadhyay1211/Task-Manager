import { useEffect, useCallback, useMemo, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Sun, Moon } from 'lucide-react';
import useTaskStore, { type FilterType } from '../store/taskStore';
import useLocalStorage from '../hooks/useLocalStorage';
import TaskForm from './TaskForm';

const TaskManager = () => {
  const { tasks, filter, theme, setTasks, toggleTask, deleteTask, setFilter, toggleTheme, reorderTasks } = useTaskStore();
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', []);
  const isInitialLoad = useRef(true);
  const isInitialized = useRef(false);

  // Only load from localStorage once on mount
  useEffect(() => {
    if (isInitialLoad.current && storedTasks.length > 0) {
      setTasks(storedTasks);
      isInitialLoad.current = false;
      isInitialized.current = true;
    } else if (isInitialLoad.current) {
      isInitialLoad.current = false;
      isInitialized.current = true;
    }
  }, [storedTasks, setTasks]);

  // Only save to localStorage when tasks change (not from localStorage sync)
  useEffect(() => {
    if (isInitialized.current) {
      setStoredTasks(tasks);
    }
  }, [tasks, setStoredTasks]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleDragEnd = useCallback(
    (result: { destination: { index: number } | null; source: { index: number } }) => {
      if (!result.destination) return;
      
      // Map filtered indices to actual task indices
      const sourceTask = filteredTasks[result.source.index];
      const destTask = filteredTasks[result.destination.index];
      
      if (!sourceTask || !destTask) return;
      
      // Find actual indices in the full tasks array
      const sourceIndex = tasks.findIndex((t) => t.id === sourceTask.id);
      const destIndex = tasks.findIndex((t) => t.id === destTask.id);
      
      if (sourceIndex === -1 || destIndex === -1) return;
      
      reorderTasks(sourceIndex, destIndex);
    },
    [reorderTasks, filteredTasks, tasks]
  );

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  return (
    <div className="task-manager">
      <header className="header">
        <div className="container">
          <h1 className="title">Task Manager</h1>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="stats">
            <div className="stat-card">
              <span className="stat-label">Total</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Completed</span>
              <span className="stat-value completed">{stats.completed}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Pending</span>
              <span className="stat-value pending">{stats.pending}</span>
            </div>
          </div>

          <TaskForm />

          <div className="filters">
            {(['all', 'pending', 'completed'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks" isDropDisabled={false}>
              {(provided) => (
                <div
                  className="task-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <AnimatePresence>
                    {filteredTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            {...(provided.draggableProps as any)}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            {...(provided.dragHandleProps as any)}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            drag={false}
                            className={`task-item ${task.completed ? 'completed' : ''} ${
                              snapshot.isDragging ? 'dragging' : ''
                            }`}
                          >
                            <div className="task-content">
                              <button
                                onClick={() => toggleTask(task.id)}
                                className="checkbox"
                                aria-label="Toggle task"
                              >
                                {task.completed && <Check size={16} />}
                              </button>
                              <span className="task-title">{task.title}</span>
                            </div>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="delete-btn"
                              aria-label="Delete task"
                            >
                              <Trash2 size={18} />
                            </button>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {filteredTasks.length === 0 && (
            <div className="empty-state">
              <p>No tasks found. Add a new task to get started!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TaskManager;
