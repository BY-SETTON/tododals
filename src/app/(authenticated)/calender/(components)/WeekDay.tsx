import {DayInterface} from "@/app/(authenticated)/calender/(components)/Calender";
import Chip from "@/components/Chip/Chip";
import React, {useState} from "react";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import getActiveColor from "@/utils/getActiveColor";
import PopUp from "@/components/PopUp/PopUp";
import {Check} from "react-feather";

interface Props {
  day: DayInterface;
  onClick: () => void;
  onChipClick: (event: React.MouseEvent<HTMLElement>, task: TaskNoteInterface) => void;
  onTaskDone: (task: TaskNoteInterface) => void;
  tabindex: number;
}

export default function WeekDay({day, onClick, onChipClick, onTaskDone, tabindex}: Props) {
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
      <div className={"bg-neutral-100 group h-24 sm:h-32 flex flex-col p-1"} role={"button"} onClick={onClick}
           tabIndex={tabindex+1}>
        <div className={" flex justify-end sm:p-2 text-neutral-400 w-full"}>
          <div className={"group-hover:bg-neutral-200 rounded-full w-7 flex justify-center text-sm p-1"}>{day.number}</div>
        </div>
        {day.tasks?.map((task: any) => {
          let bg400 = getActiveColor(task.size, 'bg', 400);
          let bg500 = getActiveColor(task.size, 'bg', 500);
          return <Chip
            key={task.id}
            className={`${bg400} hover:cursor-pointer h-2 sm:h-5 overflow-hidden`}
            onClick={(event) => {
              handleChipClick(event, task)
            }}>
            <div className={"hidden sm:flex sm:w-full"}>
              <div
                className={`w-full ${bg400} hover:${bg500} pl-1.5  transition-all duration-300 whitespace-nowrap truncate flex items-center`}>
                {task.name}
              </div>
              <div
                className={`${bg400} hover:${bg500} flex justify-center w-7`}
                onClick={(event) => {
                  setShowDialog(true)
                  setSelectedTask(task);
                  event.stopPropagation();
                }}
                role={"button"}><Check className={"py-1 pr-1"}/>
              </div>
            </div>
          </Chip>
        })}
      </div>
    </>
  )
}
