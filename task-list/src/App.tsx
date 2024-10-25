import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

// import { Dashboard } from './Components/Dashboard'
// import { Header } from './Components/Header'

import queryClient from './services/react-query'
import { router } from './router'

// import styles from './App.module.scss'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
      {/* <div className={styles.container}>
        <Header />
        <Dashboard />
      </div> */}
    </QueryClientProvider>
  )
}
