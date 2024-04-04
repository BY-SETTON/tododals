import React, {ReactNode} from "react";

interface Props {
  children: ReactNode,
  className?: string,
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}

export default function Chip({children, className, onClick}: Props) {
  return <button
    onClick={onClick}
    className={`rounded-full mx-1.5 my-0.5 flex items-center text-sm ${className}`}
    >{children}</button>;
}
