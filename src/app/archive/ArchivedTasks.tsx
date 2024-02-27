'use client';

import TaskNoteCollection from "@/components/TaskNoteCollection/TaskNoteCollection";
import Dialog from "@/components/dialog/Dialog";
import {useState} from "react";

interface Props {
  tasks: any
}

export default function ArchiveTasks({tasks}: Props) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const onClicked = (taskId: string) => {
    console.log('clicked¬', taskId);
    setShowDialog(true);
  }
  const primaryAction = {
    text: 'primary', onClick: () => {
    }
  }

  const secondaryAction = {
    text: 'secondary', onClick: () => {
    }
  }

  return (
    <>
      {showDialog && <Dialog
        title="test"
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}/>}
      <TaskNoteCollection taskNotes={tasks} showCallToAction={false} onClicked={onClicked}/>
    </>
  );
}
