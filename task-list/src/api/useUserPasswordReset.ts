import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { UserPasswordResetDTO } from './UserPasswordResetDTO'

export function useUserPasswordReset() {
  async function handleRequest(data: UserPasswordResetDTO) {
    return api.post('/password/reset', data)
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      toast('Senha atualizada com sucesso!')
    },
    onError: (error) => {
      toast(error.message)
    },
  })
}
