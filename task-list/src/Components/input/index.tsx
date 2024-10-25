import { FieldError } from 'react-hook-form'
import styles from './Input.module.scss'
import { forwardRef, ForwardRefRenderFunction } from 'react'

interface InputBaseProps {
  label: string
  type: string
  placeholder?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputBaseProps> = (
  { label, type, error, placeholder, ...rest },
  ref,
) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        type={type}
        id={type}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
      {!!error && <span>{error.message}</span>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
