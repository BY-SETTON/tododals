'use client';

import TaskNoteCollection from "@/components/TaskNoteCollection/TaskNoteCollection";
import Dialog from "@/components/dialog/Dialog";
import {useState} from "react";
import {markAsUnDone} from "@/app/actions";

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
    text: 'YES', onClick: () => {
      if (!selectedTask) {
        return;
      }
      markAsUnDone(selectedTask);
      setShowDialog(false);
    }
  }

  const secondaryAction = {
    text: 'NO', onClick: () => {
      setShowDialog(false);
    }
  }

  return (
    <>
      {showDialog && <Dialog
        title="Would you like to restore this task from archives?"
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        onClose={() => {
          setShowDialog(false)
        }}/>}
      <TaskNoteCollection taskNotes={tasks} showCallToAction={false} onClicked={onClicked}/>
    </>
  );
}
