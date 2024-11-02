import { Trash } from 'phosphor-react'
import { useModal } from '../../../Context/ModalContext'

import styles from './Task.module.scss'
import { Checkbox } from '../../../Components/CheckBox'
import { useTaskUpdate } from '../../../api/useTaskUpdate'
import { useTaskRemove } from '../../../api/useTaskRemove'

export type TaskData = {
  id: string
  description: string
  isChecked: boolean
}

interface TaskProps {
  task: TaskData
}

export function Task({ task }: TaskProps) {
  const { handleOpenModal } = useModal()

  const { mutateAsync: updateTask, isPending } = useTaskUpdate()
  const { mutateAsync: removeTask, isPending: isDeleting } = useTaskRemove()

  async function handleUpdateTask(isChecked: boolean) {
    await updateTask({
      id: task?.id,
      description: task?.description || '',
      is_checked: isChecked,
    })
  }

  async function handleRemoveTask(taskId: string) {
    await removeTask(taskId)
  }

  return (
    <div className={styles.task}>
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
            handleOpenModal(task)
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
        <button onClick={() => handleRemoveTask(task?.id || '')}>
          <Trash size={20} />
        </button>
      )}
    </div>
  )
}
