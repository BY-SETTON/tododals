import React, {ButtonHTMLAttributes} from "react";

interface ButtonProp extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'onClick' | 'type'> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Button({onClick, children, className, type, ...props}: ButtonProp) {
  return (<button
    type="submit"
    className={`bg-primary-500-50  rounded-full p-3 transition-colors duration-300 ease-in-out min-w-20 ${className}`}
    onClick={(event) => {
      event.preventDefault();
      onClick?.(event);
    }}
  >
    {children}
  </button>)
}
