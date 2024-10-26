import styles from './CustomToast.module.scss'

interface CustomToastProps {
  message: string
  onClick: () => void
}

export function CustomToast({ message, onClick }: CustomToastProps) {
  return (
    <div className={styles.container}>
      <span>{message}.</span>
      <button className={styles.button} onClick={onClick}>
        Undo
      </button>
    </div>
  )
}
