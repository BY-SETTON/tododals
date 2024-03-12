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
  const modalContent = (show ?
      <div className={"fixed w-full h-full justify-center item-center z-10"}>
        <div className={"fixed left-0 right-0 top-0 z-20 m-auto h-full flex justify-center items-center"}
             onClick={() => {
               onClose?.()
             }}>
          <div
            className="rounded-lg  p-8 shadow-2xl min-h-72 sm:min-h-40 min-w-72 sm:min-w-96 bg-neutral-50">
            <div className="-mt-4 ml-4 mr-4 mb-2 flex justify-end w-full cursor-pointer" onClick={onClose}>
              <XCircle size={20}/>
            </div>
            <div>{children}
            </div>
          </div>
        </div>

      </div> : <></>
  );

  useEffect(() => setMounted(true), []);

  return mounted ? createPortal(modalContent, document.getElementById("modal-root") as HTMLElement) : null;

}
