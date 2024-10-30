import { DefaultError } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface ExtractErrorProps {
  error: string
}

export function extractError(err: DefaultError) {
  if (err instanceof AxiosError) {
    const responseMessage: ExtractErrorProps = err?.response?.data
    return toast(responseMessage.error, { type: 'error' })
  }

  return toast(err.message, { type: 'error' })
}
