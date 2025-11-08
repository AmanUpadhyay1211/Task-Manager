import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskManager from './components/TaskManager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TaskManager />
      <TaskForm />
    </>
  )
}

export default App
