import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = 'all' | 'completed' | 'pending';

interface TaskState {
  tasks: Task[];
  filter: FilterType;
  theme: 'light' | 'dark';
  setTasks: (tasks: Task[]) => void;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  toggleTheme: () => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
}

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  filter: 'all',
  theme: 'light',
  setTasks: (tasks) => set({ tasks }),
  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now().toString(),
          title,
          completed: false,
          createdAt: Date.now(),
        },
      ],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  setFilter: (filter) => set({ filter }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  reorderTasks: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.tasks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { tasks: result };
    }),
}));

export default useTaskStore;
