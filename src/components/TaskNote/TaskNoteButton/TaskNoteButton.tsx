import React from "react";

interface TaskNoteButtonProp {
  onClick: (event: any) => void;
  children: React.ReactNode;
  hoverColor: string;
}

export default function TaskNoteButton({onClick, children, hoverColor}: TaskNoteButtonProp) {
  return (<button
    className={`bg-white rounded-full p-3 transition-colors duration-300 ease-in-out hover:${hoverColor} hover:text-white`}
    onClick={(event) => {
      event.preventDefault();
      onClick(event);
    }}>
    {children}
  </button>)
}
