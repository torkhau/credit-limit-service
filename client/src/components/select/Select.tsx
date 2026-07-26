import type { ChangeEvent } from 'react';
import './Select.css';

type SelectProps = {
  options: { value: string; label: string }[];
  value: string;
  onChange?: (value: string) => void;
};

export function Select({ options, value, onChange }: SelectProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <select className="select" value={value} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}