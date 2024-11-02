import { Check } from 'phosphor-react'

import styles from './CheckBox.module.scss'

interface CheckboxProps {
  isTaskChecked: boolean
  onMarkTaskAsChecked: (isChecked: boolean) => void
}

export function Checkbox({
  onMarkTaskAsChecked,
  isTaskChecked,
}: CheckboxProps) {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={isTaskChecked}
        onClick={(e) => {
          e.stopPropagation()
          onMarkTaskAsChecked(!isTaskChecked)
        }}
        readOnly
      />
      <span className={styles.checkMark}>
        {isTaskChecked && <Check size={11} weight={'bold'} color={'#ffffff'} />}
      </span>
    </label>
  )
}
