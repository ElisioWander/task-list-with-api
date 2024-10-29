import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '../../Components/Button'
import { Input } from '../../Components/input'

import { useUserPasswordReset } from '../../api/useUserPasswordReset'
import styles from './Form.module.scss'
import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'

const schema = z
  .object({
    password: z.string().min(7, { message: 'Deve ter no mínimo 7 caracteres' }),
    passwordConfirmation: z
      .string()
      .min(7, { message: 'Deve ter no mínimo 7 caracteres' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas devem ser iguais',
    path: ['passwordConfirmation'],
  })

type PasswordResetUserInterface = z.infer<typeof schema>

export function Form() {
  const { token } = useParams()
  const navigate = useNavigate()

  const { mutateAsync: userPasswordReset, isPending } = useUserPasswordReset()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PasswordResetUserInterface>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(userPasswordResetData: PasswordResetUserInterface) {
    await userPasswordReset({
      user: {
        token: token || '',
        password: userPasswordResetData.password,
        password_confirmation: userPasswordResetData.passwordConfirmation,
      },
    })

    navigate('/sign-in')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Input
        label="Senha"
        type="password"
        placeholder="Deve ter no mínimo 7 caracteres"
        autoFocus
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

      <Button type="submit" isLoading={isPending}>
        Alterar senha
      </Button>
    </form>
  )
}
