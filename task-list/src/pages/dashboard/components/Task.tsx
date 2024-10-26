import { Trash } from 'phosphor-react'
import { useModal } from '../../../Context/ModalContext'

import styles from './Task.module.scss'
import { Checkbox } from '../../../Components/CheckBox'
import { useTaskContext } from '../../../Context/TasksContext'
import { useTaskUpdate } from '../../../api/useTaskUpdate'

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

      <button>
        <Trash size={14} />
      </button>
    </div>
  )
}
