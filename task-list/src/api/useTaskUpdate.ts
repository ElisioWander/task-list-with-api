import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { TaskRequestDTO } from './TaskRequestDTO'

export function useTaskUpdate() {
  const queryClient = useQueryClient()

  async function handleRequest(data: TaskRequestDTO) {
    await api.put(
      '/tasks',
      {
        task: { description: data.description, is_checked: data.is_checked },
      },
      { params: { id: data.id } },
    )
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['TASKS'],
      })
    },
    onError: (error) => {
      toast(error.message)
    },
  })
}
