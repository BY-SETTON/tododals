import {ReactNode} from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Card({children, className}: Props) {
  return (
    <div
      className={`w-xl py-12 px-12 rounded-lg shadow-lg transition mb-20 flex justify-center flex-col ${className}`}>
      {children}
    </div>
  )
}
