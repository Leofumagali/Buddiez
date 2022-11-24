import './styles.scss';

interface InputParams {
  width: string
  height: string
  type?: string
  placeholder?: string
  action: any
  value?: string
  min?: string
  max?: string
  required?: boolean
}

export function Input({width, height, type, action, placeholder, value, min, max, required }:InputParams) {
  return (
    <input 
      type={type}
      style={{
        'width': width, 
        'height': height,
      }}
      placeholder={placeholder}
      onChange={e => action(e.target.value)}
      value={value}
      min={min}
      max={max}
      required={required} 
    />
  )
}