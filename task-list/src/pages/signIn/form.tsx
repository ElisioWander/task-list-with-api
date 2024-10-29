import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '../../Components/Button'
import { Input } from '../../Components/input'

import { useAuth } from '../../Context/AuthContext'
import styles from './Form.module.scss'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Informe o e-mail' })
    .email({ message: 'Informe um e-mail válido' }),
  password: z.string().min(7, { message: 'Deve ter no mínimo 7 caracteres' }),
})

type SignInUserInterface = z.infer<typeof schema>

export function Form() {
  const navigate = useNavigate()

  const { signIn, isAuthenticating } = useAuth()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInUserInterface>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(signInUserData: SignInUserInterface) {
    signIn(signInUserData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Input
        label="E-mail"
        type="email"
        autoFocus
        placeholder="Seu e-mail"
        error={errors.email}
        {...register('email')}
      />
      <Input
        label="Senha"
        type="password"
        placeholder="Sua senha"
        error={errors.password}
        {...register('password')}
      />

      <div className={styles.forgotPassword}>
        <a onClick={() => navigate('/password-recover')}>Esqueci minha senha</a>
      </div>

      <Button type="submit" isLoading={isAuthenticating}>
        Entrar
      </Button>
    </form>
  )
}
