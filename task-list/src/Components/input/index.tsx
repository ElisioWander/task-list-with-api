import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from 'react'
import { FieldError } from 'react-hook-form'
import styles from './Input.module.scss'

interface InputBaseProps {
  label?: string
  type?: string
  value?: string | number | readonly string[]
  placeholder?: string
  autoFocus?: boolean
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputBaseProps> = (
  { label, value, type = 'text', error, autoFocus, placeholder, ...rest },
  ref,
) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <input
        type={type}
        id={type}
        value={value}
        placeholder={placeholder}
        autoFocus={isDesktop ? autoFocus : false}
        ref={ref}
        {...rest}
      />
      {!!error && <span>{error.message}</span>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
