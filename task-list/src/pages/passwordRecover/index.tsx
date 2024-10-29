import { ArrowFatLeft as ArrowFatLeftIcon } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import styles from './PasswordRecover.module.scss'
import { Form } from './form'

export function PasswordRecover() {
  const navigate = useNavigate()

  return (
    <div>
      <header className={styles.title}>
        <h2>Task List</h2>
        <h3>Esqueci minha senha</h3>
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
