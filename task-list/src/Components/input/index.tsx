import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
import styles from './Input.module.scss'

interface InputBaseProps {
  label?: string
  type?: string
  value?: string | number | readonly string[]
  placeholder?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputBaseProps> = (
  { label, value, type = 'text', error, placeholder, ...rest },
  ref,
) => {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <input
        type={type}
        id={type}
        value={value}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
      {!!error && <span>{error.message}</span>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
