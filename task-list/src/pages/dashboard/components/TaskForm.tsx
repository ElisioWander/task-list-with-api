import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import { useTaskCreate } from '../../../api/useTaskCreate'
import { Button } from '../../../Components/Button'
import { Input } from '../../../Components/input'

import styles from './TaskForm.module.scss'
import { z } from 'zod'

const schema = z.object({
  description: z.string().min(1, { message: 'Informe a tarefa' }),
})

type CreateTaskInterface = z.infer<typeof schema>

export function TaskForm() {
  const { mutateAsync: createTask, isPending } = useTaskCreate()

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateTaskInterface>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
    },
  })

  async function handleCreateTask(data: CreateTaskInterface) {
    await createTask({
      description: data.description,
      is_checked: false,
    })

    reset()
  }

  const isNewTaskEmpty = !watch('description')

  return (
    <form className={styles.form}>
      <Input
        placeholder="Adicionar uma nova tarefa"
        error={errors.description}
        {...register('description')}
      />

      <Button
        disabled={isNewTaskEmpty}
        isLoading={isPending}
        onClick={handleSubmit(handleCreateTask)}
      >
        Criar
        <PlusCircle size={16} weight={'bold'} />
      </Button>
    </form>
  )
}
