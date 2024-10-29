import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '../../Components/Button'
import { Input } from '../../Components/input'

import styles from './Form.module.scss'
import { z } from 'zod'
import { useUserPasswordRecover } from '../../api/useUserPasswordRecover'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Informe o e-mail' })
    .email({ message: 'Informe um e-mail válido' }),
})

type PasswordRecoverUserInterface = z.infer<typeof schema>

export function Form() {
  const { mutateAsync: userPasswordRecover, isPending } =
    useUserPasswordRecover()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<PasswordRecoverUserInterface>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(passwordRecoverData: PasswordRecoverUserInterface) {
    userPasswordRecover({ user: { email: passwordRecoverData.email } })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Input
        label="E-mail"
        type="email"
        autoFocus
        placeholder="Informe seu e-mail para a recuperação da senha"
        error={errors.email}
        {...register('email')}
      />

      <Button type="submit" isLoading={isPending}>
        Recuperar minha senha
      </Button>
    </form>
  )
}
