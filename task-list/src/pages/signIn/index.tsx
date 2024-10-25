import { CaretRight, User } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import styles from './SignIn.module.scss'
import { Form } from './form'

export function SignIn() {
  const navigate = useNavigate()

  return (
    <div>
      <header className={styles.title}>
        <h2>Task List</h2>
        <h3>Acesse sua conta</h3>
      </header>

      <Form />

      <footer className={styles.footer} onClick={() => navigate('/sign-up')}>
        <div>
          <User fontSize={24} />
        </div>
        <p>
          Não tem uma conta?
          <span>Se inscreva gratuitamente</span>
        </p>
        <div>
          <CaretRight />
        </div>
      </footer>
    </div>
  )
}
