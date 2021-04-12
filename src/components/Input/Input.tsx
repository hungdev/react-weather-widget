import './Input.scss'
interface IInputProps {
  onSubmit: () => void;
  onClear: () => void;
  value: string;
  onChange: (...params: any) => any;
}

export default function Input(props: IInputProps) {
  const { onSubmit, onClear, value, onChange } = props;
  return (
    <div className='custom-input'>
      <input
        className='input-location'
        placeholder='Type exact your city name then enter...'
        onChange={onChange}
        value={value}
        onKeyPress={event => event.key === 'Enter' && onSubmit && onSubmit()}
      />
      <div className='close-icon' onClick={onClear} />
    </div>
  )
}
