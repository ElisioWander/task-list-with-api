import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { CustomToast } from '../Components/CustomToast'
import { extractError } from '../utils/extractError'

export function useTaskRemove() {
  const queryClient = useQueryClient()

  async function handleRequest(taskId: string) {
    return api.delete('/tasks', {
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
    onSuccess: (data, taskId) => {
      toast(
        ({ closeToast }) => (
          <CustomToast
            message={data?.data?.message || ''}
            onClick={async () => {
              await restoreTask(taskId)
              closeToast()
            }}
          />
        ),
        {
          autoClose: 10000,
          closeOnClick: false,
          type: 'success',
        },
      )

      queryClient.invalidateQueries({ queryKey: ['TASKS'] })
    },

    onError: extractError,
  })
}
