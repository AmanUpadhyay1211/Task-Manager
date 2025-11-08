# 🍋 Lime Tray - Advanced Todo App

A modern, feature-rich task management application built with React, TypeScript, and cutting-edge web technologies. This app demonstrates best practices in React development, state management, and user experience design.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![Zustand](https://img.shields.io/badge/Zustand-5.0.8-FF6B6B)

## ✨ Features

- ✅ **Task Management**: Create, edit, delete, and toggle task completion
- 📱 **Task Details Modal**: Click any task to view detailed information with smooth bottom-sheet animation
- ⏱️ **Completion Time Tracking**: Automatically tracks and displays time taken to complete tasks
- 🎨 **Dark/Light Theme**: Seamless theme switching with persistent preferences
- 📋 **Smart Filtering**: Filter tasks by All, Pending, or Completed
- 🎯 **Drag & Drop**: Reorder tasks with intuitive drag-and-drop functionality
- 💾 **Local Storage**: Automatic persistence of tasks and preferences
- 🎭 **Smooth Animations**: Beautiful transitions powered by Framer Motion
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🔍 **Scrollable Task List**: Fixed-height container with custom scrollbar
- 📊 **Task Statistics**: Real-time stats showing total, completed, and pending tasks

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/AmanUpadhyay1211/Task-Manager.git>
cd "Task Manager"
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🛠️ Tech Stack

### Core
- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.1.7** - Lightning-fast build tool

### State Management
- **Zustand 5.0.8** - Lightweight state management

### UI & Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Animation library
- **Lucide React** - Beautiful icon library

### Routing
- **React Router DOM 7.9.5** - Client-side routing

### Drag & Drop
- **React Beautiful DnD 13.1.1** - Drag and drop functionality

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── TaskManager.tsx      # Main task management component
│   ├── TaskForm.tsx         # Task creation form
│   └── TaskDetailsModal.tsx # Task details modal (bottom sheet)
├── pages/                   # Page components
│   └── About.tsx            # About page
├── store/                   # State management
│   └── taskStore.ts         # Zustand store for tasks
├── hooks/                   # Custom React hooks
│   └── useLocalStorage.ts   # LocalStorage hook
├── App.tsx                  # Main app component
├── main.tsx                 # Application entry point
└── index.css                # Global styles
```

## 🎯 Key Features Explained

### Task Management
- Add new tasks with validation (minimum 3 characters)
- Mark tasks as complete/incomplete
- Delete tasks with confirmation
- Real-time task statistics
- Click any task to view detailed information in a beautiful modal

### Task Details Modal
- **Bottom Sheet Animation**: Smooth slide-up animation from bottom (mobile-first design)
- **Completion Tracking**: Shows when task was created and completed
- **Time Taken**: Displays duration from creation to completion
- **Task Information**: View task status, creation date, completion date, and task ID
- **Quick Actions**: Delete task directly from modal
- **Responsive**: Adapts beautifully to mobile and desktop screens

### Theme System
- Toggle between light and dark themes
- Theme preference persists across sessions
- Smooth theme transitions

### Drag & Drop
- Reorder tasks by dragging
- Works correctly with filtered views
- Visual feedback during dragging

### Local Storage
- Automatic task persistence
- No data loss on page refresh
- Efficient sync mechanism
- Completion timestamps are preserved

### Completion Time Tracking
- Automatically tracks when tasks are completed
- Displays time taken in task list for completed tasks
- Shows detailed completion information in modal
- Updates correctly when tasks are uncompleted and re-completed

## 📚 Documentation

For more detailed information, see:

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Project architecture and design decisions
- [STATUS.md](./STATUS.md) - Current project status and roadmap
- [ISSUES.md](./ISSUES.md) - Issues encountered and solutions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Aman Upadhyay**

- GitHub: [@AmanUpadhyay1211](https://github.com/AmanUpadhyay1211)
- LinkedIn: [allthingsaman](https://linkedin.com/in/allthingsaman)
- Email: amanupadhyay1211@gmail.com

---

Built with ❤️ using React, TypeScript, and modern web technologies.
