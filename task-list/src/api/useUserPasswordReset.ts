import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'
import { UserPasswordResetDTO } from './UserPasswordResetDTO'
import { extractSuccessMessage } from '../utils/extractSuccessMessage'
import { extractError } from '../utils/extractError'

export function useUserPasswordReset() {
  async function handleRequest(data: UserPasswordResetDTO) {
    return api.post('/password/reset', data)
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: extractSuccessMessage,
    onError: extractError,
  })
}
