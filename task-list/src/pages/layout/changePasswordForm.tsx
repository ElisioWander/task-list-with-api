import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useUserChangePassword } from '../../api/useUserChangePassword'
import { Button } from '../../Components/Button'
import { Input } from '../../Components/input'

import styles from './ChangePasswordForm.module.scss'
import { z } from 'zod'

const schema = z
  .object({
    currentPassword: z
      .string()
      .min(7, { message: 'Deve ter no mínimo 7 caracteres' }),
    newPassword: z
      .string()
      .min(7, { message: 'Deve ter no mínimo 7 caracteres' }),
    passwordConfirmation: z
      .string()
      .min(7, { message: 'Deve ter no mínimo 7 caracteres' }),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: 'A nova senha e a confirmação da nova senha devem ser iguais',
    path: ['passwordConfirmation'],
  })

type ChangePasswordUserInterface = z.infer<typeof schema>

interface ChangePasswordFormProps {
  onClose: () => void
}

export function ChangePasswordForm({ onClose }: ChangePasswordFormProps) {
  const { mutateAsync: userChangePassword, isPending } = useUserChangePassword()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordUserInterface>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: ChangePasswordUserInterface) {
    await userChangePassword({
      user: {
        current_password: data.currentPassword,
        new_password: data.newPassword,
        password_confirmation: data.passwordConfirmation,
      },
    })

    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        type="password"
        label="Senha atual"
        autoFocus
        error={errors.currentPassword}
        {...register('currentPassword')}
      />
      <Input
        type="password"
        label="Nova senha"
        error={errors.newPassword}
        {...register('newPassword')}
      />
      <Input
        type="password"
        label="Confirmar nova senha"
        error={errors.passwordConfirmation}
        {...register('passwordConfirmation')}
      />

      <Button type="submit" isLoading={isPending}>
        Alterar senha
      </Button>
    </form>
  )
}
