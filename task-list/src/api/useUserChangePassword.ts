import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'
import { UserChangePasswordDTO } from './UserChangePasswordRequestDTO'
import { extractError } from '../utils/extractError'
import { extractSuccessMessage } from '../utils/extractSuccessMessage'

export function useUserChangePassword() {
  async function handleRequest(data: UserChangePasswordDTO) {
    return api.post('/auth/change-password', data)
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: extractSuccessMessage,
    onError: extractError,
  })
}
