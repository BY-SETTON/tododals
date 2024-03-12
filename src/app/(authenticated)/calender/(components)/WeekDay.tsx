import {DayInterface} from "@/app/(authenticated)/calender/(components)/Calender";
import Chip from "@/components/Chip/Chip";
import React from "react";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import getActiveColor from "@/utils/getActiveColor";

interface Props {
  day: DayInterface;
  onClick: () => void;
  onChipClick: (event: React.MouseEvent<HTMLElement>, task: TaskNoteInterface) => void;
}

export default function WeekDay({day, onClick, onChipClick}: Props) {

  const handleChipClick = (event: React.MouseEvent<HTMLElement>, taskNote: TaskNoteInterface) => {
    onChipClick(event, taskNote);
  }

  return (
    <div className={"bg-neutral-100 h-24 sm:h-32 flex flex-col p-1"} onClick={onClick}>
      <div className={" flex justify-between sm:p-2 text-neutral-400"}>
        <div className={"hidden sm:block"}>{day.name} &nbsp;</div>
        <div>{day.number}</div>
      </div>
      {day.tasks?.map((task: any) => {
        let bg = getActiveColor(task.size);
        console.log(bg);
        let hover = task.size == 0 ? 'hover:border-green-500' : task.size == 1 ? 'hover:border-amber-500' : 'hover:border-red-500'
        return <Chip
          key={task.id}
          className={`transition-all duration-300 bg-${bg} border-2 border-neutral-100 hover:cursor-pointer ${hover} h-2 sm:h-5`}
          onClick={(event) => {
            handleChipClick(event, task)
          }}>
          <div className={"hidden sm:block"}>{task.name}</div>
        </Chip>
      })}
    </div>
  )
}
