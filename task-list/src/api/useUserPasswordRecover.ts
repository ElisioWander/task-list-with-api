import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { UserPasswordRecoverDTO } from './UserPasswordRecoverDTO'

export function useUserPasswordRecover() {
  async function handleRequest(data: UserPasswordRecoverDTO) {
    return api.post('/password/recover', data)
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      toast(
        'As instruções de recuperação de senha foram enviadas para o seu e-mail',
      )
    },
    onError: (error) => {
      toast(error.message)
    },
  })
}
