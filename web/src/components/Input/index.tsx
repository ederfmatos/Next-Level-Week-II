import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, name, required, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>
        {label}
        {required && ' *'}
      </label>
      <input id={name} name={name} {...rest} />
    </div>
  );
};

export default Input;
