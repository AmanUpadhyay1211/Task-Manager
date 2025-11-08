# 🐛 Issues & Solutions

This document tracks all issues encountered during development and their solutions.

## 🔴 Critical Issues

### 1. Infinite Loop in State Synchronization

**Issue**: Maximum update depth exceeded error when syncing tasks between Zustand store and localStorage.

**Error Message**:
```
Uncaught Error: Maximum update depth exceeded. This can happen when a component 
repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
```

**Root Cause**:
- Circular dependency between `tasks` state and `storedTasks` from localStorage
- `useEffect` watching `storedTasks` → calls `setTasks` → updates `tasks` → triggers `useEffect` watching `tasks` → calls `setStoredTasks` → updates `storedTasks` → infinite loop

**Solution**:
```typescript
// Used refs to track initialization state
const isInitialLoad = useRef(true);
const isInitialized = useRef(false);

// Only load from localStorage once on mount
useEffect(() => {
  if (isInitialLoad.current && storedTasks.length > 0) {
    setTasks(storedTasks);
    isInitialLoad.current = false;
    isInitialized.current = true;
  }
}, [storedTasks, setTasks]);

// Only save after initialization
useEffect(() => {
  if (isInitialized.current) {
    setStoredTasks(tasks);
  }
}, [tasks, setStoredTasks]);
```

**Status**: ✅ Resolved

---

### 2. React Beautiful DnD Setup Error

**Issue**: `isDropDisabled must be a boolean` error from react-beautiful-dnd.

**Error Message**:
```
react-beautiful-dnd: A setup problem was encountered.
> Invariant failed: isDropDisabled must be a boolean
```

**Root Cause**:
- Missing explicit `isDropDisabled` prop on `Droppable` component
- react-beautiful-dnd requires explicit boolean value

**Solution**:
```tsx
<Droppable droppableId="tasks" isDropDisabled={false}>
  {/* ... */}
</Droppable>
```

**Status**: ✅ Resolved

---

### 3. TypeScript Type Conflict: Framer Motion + React Beautiful DnD

**Issue**: Type incompatibility between framer-motion's `motion.div` and react-beautiful-dnd's drag props.

**Error Message**:
```
Type '{ children: Element[]; initial: {...}; animate: {...}; ... }' is not assignable 
to type 'Omit<HTMLMotionProps<"div">, "ref">'.
Types of property 'onDragStart' are incompatible.
```

**Root Cause**:
- Both libraries define `onDragStart` with different type signatures
- Framer Motion expects `(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void`
- React Beautiful DnD provides `DragEventHandler<HTMLDivElement>`

**Solution**:
```tsx
<motion.div
  ref={provided.innerRef}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {...(provided.draggableProps as any)}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {...(provided.dragHandleProps as any)}
  drag={false} // Disable framer-motion drag, use react-beautiful-dnd
  // ... other props
>
```

**Status**: ✅ Resolved (with type assertion)

---

## 🟡 Medium Priority Issues

### 4. Drag and Drop Index Mismatch with Filters

**Issue**: When filtering tasks (e.g., showing only "completed"), drag and drop used filtered indices instead of actual task array indices.

**Root Cause**:
- `filteredTasks` array has different indices than `tasks` array
- `reorderTasks` function expected indices from full `tasks` array
- Dragging filtered task at index 0 might actually be task at index 5 in full array

**Solution**:
```typescript
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
```

**Status**: ✅ Resolved

---

### 5. Tailwind CSS v4 Syntax Error

**Issue**: Using old Tailwind v3 syntax with Tailwind v4 installed.

**Error Message**:
```
'@tailwind base' is no longer available in v4. 
Use '@import "tailwindcss/preflight"' instead.
```

**Root Cause**:
- Project upgraded to Tailwind CSS v4
- Old v3 directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) deprecated

**Solution**:
```css
/* Old (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* New (v4) */
@import "tailwindcss";
```

**Status**: ✅ Resolved

---

### 6. Package Manager Mismatch

**Issue**: `vite: command not found` error when running `npm run dev` or `pnpm run dev`.

**Error Message**:
```
sh: line 1: vite: command not found
```

**Root Cause**:
- Both `package-lock.json` (npm) and `pnpm-lock.yaml` (pnpm) present
- Dependencies installed with one package manager but scripts run with another
- Binary resolution issues

**Solution**:
1. Choose one package manager (pnpm recommended)
2. Remove conflicting lock file
3. Reinstall dependencies: `pnpm install`
4. Update scripts to use `pnpm exec`:
```json
{
  "scripts": {
    "dev": "pnpm exec vite",
    "build": "tsc -b && pnpm exec vite build"
  }
}
```

