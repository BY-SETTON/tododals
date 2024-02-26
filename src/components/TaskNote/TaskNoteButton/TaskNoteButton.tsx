import React from "react";

interface TaskNoteButtonProp {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  hoverColor: string;
  className?: string;
}

export default function TaskNoteButton({onClick, children, hoverColor, className}: TaskNoteButtonProp) {
  return (<button
    className={`bg-white rounded-full p-3 transition-colors duration-300 ease-in-out hover:text-white hover:${hoverColor} ${className}`}
    onClick={(event) => {
      event.preventDefault();
      onClick(event);
    }}>
    {children}
  </button>)
}
