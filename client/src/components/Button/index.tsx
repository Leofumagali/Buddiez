import './styles.scss';

interface ButtonParams {
  width: string
  height: string
  name: string
  type: 'submit' | 'button'
}

export function Button({name, type, width, height}: ButtonParams) {
  return (
    <button
      style={{'width': width, 'height': height}}
      type={type}
    >
      {name}
    </button>
  )
}