import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

// import { Dashboard } from './Components/Dashboard'
// import { Header } from './Components/Header'

import queryClient from './services/react-query'
import { router } from './router'

// import styles from './App.module.scss'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <div className={styles.container}>
        <Header />
        <Dashboard />
      </div> */}
    </QueryClientProvider>
  )
}
