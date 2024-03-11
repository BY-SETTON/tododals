import {DayInterface} from "@/app/(authenticated)/calender/(components)/Calender";
import Chip from "@/components/Chip/Chip";
import React from "react";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import {useRouter} from "next/navigation";

interface Props {
  day: DayInterface;
  onClick: () => void;
}

export default function WeekDay({day, onClick}: Props) {
  const router = useRouter();

  const onChipClick = (event: React.MouseEvent<HTMLElement>, taskNote: TaskNoteInterface) => {
    event.stopPropagation();
    console.log(taskNote);
    router.push(`/task/${taskNote.id}`);
  }

  return (
    <div className={"bg-neutral-100 h-32 flex flex-col"} onClick={onClick}>
      <div className={" flex justify-between p-2 text-neutral-400"}>
        <div>{day.name} &nbsp;</div>
        <div>{day.number}</div>
      </div>
      {day.tasks?.map((task: any) => {
        let bg = task.size == 0 ? 'bg-green-500' : task.size == 1 ? 'bg-orange-500' : 'bg-red-500'
        return <Chip
          key={task.id}
          className={`transition-all duration-300 ${bg} border-2 border-neutral-100 hover:cursor-pointer hover:border-neutral-500`}
          onClick={(event) => {
            onChipClick(event, task)
          }}>{task.name}</Chip>
      })}
    </div>
  )
}
