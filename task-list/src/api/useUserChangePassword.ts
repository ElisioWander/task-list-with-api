import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { UserChangePasswordDTO } from './UserChangePasswordRequestDTO'

export function useUserChangePassword() {
  async function handleRequest(data: UserChangePasswordDTO) {
    return api.post('/auth/change-password', data)
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      toast('Senha alterada com sucesso')
    },
    onError: (error) => {
      toast(error.message)
    },
  })
}
