import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  endIcon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  const { endIcon, children, type = 'button', ...rest } = props

  return (
    <button type={type} {...rest} className={styles.Button}>
      {children}
      {endIcon}
    </button>
  )
}
