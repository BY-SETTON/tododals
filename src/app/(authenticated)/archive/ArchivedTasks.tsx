'use client';

import TaskNoteCollection from "@/components/TaskNoteCollection/TaskNoteCollection";
import React from "react";
import {deleteTodo, markAsUnDone} from "@/app/(authenticated)/actions";

interface Props {
  tasks: any
}

export default function ArchiveTasks({tasks}: Props) {

  const onUnArchiveClick = async (taskId: string) => {
    if (!taskId) {
      return;
    }
    await markAsUnDone(taskId);
  }

  const onDeleteClick = async (taskId: string) => {
    if (!taskId) {
      return;
    }
    await deleteTodo(taskId);
  }

  const primaryAction = {name: 'unarchive', onClick: onUnArchiveClick, className: 'hover:bg-green-500 hover:text-white'}
  const secondaryAction = {name: 'delete', onClick: onDeleteClick, className: 'hover:bg-red-400 hover:text-white'}

  return (
    <TaskNoteCollection
      taskNotes={tasks}
      onClicked={() => {
      }}
      primaryButton={primaryAction}
      secondaryButton={secondaryAction}/>);
}
