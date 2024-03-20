import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import React from "react";
import getActiveColor from "@/utils/getActiveColor";
import {Check} from "react-feather";

interface Props {
  task: TaskNoteInterface,
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  onDone: (event: React.MouseEvent<HTMLElement>) => void
}

export default function CalenderPopUpItem({task, onClick,onDone}: Props) {

  const bg400 = getActiveColor(task.size,'bg',400);
  const bg500 = getActiveColor(task.size,'bg',500);

  return <div className={`mb-3 justify-between flex gap-1`}>
    <button className={`flex items-center ${bg400} hover:${bg500} min-h-8 rounded-2xl pl-4 w-full`}
         onClick={onClick}>{task.name}</button>
    <button className={"bg-neutral-200 hover:bg-neutral-300 flex items-center px-2 rounded-2xl"}  onClick={onDone}>
      <Check/>
    </button>
  </div>
}
