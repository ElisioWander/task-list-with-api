import { useTaskGetAll } from '../../api/useTaskGetAll'

import { Task } from './components/Task'
import { UpdateTaskModal } from './components/UpdateTaskModal'
import { TaskForm } from './components/TaskForm'
import { EmptyTasks } from './components/EmptyTasks'

import styles from './Dashboard.module.scss'

export function Dashboard() {
  const { data } = useTaskGetAll()

  const completedTasks = data?.data?.filter(
    (task) => task.attributes.isChecked === true,
  )
  const isTasksEmpty = data?.data?.length === 0

  return (
    <>
      <div className={styles.container}>
        <TaskForm />

        <main className={styles.tasksContainer}>
          <div className={styles.headerTasks}>
            <div>
              <p>Tarefas criadas</p>
              <span>{data?.data?.length}</span>
            </div>
            <div>
              <p>Concluidas</p>
              <span>
                {completedTasks?.length} de {data?.data?.length}
              </span>
            </div>
          </div>

          <div className={styles.tasks}>
            {isTasksEmpty ? (
              <EmptyTasks />
            ) : (
              data?.data?.map((task) => (
                <Task
                  key={task.id}
                  task={{
                    description: task.attributes.description,
                    id: task.id,
                    isChecked: task.attributes.isChecked,
                  }}
                />
              ))
            )}
          </div>
        </main>
      </div>

      <UpdateTaskModal />
    </>
  )
}
