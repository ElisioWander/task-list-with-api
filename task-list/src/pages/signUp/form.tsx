import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '../../Components/Button'
import { Input } from '../../Components/input'

import styles from './Form.module.scss'
import { z } from 'zod'

const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Informe o email' })
      .email({ message: 'Informe um e-mail válido' }),
    password: z
      .string()
      .min(1, { message: 'Informe a senha' })
      .length(7, { message: 'Deve ter no mínimo 7 caracteres' }),
    passwordConfirmation: z
      .string()
      .min(1, { message: 'Confirme a senha' })
      .length(7, { message: 'Deve ter no mínimo 7 caracteres' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas devem ser iguais',
    path: ['passwordConfirmation'],
  })

type SignUpUserInterface = z.infer<typeof schema>

export function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpUserInterface>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(signUpUserData: SignUpUserInterface) {
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
        placeholder="Deve ter no mínimo 7 caracteres"
        error={errors.password}
        {...register('password')}
      />
      <Input
        label="Confirme sua senha"
        type="password"
        placeholder="Deve ter no mínimo 7 caracteres"
        error={errors.passwordConfirmation}
        {...register('passwordConfirmation')}
      />

      <Button type="button" onClick={handleSubmit(onSubmit)}>
        Cadastre-se
      </Button>
    </form>
  )
}
