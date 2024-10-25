import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  endIcon?: ReactNode
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  const {
    endIcon,
    isLoading = false,
    children,
    type = 'button',
    disabled = false,
    ...rest
  } = props

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      {...rest}
      className={styles.Button}
    >
      {isLoading ? (
        <span className={styles.spinner} />
      ) : (
        <>
          {children}
          {endIcon}
        </>
      )}
    </button>
  )
}
