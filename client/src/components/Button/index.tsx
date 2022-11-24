import './styles.scss';

interface ButtonParams {
  width: string
  height: string
  name: string
  type: 'submit' | 'button'
  isButtonInactive?: boolean
}

export function Button({name, type, width, height, isButtonInactive}: ButtonParams) {
  return (
    <button
      style={{'width': width, 'height': height}}
      type={type}
      disabled={isButtonInactive}
    >
      {name}
    </button>
  )
}