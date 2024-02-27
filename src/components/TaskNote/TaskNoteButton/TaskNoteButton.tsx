import React from "react";

interface TaskNoteButtonProp {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export default function TaskNoteButton({onClick, children, className}: TaskNoteButtonProp) {
  return (<button
    className={`bg-white rounded-full p-3 transition-colors duration-300 ease-in-out hover:text-white ${className}`}
    onClick={(event) => {
      event.preventDefault();
      onClick(event);
    }}>
    {children}
  </button>)
}
