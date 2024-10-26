import { SignOut, User } from 'phosphor-react'
import todoLogo from '../../assets/Logo.svg'
import { useAuth } from '../../Context/AuthContext'
import styles from './Header.module.scss'

export function Header() {
  const { tokenInfo, signOut } = useAuth()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.userContainer}>
          <User fontSize={24} />
          <span>{tokenInfo?.email || ''}</span>
        </div>

        <div className={styles.signOutContainer} onClick={() => signOut()}>
          <SignOut fontSize={24} />
          <span>Sair da conta</span>
        </div>
      </div>
      <div className={styles.headerImage}>
        <img src={todoLogo} alt="Logotipo Todo" />
      </div>
    </header>
  )
}
