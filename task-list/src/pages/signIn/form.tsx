import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '../../Components/Button'
import { Input } from '../../Components/input'

import styles from './Form.module.scss'
import { z } from 'zod'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Informe o e-mail' })
    .email({ message: 'Informe um e-mail válido' }),
  password: z.string().min(1, { message: 'Informe a senha' }),
})

type SignInUserInterface = z.infer<typeof schema>

export function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInUserInterface>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(signInUserData: SignInUserInterface) {
    console.log('entrou')
    // signUp({
    //   data: signUpUserData,
    // })
  }

  return (
    <form className={styles.container}>
      <Input
        label="E-mail"
        type="email"
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
        <a href="#">Esqueci minha senha</a>
      </div>

      <Button onClick={handleSubmit(onSubmit)}>Entrar</Button>
    </form>
  )
}
