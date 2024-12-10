import React from 'react';
import './Input.css';

const Input = ({
  value,
  onChange,
  placeholder = 'Ingresa una ciudad',
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
};

export default Input;