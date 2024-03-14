"use client"

import TaskNoteCollection from "@/components/TaskNoteCollection/TaskNoteCollection";
import {useRouter} from "next/navigation";
import React from "react";
import {markAsDone} from "@/app/(authenticated)/actions";

interface Props {
  tasks: any
}

export default function TodaysTasks({tasks}: Props) {
  const router = useRouter();
  const onClicked = (taskId: string) => {
    router.push(`/task/${taskId}`)
  }

  const onDone = (taskId: string) => {
    markAsDone(taskId);
  }

  const onEdit = (taskId: string) => {
    router.push(`/edit/${taskId}`)
  }
  const primaryAction = {name: 'Edit', onClick: onEdit, className: 'hover:bg-neutral-400 hover:text-white'}
  const secondaryAction = {name: 'Done', onClick: onDone, className: 'hover:bg-red-400 hover:text-white'}

  return <TaskNoteCollection taskNotes={tasks} onClicked={onClicked}
                             primaryButton={primaryAction}
                             secondaryButton={secondaryAction}/>
}
