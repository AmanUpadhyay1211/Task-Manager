import { useState, useCallback, memo } from 'react';
import { Plus } from 'lucide-react';
import useTaskStore from '../store/taskStore';

const TaskForm = memo(() => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedInput = input.trim();

      if (!trimmedInput) {
        setError('Task cannot be empty');
        return;
      }

      if (trimmedInput.length < 3) {
        setError('Task must be at least 3 characters');
        return;
      }

      addTask(trimmedInput);
      setInput('');
      setError('');
    },
    [input, addTask]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError('');
  }, []);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Add a new task..."
          className={`task-input ${error ? 'error' : ''}`}
          aria-label="New task"
        />
        <button type="submit" className="add-btn" aria-label="Add task">
          <Plus size={20} />
        </button>
      </div>
      {error && <span className="error-message">{error}</span>}
    </form>
  );
});

TaskForm.displayName = 'TaskForm';

export default TaskForm;
