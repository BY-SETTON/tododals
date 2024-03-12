import {DayInterface} from "@/app/(authenticated)/calender/(components)/Calender";
import Chip from "@/components/Chip/Chip";
import React, {useState} from "react";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import getActiveColor from "@/utils/getActiveColor";
import PopUp from "@/components/PopUp/PopUp";

interface Props {
  day: DayInterface;
  onClick: () => void;
  onChipClick: (event: React.MouseEvent<HTMLElement>, task: TaskNoteInterface) => void;
  onTaskDone: (task: TaskNoteInterface) => void;
}

export default function WeekDay({day, onClick, onChipClick, onTaskDone}: Props) {
  const [selectedTask, setSelectedTask] = useState<TaskNoteInterface | undefined>(undefined);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleChipClick = (event: React.MouseEvent<HTMLElement>, taskNote: TaskNoteInterface) => {
    onChipClick(event, taskNote);
  }

  const onDone = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!selectedTask) {
      return;
    }
    onTaskDone(selectedTask);
    setShowDialog(false);
  }
  const onNotDone = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowDialog(false);
  }

  return (
    <>
      <PopUp show={showDialog} onClose={() => setShowDialog(false)}>
        <div className={"flex flex-col h-full justify-between pb-8"}>
          Finished?
          <div className={"flex justify-between max-w-32"}>
            <button onClick={onDone}>Yes
            </button>
            <button onClick={onNotDone}>no
            </button>
          </div>
        </div>
      </PopUp>

      <div className={"bg-neutral-100 h-24 sm:h-32 flex flex-col p-1"} onClick={onClick}>
        <div className={" flex justify-between sm:p-2 text-neutral-400"}>
          <div className={"hidden sm:block"}>{day.name} &nbsp;</div>
          <div>{day.number}</div>
        </div>
        {day.tasks?.map((task: any) => {
          let bg400 = getActiveColor(task.size, 'bg', 400);
          let bg500 = getActiveColor(task.size, 'bg', 500);
          return <Chip
            key={task.id}
            className={` hover:cursor-pointer h-2 sm:h-5 overflow-hidden`}
            onClick={(event) => {
              handleChipClick(event, task)
            }}>
            <div className={"hidden sm:flex sm:justify-between sm:w-full"}>
              <div
                className={`${bg400} hover:${bg500} pl-1.5 w-full flex transition-all duration-300 `}>{task.name}</div>
              <div className={`${bg400} hover:${bg500} flex justify-center w-5 `} onClick={(event) => {
                setShowDialog(true)
                setSelectedTask(task);
                event.stopPropagation();
              }}>x
              </div>
            </div>
          </Chip>
        })}
      </div>
    </>
  )
}
