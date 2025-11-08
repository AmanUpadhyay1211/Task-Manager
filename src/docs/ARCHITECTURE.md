# 🏗️ Project Architecture

This document outlines the architecture, design patterns, and technical decisions made in the Lime Tray Todo App.

## 📐 Overall Architecture

The application follows a **component-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│           React Application             │
├─────────────────────────────────────────┤
│  Presentation Layer (Components)        │
│  ├── TaskManager.tsx                    │
│  ├── TaskForm.tsx                       │
│  └── About.tsx                          │
├─────────────────────────────────────────┤
│  State Management Layer (Zustand)        │
│  └── taskStore.ts                       │
├─────────────────────────────────────────┤
│  Data Persistence Layer                 │
│  └── useLocalStorage.ts                 │
├─────────────────────────────────────────┤
│  Routing Layer (React Router)           │
│  └── App.tsx                            │
└─────────────────────────────────────────┘
```

## 🧩 Component Architecture

### Component Hierarchy

```
App
├── Router
│   ├── Route: / (Home)
│   │   ├── TaskManager
│   │   │   ├── TaskForm
│   │   │   ├── Stats
│   │   │   ├── Filters
│   │   │   └── TaskList (DragDropContext)
│   │   │       └── TaskItem (Draggable)
│   │   └── Link (About)
│   └── Route: /about
│       └── About
```

### Component Responsibilities

#### **App.tsx**
- **Purpose**: Root component and routing configuration
- **Responsibilities**:
  - Sets up React Router
  - Defines application routes
  - Provides navigation structure

#### **TaskManager.tsx**
- **Purpose**: Main task management interface
- **Responsibilities**:
  - Orchestrates task display and management
  - Handles drag and drop operations
  - Manages filter state
  - Syncs with localStorage
  - Displays task statistics
  - Theme management

#### **TaskForm.tsx**
- **Purpose**: Task creation form
- **Responsibilities**:
  - Input validation
  - Form submission handling
  - Error display
  - Optimized with React.memo

#### **About.tsx**
- **Purpose**: About/Profile page
- **Responsibilities**:
  - Displays developer information
  - Shows project details
  - Social links

## 🗄️ State Management

### Zustand Store Structure

```typescript
interface TaskState {
  // State
  tasks: Task[]
  filter: FilterType
  theme: 'light' | 'dark'
  
  // Actions
  setTasks: (tasks: Task[]) => void
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  setFilter: (filter: FilterType) => void
  toggleTheme: () => void
  reorderTasks: (startIndex: number, endIndex: number) => void
}
```

### State Flow

1. **User Action** → Component calls store action
2. **Store Update** → Zustand updates state
3. **Component Re-render** → React re-renders subscribed components
4. **LocalStorage Sync** → useEffect syncs to localStorage
5. **Persistence** → Data saved to browser storage

## 💾 Data Persistence

### LocalStorage Strategy

The app uses a custom `useLocalStorage` hook that:
- Automatically syncs state to localStorage
- Handles JSON serialization/deserialization
- Provides error handling
- Initializes from localStorage on mount

### Sync Mechanism

```typescript
// Initial Load
useEffect(() => {
  if (storedTasks.length > 0) {
    setTasks(storedTasks) // Load from localStorage
  }
}, [])

// Save on Change
useEffect(() => {
  if (initialized) {
    setStoredTasks(tasks) // Save to localStorage
  }
}, [tasks])
```

**Key Design Decision**: Using refs to prevent infinite loops between localStorage and state updates.

## 🎨 Styling Architecture

### CSS Architecture

- **CSS Variables**: Theme-aware color system
- **Utility Classes**: Custom utility classes for common patterns
- **Component Styles**: Scoped styles for each component
- **Responsive Design**: Mobile-first approach with media queries

### Theme System

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  /* ... */
}

body.dark {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  /* ... */
}
```

**Benefits**:
- Single source of truth for colors
- Easy theme switching
- Consistent design system

## 🎯 Design Patterns

### 1. **Container/Presentational Pattern**
- TaskManager: Container (logic + state)
- TaskForm: Presentational (focused on UI)

### 2. **Custom Hooks Pattern**
- `useLocalStorage`: Reusable localStorage logic
- Encapsulates complex state synchronization

### 3. **Memoization Pattern**
- `useMemo` for filtered tasks
- `useCallback` for event handlers
- `React.memo` for TaskForm component

### 4. **Controlled Components**
- All form inputs are controlled
- State flows unidirectionally

## 🔄 Data Flow

```
User Input
    ↓
Component Handler
    ↓
Zustand Action
    ↓
Store Update
    ↓
Component Re-render
    ↓
LocalStorage Sync
    ↓
Browser Storage
```

## 🎭 Animation Strategy

### Framer Motion Integration

- **Entry Animations**: Tasks fade in from top
- **Exit Animations**: Tasks slide out to left
- **Drag Feedback**: Visual feedback during drag operations
- **Theme Transitions**: Smooth color transitions

### Performance Considerations

- Animations use GPU-accelerated properties
- `AnimatePresence` handles exit animations
- Minimal re-renders during animations

## 🧪 Type Safety

### TypeScript Strategy

- **Strict Types**: All components typed
- **Interface Definitions**: Clear contracts for data structures
- **Type Inference**: Leverages TypeScript inference where possible
- **Generic Hooks**: `useLocalStorage<T>` for type safety

## 📦 Dependency Management

### Core Dependencies

- **React 19.1.1**: Latest React features
- **Zustand 5.0.8**: Minimal state management
- **React Router 7.9.5**: Client-side routing
- **Framer Motion 12.23.24**: Animations

### Why These Choices?

1. **Zustand over Redux**: Simpler API, less boilerplate
2. **Framer Motion**: Best-in-class animation library
3. **React Router**: Industry standard for React routing
4. **Tailwind CSS**: Rapid UI development

## 🚀 Performance Optimizations

1. **Code Splitting**: Route-based code splitting
2. **Memoization**: Strategic use of useMemo/useCallback
3. **Virtual Scrolling**: Scrollable container prevents long lists
4. **Lazy Loading**: Components loaded on demand
5. **Optimized Re-renders**: Minimal unnecessary re-renders

## 🔒 Error Handling

- **Try-Catch Blocks**: LocalStorage operations wrapped
- **Error Boundaries**: React error boundaries (can be added)
- **Validation**: Input validation before state updates
- **Type Safety**: TypeScript prevents many runtime errors

## 📱 Responsive Design

- **Mobile-First**: Base styles for mobile
- **Breakpoints**: Media queries for tablet/desktop
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch-Friendly**: Large tap targets

## 🎯 Future Architecture Considerations

1. **API Integration**: Ready for backend integration
2. **Offline Support**: Service Worker integration possible
3. **State Persistence**: Can migrate to IndexedDB for larger datasets
4. **Testing**: Structure supports unit and integration tests
5. **Micro-frontends**: Architecture allows for modular expansion

---

This architecture prioritizes:
- ✅ Maintainability
- ✅ Scalability
- ✅ Performance
- ✅ Developer Experience
- ✅ User Experience

