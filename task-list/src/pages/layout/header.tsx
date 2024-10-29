import { LockKey as LockKeyIcon, SignOut, User } from 'phosphor-react'
import todoLogo from '../../assets/Logo.svg'
import { useAuth } from '../../Context/AuthContext'
import styles from './Header.module.scss'
import { useState } from 'react'
import { Modal } from '../../Components/Modal'
import { ChangePasswordForm } from './changePasswordForm'

export function Header() {
  const { tokenInfo, signOut } = useAuth()

  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.userContainer}>
            <User fontSize={24} />
            <span>{tokenInfo?.email || ''}</span>
          </div>

          <div
            title="Alterar senha"
            className={styles.changePasswordContainer}
            onClick={() => setOpen(true)}
          >
            <LockKeyIcon fontSize={24} />
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

      <Modal
        title="Alterar senha"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <ChangePasswordForm onClose={() => setOpen(false)} />
      </Modal>
    </>
  )
}
