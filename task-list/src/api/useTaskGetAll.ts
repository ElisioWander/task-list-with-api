import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { api } from '../services/api'
import { TaskResponseDTO } from './TaskResponseDTO'
import { HttpResponseInterface } from '../interfaces/HttpResponseInterface'

export function useTaskGetAll() {
  async function handleRequest() {
    const response = await api.get('/tasks')
    return response.data
  }

  const { error, ...rest } = useQuery<HttpResponseInterface<TaskResponseDTO>>({
    queryKey: ['TASKS'],
    queryFn: handleRequest,
  })

  if (error) {
    toast(error.message)
  }

  return rest
}
