"use client"

import EditTaskForm from "@/app/(authenticated)/edit/(components)/EditForm";
import {useState} from "react";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import TaskNote from "@/components/TaskNote/TaskNote";

interface Props {
  task: any
}

export default function EditTaskLayout({task}: Props) {
  const [editedTask, setEditedTask] = useState<TaskNoteInterface>(task);
  const onTaskChange = (task: TaskNoteInterface) => {
    setEditedTask(task)
  }
  return (<div className="grid grid-cols-2">
    <EditTaskForm task={task} onTaskChange={onTaskChange}/>
    <TaskNote taskNote={editedTask} showCallToAction={false}></TaskNote>
  </div>)
}
