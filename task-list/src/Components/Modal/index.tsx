import { ReactNode } from 'react'
import { X as CloseIcon } from 'phosphor-react'
import styles from './Modal.module.scss'

interface ModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  return isOpen ? (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <header>
          <h2>{title}</h2>

          <div onClick={onClose}>
            <CloseIcon fontSize={20} />
          </div>
        </header>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  ) : (
    <></>
  )
}
