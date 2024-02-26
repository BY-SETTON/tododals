'use client';

import TaskNoteButton from "@/components/TaskNote/TaskNoteButton/TaskNoteButton";
import {useRouter} from "next/navigation";
import React from "react";
import {TaskNoteInterface} from "@/app/todays-tasks/(interfaces)/task";
import {TaskSize} from "@/app/todays-tasks/(enum)/task";
import {deleteTodo} from "@/app/actions";

const feather = require('feather-icons');

interface TaskNotProp {
  taskNote: TaskNoteInterface
  className?: string,
}

function TaskNote({taskNote, className}: TaskNotProp) {
  const router = useRouter();
  const svgIcon = taskNote?.icon && feather.icons[taskNote.icon].toSvg({color: 'black', width: 30, height: 30});

  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteTodo(taskNote.id);
  }

  const onEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    router.push(`/edit/${taskNote.id}`)
  }

  const onTaskClick = () => {
    router.push(`/task/${taskNote.id}`)
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

  return (<a onClick={onTaskClick}
             className={`cursor-pointer group relative block h-40 sm:h-60 lg:h-52 ${sizeColor().bg}`}>
    <span className="absolute inset-0 border-2 border-dashed border-black"> </span>

    <div
      className={`relative flex h-full transform items-end border-2 ${sizeColor().border} bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2`}
    >
      <div
        className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"
      >
        <img src={`data:image/svg+xml;utf8,${svgIcon}`} alt=""/>
        <h2 className="mt-4 text-xl font-medium sm:text-2xl">{taskNote.name}</h2>
      </div>

      <div
        className="w-full absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"
      >
        <h3 className="mt-4 text-xl font-medium sm:text-2xl">{taskNote.title || taskNote.name}</h3>

        <p className="mb-4 mt-4 text-sm sm:text-base">{taskNote.description}</p>
        <div className="w-full flex justify-between">
          <div className="mr-2 inline-flex">
            <TaskNoteButton
              hoverColor="bg-blue-400"
              onClick={onEdit}>EDIT</TaskNoteButton>
          </div>
          <div className="inline-flex">
            <TaskNoteButton
              hoverColor="bg-red-400"
              onClick={onDeleteClick}>Done</TaskNoteButton>
          </div>
        </div>
      </div>
    </div>
  </a>);
}

export default TaskNote;
