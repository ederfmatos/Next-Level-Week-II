import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  required?: boolean;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  required,
  ...rest
}) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>
        {label}
        {required && ' *'}
      </label>

      <select defaultValue="" id={name} name={name} {...rest}>
        <option value="" selected hidden disabled>
          Selecione uma opção
        </option>

        {options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
