import { useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task } from '../store/taskStore';

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const TaskDetailsModal = ({ task, isOpen, onClose, onDelete }: TaskDetailsModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!task) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const formatDuration = (startTime: number, endTime: number) => {
    const diff = endTime - startTime;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 200,
              duration: 0.3
            }}
            className="task-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header">
              <div className="modal-title-wrapper">
                {task.completed ? (
                  <CheckCircle2 size={24} className="status-icon completed" />
                ) : (
                  <Circle size={24} className="status-icon pending" />
                )}
                <h2 className="modal-title">{task.title}</h2>
              </div>
              <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="modal-content">
              {/* Status */}
              <div className="info-section">
                <div className="info-item">
                  <div className="info-label">
                    <span className="info-icon">
                      {task.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                    </span>
                    Status
                  </div>
                  <div className={`status-badge ${task.completed ? 'completed' : 'pending'}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </div>
                </div>

                {/* Created Date */}
                <div className="info-item">
                  <div className="info-label">
                    <Calendar size={18} className="info-icon" />
                    Created
                  </div>
                  <div className="info-value">
                    <div className="info-value-primary">{formatDate(task.createdAt)}</div>
                    <div className="info-value-secondary">{formatTimeAgo(task.createdAt)}</div>
                  </div>
                </div>

                {/* Completion Time */}
                {task.completed && (
                  <>
                    {task.completedAt ? (
                      <>
                        <div className="info-item">
                          <div className="info-label">
                            <CheckCircle2 size={18} className="info-icon" />
                            Completed
                          </div>
                          <div className="info-value">
                            <div className="info-value-primary">{formatDate(task.completedAt)}</div>
                            <div className="info-value-secondary">{formatTimeAgo(task.completedAt)}</div>
                          </div>
                        </div>

                        <div className="info-item highlight">
                          <div className="info-label">
                            <Clock size={18} className="info-icon" />
                            Time Taken
                          </div>
                          <div className="info-value">
                            <div className="time-taken">
                              {formatDuration(task.createdAt, task.completedAt)}
                            </div>
                            <div className="info-value-secondary">
                              From creation to completion
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="info-item">
                        <div className="info-label">
                          <CheckCircle2 size={18} className="info-icon" />
                          Completed
                        </div>
                        <div className="info-value">
                          <div className="info-value-primary">Completion time not available</div>
                          <div className="info-value-secondary">
                            This task was completed before time tracking was added
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Task ID (for debugging) */}
                <div className="info-item small">
                  <div className="info-label">Task ID</div>
                  <div className="info-value-small">{task.id}</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button onClick={handleDelete} className="delete-modal-btn" aria-label="Delete task">
                <Trash2 size={18} />
                Delete Task
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskDetailsModal;

