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

  const bg = getActiveColor(task.size);

  return <div className={`mb-3 justify-between flex gap-1`}>
    <div className={`flex items-center bg-${bg} min-h-8 rounded-2xl pl-4 w-full`}
         onClick={onClick}>{task.name}</div>
    <div className={"bg-red-400 flex items-center px-2 rounded-2xl"}  onClick={onDone}>
      <Check/>
    </div>
  </div>
}
