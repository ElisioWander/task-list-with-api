import { createContext, ReactNode, useContext, useState } from 'react'

export type TaskData = {
  id: string
  description: string
  isChecked: boolean
}

type TasksContextData = {
  currentTask: TaskData | null
  setCurrentTask: (task: TaskData) => void
}

interface TasksProviderProps {
  children: ReactNode
}

const TasksContext = createContext({} as TasksContextData)

export function TasksProvider({ children }: TasksProviderProps) {
  const [currentTask, setCurrentTask] = useState<TaskData | null>(null)

  function handleSetTask(task: TaskData) {
    setCurrentTask(task)
  }

  return (
    <TasksContext.Provider
      value={{
        currentTask,
        setCurrentTask: handleSetTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const useTaskContext = () => useContext(TasksContext)
