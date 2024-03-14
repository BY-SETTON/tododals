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
  const [isHover, setIsHover] = useState<boolean>(false);
  const onTaskChange = (task: TaskNoteInterface) => {
    setEditedTask(task)
  }
  const onHoverClick = (value: any) => {
    setIsHover(value.target.checked);
  }

  return (<div className="grid grid-cols-2">
    <EditTaskForm task={task} onTaskChange={onTaskChange}/>
    <div className={"flex w-full"}>
      <div className={"fixed max-w-[50%] w-full pr-16 pl-4"}>
        <TaskNote taskNote={editedTask}  isHoverState={isHover} className="mb-4"></TaskNote>
        <div className="flex flex-row">
          <input type="checkbox" onChange={onHoverClick} className="mr-4 cursor-pointer"/>
          <h2>Hover</h2>
        </div>
      </div>
    </div>
  </div>)
}
