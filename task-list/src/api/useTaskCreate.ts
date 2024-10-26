import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { TaskRequestDTO } from './TaskRequestDTO'

export function useTaskCreate() {
  const queryClient = useQueryClient()

  async function handleRequest(data: TaskRequestDTO) {
    await api.post('/tasks', { task: data })
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
