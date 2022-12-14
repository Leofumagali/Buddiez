import styles from './styles.module.scss';

interface InputParams {
  width: string
  height: string
  padding?: string
  type?: string
  placeholder?: string
  action: any
  value?: string
  min?: string
  max?: string
  required?: boolean
  name?: string
}

export function Input({name, width, height, padding, type, action, placeholder, value, min, max, required }:InputParams) {
  return (
    <input
      name={name}
      className={styles.input}
      type={type}
      style={{
        'width': width, 
        'height': height,
        'padding': padding,
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