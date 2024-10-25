import { CaretRight, SignIn } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { Form } from './form'
import styles from './SignUp.module.scss'

export function SignUp() {
  const navigate = useNavigate()

  return (
    <div>
      <div className={styles.title}>
        <h2>Task List</h2>
        <h3>Cadastre-se gratuitamente</h3>
      </div>

      <Form />

      <footer className={styles.footer} onClick={() => navigate('/sign-in')}>
        <div>
          <SignIn fontSize={24} />
        </div>
        <p>
          Já possui uma conta?
          <span>Entre na plataforma</span>
        </p>
        <div>
          <CaretRight />
        </div>
      </footer>
    </div>
  )
}
