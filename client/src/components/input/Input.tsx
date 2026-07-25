import type { ChangeEvent } from 'react';
import './Input.css';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function Input({ value, onChange, placeholder, label }: InputProps) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <label>
      {label && <span>{label}</span>}
      <input
        className="input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </label>
  );
}