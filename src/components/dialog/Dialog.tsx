import Button from "@/components/Button/Button";
import React from "react";
import {XCircle} from "react-feather";

interface Props {
  title: string,
  primaryAction: {
    text: string,
    onClick: () => void,
  },
  secondaryAction: {
    text: string,
    onClick: () => void,
  },
  onClose?: () => void,
}

export default function Dialog({title, primaryAction, secondaryAction, onClose}: Props) {
  return (
    <div className={"fixed left-0 right-0 top-0 z-20 m-auto h-full flex justify-center items-center"}
         onClick={() => {
           onClose?.()
         }}>
      <div
        className="rounded-lg bg-white p-8 shadow-2xl min-h-40 min-w-96">
        <div className="-mt-4 ml-4 mr-4 mb-2 flex justify-end w-full cursor-pointer" onClick={onClose}>
          <XCircle size={20}/>
        </div>
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="mt-2 text-sm text-gray-500"></p>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={primaryAction.onClick}
              className="hover:bg-primary-400"
              name={primaryAction.text}
            ></Button>
            <Button
              onClick={secondaryAction.onClick}
              className="hover:bg-red-400"
              name={secondaryAction.text}>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
    ;
}
