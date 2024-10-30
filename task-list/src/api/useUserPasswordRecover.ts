import { useMutation } from '@tanstack/react-query'
import { api } from '../services/api'
import { UserPasswordRecoverDTO } from './UserPasswordRecoverDTO'
import { extractSuccessMessage } from '../utils/extractSuccessMessage'
import { extractError } from '../utils/extractError'

export function useUserPasswordRecover() {
  async function handleRequest(data: UserPasswordRecoverDTO) {
    return api.post('/password/recover', data)
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: extractSuccessMessage,
    onError: extractError,
  })
}
