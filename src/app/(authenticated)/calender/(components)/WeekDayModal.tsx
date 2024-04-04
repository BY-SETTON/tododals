import PopUp from "@/components/PopUp/PopUp";
import CalenderPopUpItem from "@/app/(authenticated)/calender/(components)/CalenderPopUpItem";
import Button from "@/components/Button/Button";
import React from "react";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";

interface Props {
  show: boolean;
  setShowDialog: (show: boolean) => void;
  selectedDaysTasks: TaskNoteInterface[] | undefined;
  handlePopUpItemClick: (event: React.MouseEvent<HTMLElement>, task: TaskNoteInterface) => void;
  onPopUpItemDone: (event: React.MouseEvent<HTMLElement>, task: TaskNoteInterface) => void;
  onNewTaskClicked: () => void;
}

export default function WeekDayModal({
                                       show,
                                       setShowDialog,
                                       selectedDaysTasks,
                                       handlePopUpItemClick,
                                       onPopUpItemDone,
                                       onNewTaskClicked
                                     }: Props) {
  return (
    <PopUp show={show} onClose={() => setShowDialog(false)}>
      <div className={"flex h-full flex-col justify-between"}>
        <div>{selectedDaysTasks?.map((task) => {
          return <
            CalenderPopUpItem
            key={task.id}
            task={task}
            onClick={(event) => {
              handlePopUpItemClick(event, task)
            }}
            onDone={async (event) => {
              await onPopUpItemDone(event, task);
              setShowDialog(false);
            }}/>
        })}</div>
        <Button name={"NEW"} onClick={onNewTaskClicked}
                className={"flex w-full bg-neutral-400 hover:bg-neutral-500 justify-center text-neutral-50"}/>
      </div>
    </PopUp>)
}
