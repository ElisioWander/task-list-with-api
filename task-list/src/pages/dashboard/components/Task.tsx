import { Trash } from 'phosphor-react'
import { useModal } from '../../../Context/ModalContext'

import styles from './Task.module.scss'
import { Checkbox } from '../../../Components/CheckBox'
import { useTaskContext } from '../../../Context/TasksContext'
import { useTaskUpdate } from '../../../api/useTaskUpdate'
import { useTaskRemove } from '../../../api/useTaskRemove'

type TaskData = {
  id: string
  description: string
  isChecked: boolean
}

interface TaskProps {
  task: TaskData
}

export function Task({ task }: TaskProps) {
  const { handleOpenModal } = useModal()
  const { setCurrentTask, currentTask } = useTaskContext()

  const { mutateAsync: updateTask, isPending } = useTaskUpdate()
  const { mutateAsync: removeTask, isPending: isDeleting } = useTaskRemove()

  function handleSetCurrentTask() {
    if (task?.id) {
      setCurrentTask(task)
    }
  }

  async function handleUpdateTask(isChecked: boolean) {
    await updateTask({
      id: currentTask?.id,
      description: currentTask?.description || '',
      is_checked: isChecked,
    })
  }

  async function handleRemoveTask(taskId: string) {
    await removeTask(taskId)
  }

  return (
    <div className={styles.task} onMouseEnter={handleSetCurrentTask}>
      {isPending ? (
        <span className={styles.spinner} />
      ) : (
        <Checkbox
          onMarkTaskAsChecked={handleUpdateTask}
          isTaskChecked={task.isChecked}
        />
      )}

      <div
        className={styles.descriptionContainer}
        onClick={() => {
          if (!task.isChecked) {
            handleOpenModal()
          }
        }}
      >
        {task.isChecked ? (
          <p className={styles.isChecked}>{task.description}</p>
        ) : (
          <p>{task.description}</p>
        )}
      </div>

      {isDeleting ? (
        <span className={styles.spinner} />
      ) : (
        <button onClick={() => handleRemoveTask(currentTask?.id || '')}>
          <Trash size={20} />
        </button>
      )}
    </div>
  )
}