**Status**: ✅ Resolved

---

### 7. ESLint Configuration Error

**Issue**: ESLint flat config using incorrect imports and syntax.

**Error Message**:
```
Parsing error: Unexpected token <
Parsing error: Unexpected token interface
```

**Root Cause**:
- Incorrect ESLint flat config format
- Using non-existent `defineConfig` and `globalIgnores` from 'eslint/config'
- Missing TypeScript parser configuration

**Solution**:
```javascript
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    // ... rest of config
  },
)
```

**Status**: ✅ Resolved

---

## 🟢 Low Priority Issues

### 8. Unused Dependencies

**Issue**: `framer` and `motion` packages installed but not used.

**Root Cause**:
- Only `framer-motion` is needed
- `framer` and `motion` are separate packages, not required

**Solution**:
- Removed from `package.json`:
  - `framer`
  - `motion`

**Status**: ✅ Resolved

---

### 9. Unnecessary Callback Wrappers

**Issue**: Wrapper functions that don't add value.

**Code**:
```typescript
const handleToggle = useCallback((id: string) => {
  toggleTask(id);
}, [toggleTask]);
```

**Solution**:
- Removed wrappers, use store functions directly:
```tsx
<button onClick={() => toggleTask(task.id)}>
```

**Status**: ✅ Resolved

---

### 10. Page Length Growing with Tasks

**Issue**: As more tasks are added, the page becomes longer and requires scrolling the entire page.

**Solution**:
- Added fixed-height scrollable container:
```css
.task-list {
  max-height: 60vh;
  overflow-y: auto;
  /* ... */
}
```

**Status**: ✅ Resolved

---

## 🔍 Debugging Tips

### Common Debugging Steps

1. **Check Console**: Always check browser console first
2. **React DevTools**: Use React DevTools for component state
3. **Zustand DevTools**: Enable for state debugging
4. **Network Tab**: Check for failed requests
5. **LocalStorage**: Inspect localStorage in DevTools

### Useful Commands

```bash
# Check for TypeScript errors
pnpm exec tsc --noEmit

# Run linter
pnpm lint

# Check bundle size
pnpm build && ls -lh dist
```

## 📚 Lessons Learned

### 1. State Synchronization
- Always use refs to prevent circular dependencies
- Initialize state carefully to avoid loops
- Separate initialization from updates

### 2. Type Safety
- TypeScript catches many issues early
- Type assertions should be used sparingly
- Prefer proper types over `any`

### 3. Library Compatibility
- Check library compatibility before combining
- Read documentation for breaking changes
- Use type assertions when necessary for incompatible types

### 4. Package Management
- Stick to one package manager per project
- Remove conflicting lock files
- Use consistent commands

### 5. Performance
- Memoization is important but use wisely
- Avoid unnecessary re-renders
- Profile before optimizing

## 🛠️ Prevention Strategies

### Code Review Checklist
- [ ] No circular dependencies in useEffect
- [ ] All required props explicitly set
- [ ] Type safety maintained
- [ ] No unused dependencies
- [ ] Proper error handling

### Testing Checklist
- [ ] Test with empty state
- [ ] Test with many items
- [ ] Test with filters active
- [ ] Test drag and drop
- [ ] Test theme switching
- [ ] Test localStorage persistence

---

## 🟡 Additional Issues Fixed

### 11. React Beautiful DnD isCombineEnabled Error

**Issue**: Console error about `isCombineEnabled must be a boolean`.

**Error Message**:
```
Invariant failed: isCombineEnabled must be a boolean
```

**Root Cause**:
- Missing `isCombineEnabled` prop on `Droppable` component
- react-beautiful-dnd requires explicit boolean value for this prop

**Solution**:
```tsx
<Droppable droppableId="tasks" isDropDisabled={false} isCombineEnabled={false}>
  {/* ... */}
</Droppable>
```

**Status**: ✅ Resolved

---

### 12. Completion Time Not Showing for Old Tasks

**Issue**: Tasks completed before `completedAt` field was added don't show completion time.

**Root Cause**:
- Old tasks in localStorage don't have `completedAt` timestamp
- Modal only showed completion info if `completedAt` exists

**Solution**:
- Updated modal to show completion status even without timestamp
- Added helpful message for old completed tasks
- New completions automatically get timestamp

**Status**: ✅ Resolved

---

**Total Issues Resolved**: 12
**Critical Issues**: 3
**Medium Priority**: 5
**Low Priority**: 4

**Last Updated**: Current Date

