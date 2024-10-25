import { Outlet } from 'react-router-dom'

import styles from './AuthenticatedLayout.module.scss'
import { Header } from './header'

export function AuthenticatedLayout() {
  return (
    <main className={styles.container}>
      <Header />
      <Outlet />
    </main>
  )
}
