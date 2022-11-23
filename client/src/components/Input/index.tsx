import './styles.scss';

interface InputParams {
  width: string
  height: string
  type?: string
  action: any
}

export function Input({width, height, type, action }:InputParams) {
  return (
    <input 
      type={type}
      style={{
        'width': width, 
        'height': height,
      }}

      onChange={e => action(e.target.value)}
    />
  )
}