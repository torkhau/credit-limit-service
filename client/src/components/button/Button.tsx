import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export function Button({ children, type = 'button', ...restProps }: ButtonProps) {
  return (
    <button type={type} className="button" {...restProps}>
      {children}
    </button>
  );
}
