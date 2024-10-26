import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { CustomToast } from '../Components/CustomToast'

export function useTaskRemove() {
  const queryClient = useQueryClient()

  async function handleRequest(taskId: string) {
    await api.delete('/tasks', {
      params: { id: taskId },
    })
  }

  async function restoreTask(taskId: string) {
    await api.post('/tasks/restore', {
      id: taskId,
    })
    queryClient.invalidateQueries({ queryKey: ['TASKS'] })
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: (_, taskId) => {
      toast(
        ({ closeToast }) => (
          <CustomToast
            message="Tarefa deletada"
            onClick={async () => {
              await restoreTask(taskId)
              closeToast()
            }}
          />
        ),
        {
          autoClose: 10000,
        },
      )

      queryClient.invalidateQueries({ queryKey: ['TASKS'] })
    },

    onError: (error) => toast(error.message),
  })
}
