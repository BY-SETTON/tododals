import React, {ButtonHTMLAttributes} from "react";

export interface ButtonProp extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'onClick' | 'type'> {
  onClick?: () => void
  name: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Button({onClick, name, className, type, ...props}: ButtonProp) {
  return (<button
    type={type}
    className={`rounded-full p-3 transition-colors duration-300 ease-in-out min-w-20 h-12 ${className}`}
    onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick?.();
    }}
  >
    {name}
  </button>)
}
