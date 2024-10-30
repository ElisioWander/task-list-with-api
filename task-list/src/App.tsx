import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer, Flip } from 'react-toastify'

import queryClient from './services/react-query'
import { router } from './router'

import 'react-toastify/dist/ReactToastify.css'

import styles from './Toast.module.scss'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        stacked
        transition={Flip}
        toastClassName={styles.customToast}
        bodyClassName={styles.customToastBody}
        progressClassName={styles.customToastProgressBar}
        closeOnClick
      />
    </QueryClientProvider>
  )
}
