import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useTaskContext } from '../../../Context/TasksContext'
import { useTaskUpdate } from '../../../api/useTaskUpdate'
import { useModal } from '../../../Context/ModalContext'
import { Button } from '../../../Components/Button'
import { Input } from '../../../Components/input'
import { Modal } from '../../../Components/Modal'

import styles from './UpdateTaskModal.module.scss'
import { z } from 'zod'

const schema = z.object({
  description: z.string().min(1, { message: 'Informe a tarefa' }),
})

type UpdateTaskDescriptionInterface = z.infer<typeof schema>

export function UpdateTaskModal() {
  const { isOpenMdal, handleCloseModal } = useModal()
  const { currentTask } = useTaskContext()

  const { mutateAsync: updateTask, isPending } = useTaskUpdate()

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateTaskDescriptionInterface>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
    },
  })

  useEffect(() => {
    setValue('description', currentTask?.description || '')
  }, [setValue, currentTask])

  async function handleUpdateTaskDescription({
    description,
  }: UpdateTaskDescriptionInterface) {
    const { id, isChecked } = currentTask || {}

    await updateTask({
      id,
      description,
      is_checked: isChecked || false,
    })
    handleCloseModal()
  }

  const editTaskValueIsEmpty = !watch('description')

  return (
    <Modal title="Editar Tarefa" isOpen={isOpenMdal} onClose={handleCloseModal}>
      <form className={styles.form}>
        <Input
          label="Tarefa"
          placeholder="Editar tarefa"
          error={errors.description}
          {...register('description')}
        />
        <div className={styles.buttons}>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            disabled={editTaskValueIsEmpty}
            isLoading={isPending}
            onClick={handleSubmit(handleUpdateTaskDescription)}
          >
            Editar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
