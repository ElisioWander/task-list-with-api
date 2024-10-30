import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import styles from './AuthenticatedLayout.module.scss'
import { Header } from './header'

export function AuthenticatedLayout() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    navigate('/sign-in')
  }

  return (
    <main className={styles.container}>
      <Header />
      <Outlet />
    </main>
  )
}
