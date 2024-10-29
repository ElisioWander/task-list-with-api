import { ArrowFatLeft as ArrowFatLeftIcon } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import styles from './PasswordReset.module.scss'
import { Form } from './form'

export function PasswordReset() {
  const navigate = useNavigate()

  return (
    <div>
      <header className={styles.title}>
        <h2>Task List</h2>
        <h3>Alterar senha</h3>
      </header>

      <Form />

      <footer className={styles.footer} onClick={() => navigate('/sign-in')}>
        <div>
          <ArrowFatLeftIcon fontSize={24} />
        </div>
        <p>Voltar para o login</p>
      </footer>
    </div>
  )
}
