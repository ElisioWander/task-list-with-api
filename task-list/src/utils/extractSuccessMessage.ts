import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'

export function extractSuccessMessage(
  response: AxiosResponse<{ message: string }>,
) {
  return toast(response?.data?.message, { type: 'success' })
}
