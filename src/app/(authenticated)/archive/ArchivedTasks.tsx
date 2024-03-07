'use client';

import TaskNoteCollection from "@/components/TaskNoteCollection/TaskNoteCollection";
import React, {useState} from "react";
import {deleteTodo, markAsUnDone} from "@/app/(authenticated)/actions";
import PopUp from "@/components/PopUp/PopUp";
import Button from "@/components/Button/Button";

interface Props {
  tasks: any
}

export default function ArchiveTasks({tasks}: Props) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<string | undefined>(undefined);
  const onClicked = (taskId: string) => {
    setShowDialog(true);
    setSelectedTask(taskId)
  }
  const primaryAction = {
    text: 'UNARCHIVE', onClick: () => {
      if (!selectedTask) {
        return;
      }
      markAsUnDone(selectedTask);
      setShowDialog(false);
    }
  }

  const secondaryAction = {
    text: 'DELETE', onClick: () => {
      if (!selectedTask) {
        return;
      }
      deleteTodo(selectedTask);
      setShowDialog(false);
    }
  }

  return (
    <>
      <PopUp show={showDialog} onClose={() => setShowDialog(false)}>
        <h2 className="text-lg font-bold">Would you like to restore or delete this task?</h2>
        <p className="mt-2 text-sm text-gray-500"></p>
        <div className="mt-4 flex gap-2">
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              primaryAction.onClick();
            }}
            className="hover:bg-primary-400"
          >{primaryAction.text}</Button>
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              secondaryAction.onClick();
            }}
            className="hover:bg-red-400">
            {secondaryAction.text}
          </Button>
        </div>
      </PopUp>

      <TaskNoteCollection taskNotes={tasks} showCallToAction={false} onClicked={onClicked}/>
    </>
  );
}
