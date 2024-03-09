'use client';

import Button from "@/components/Button/Button";
import {useRouter} from "next/navigation";
import React, {useEffect, useRef, useState} from "react";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import {TaskSize} from "@/components/TodaysTasks/(enum)/task";
import {markAsDone} from "@/app/(authenticated)/actions";
import convertMarkDownToHTML from "@/utils/markDown";
import {Maximize2} from "react-feather";

const feather = require('feather-icons');

interface TaskNotProp {
  taskNote: TaskNoteInterface,
  onClicked?: (taskId: string) => void,
  className?: string,
  showCallToAction?: boolean,
  isHoverState?: boolean,
}

function TaskNote({taskNote, onClicked, showCallToAction = true, isHoverState = false, className}: TaskNotProp) {
  const [hoverState, setHoverState] = useState<boolean>(isHoverState);
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleOutSideClick = (event: Event) => {
      if (!ref.current?.contains(event.target)) {
        setHoverState(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const svgIcon = taskNote?.icon && feather.icons[taskNote.icon].toSvg({color: 'black', width: 30, height: 30});
  const router = useRouter();
  const markDownDescription = convertMarkDownToHTML(taskNote.description);

  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    markAsDone(taskNote.id);
  }

  const onEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    router.push(`/edit/${taskNote.id}`)
  }

  const onTaskClick = () => {
    onClicked?.(taskNote.id);
  }

  const onExpandClick = (event: React.MouseEvent<Element>) => {
    event.stopPropagation();
    setHoverState(true);
  }

  const sizeColor = (): { bg: string, border: string } => {
    switch (Number(taskNote.size)) {
      case TaskSize.LARGE:
        return {bg: 'bg-red-200', border: 'border-red-500'}
      case TaskSize.MEDIUM:
        return {bg: 'bg-amber-200', border: 'border-amber-500'}
      case TaskSize.SMALL:
      default:
        return {bg: 'bg-green-200', border: 'border-green-500'}
    }
  }

  return (
    <a ref={ref}
       onClick={onTaskClick}
       className={`cursor-pointer group relative block h-52 sm:h-72 lg:h-64 ${sizeColor().bg} ${className}`}>
      <span className="absolute inset-0 border-2 border-dashed border-black"></span>

      <div
        className={`relative flex h-full transform items-start border-2 ${sizeColor().border} bg-white transition-transform md:group-hover:-translate-x-2 md:group-hover:-translate-y-2 ${hoverState && '-translate-x-2 -translate-y-2'}`}
      >
        <div
          className={`mt-10 p-4 !pt-0 transition-opacity md:group-hover:absolute md:group-hover:opacity-0 sm:p-6 lg:p-8 w-full break-words ${hoverState && 'absolute opacity-0'}`}
        >
          <img src={`data:image/svg+xml;utf8,${svgIcon}`} alt=""/>
          <h2 className=" text-xl font-medium sm:text-2xl">{taskNote.name}</h2>
          {taskNote.dueDate && <p
            className="text-sm sm:text-base">{taskNote.dueDate.toLocaleDateString('en-UK')}</p>}
        </div>
        <div onClick={onExpandClick}
             className={`z-30 self-end mb-4 mr-4 sm:hidden ${hoverState && 'absolute opacity-0'}`}>
          <Maximize2/></div>
        <div
          className={`absolute overflow-auto w-full h-full opacity-0 transition-opacity md:group-hover:relative md:group-hover:opacity-100 ${hoverState && 'relative opacity-100'}`}>
          <div
            className={`w-full p-4 sm:p-6 lg:px-8 lg:pb-6 lg:pt-4 `}
          >
            <div className="flex justify-between items-start">
              <h3 className="mt-4 text-xl font-medium sm:text-2xl mb-4">{taskNote.title || taskNote.name}</h3>
              {showCallToAction && <div className="flex">
                <div className="mr-2 inline-flex">
                  <Button
                    className="hover:bg-blue-400"
                    onClick={onEdit}>EDIT</Button>
                </div>
                <div className="inline-flex">
                  <Button
                    className="hover:bg-red-400"
                    onClick={onDeleteClick}>Done</Button>
                </div>
              </div>}
            </div>
            <div className="text-container" dangerouslySetInnerHTML={{__html: markDownDescription}}/>
          </div>
        </div>
      </div>
    </a>
  );
}

export default TaskNote;
