import { useState } from 'react'
import TaskForm from './components/taskForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TaskForm />
    </>
  )
}

export default App
