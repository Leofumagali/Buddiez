import styles from './styles.module.scss';

interface ButtonParams {
  width: string
  height: string
  name: string
  type: 'submit' | 'button'
  isButtonInactive?: boolean
  onClick: () => void
  color: string
}

export function Button({onClick, name, type, width, height, color, isButtonInactive}: ButtonParams) {
  return (
    <button
      className={styles.button}
      style={{'width': width, 'height': height, 'backgroundColor': color}}
      type={type}
      disabled={isButtonInactive}
      onClick={onClick}
    >
      {name}
    </button>
  )
}