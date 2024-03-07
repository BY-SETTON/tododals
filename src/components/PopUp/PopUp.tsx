"use client"

import React, {ReactNode, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {XCircle} from "react-feather";

interface Props {
  children: ReactNode;
  onClose?: () => void;
  show: boolean;
}

export default function PopUp({children, onClose, show}: Props) {
  const [mounted, setMounted] = useState(false);
  const modalCss = 'fixed w-full h-full justify-center item-center'
  const showHideClassName = show ? `${modalCss} block` : `${modalCss} none`;
  const modalContent = (
    <div className={showHideClassName}>
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
          <div>{children}
          </div>
        </div>
      </div>
      )
    </div>
  );

  useEffect(() => setMounted(true), []);

  return mounted ? createPortal(modalContent, document.getElementById("modal-root") as HTMLElement) : null;

}
