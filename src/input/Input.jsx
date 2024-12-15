import './Input.css';

const Input = ({
  value,
  onChange,
  placeholder = 'Ingresa una ciudad',
}) => {
  return (
    <input id="input-search-bar"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
};

export default Input;