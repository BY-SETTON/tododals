import React, {ButtonHTMLAttributes} from "react";

interface ButtonProp extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'onClick'> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode;
  className?: string;
}

export default function Button({onClick, children, className, ...props}: ButtonProp) {
  return (<button
    {...props}
    className={`bg-primary-500-50  hover:bg-primary-600 rounded-full p-3 transition-colors duration-300 ease-in-out min-w-20 ${className}`}
    onClick={(event) => {
      event.preventDefault();
      onClick?.(event);
    }}
  >
    {children}
  </button>)
}
