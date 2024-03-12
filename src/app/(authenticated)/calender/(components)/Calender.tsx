'use client';

import daysInMonth from "@/utils/daysInMonth";
import WeekDay from "@/app/(authenticated)/calender/(components)/WeekDay";
import PopUp from "@/components/PopUp/PopUp";
import React, {useState} from "react";
import {onlyDate} from "@/utils/formatDate";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import {useRouter} from "next/navigation";
import CalenderPopUpItem from "@/app/(authenticated)/calender/(components)/CalenderPopUpItem";
import {deleteTodo} from "@/app/(authenticated)/actions";

interface Props {
  tasks: TaskNoteInterface[]
}

export interface DayInterface {
  id: number | undefined,
  number: number | undefined,
  name: string | undefined,
  tasks?: TaskNoteInterface[],
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export default function Calender({tasks}: Props) {
  const mobileScreen = useCheckMobileScreen();
  const router = useRouter();

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedDaysTasks, setSelectedDaysTasks] = useState<TaskNoteInterface[] | undefined>([]);

  const todaysDate = new Date();
  const days = daysInMonth(todaysDate.getMonth() + 1, todaysDate.getFullYear());
  const dayList: DayInterface[] = [];
  const firstDaysOffset = [];
  todaysDate.setDate(1);
  const firstDayOfMonthIndex = todaysDate.getDay();

  for (let i = 1; i < firstDayOfMonthIndex; i++) {
    firstDaysOffset.push({id: i});
  }

  for (let i = 0; i < 43 - firstDayOfMonthIndex; i++) {
    dayList.push({id: i, name: undefined, number: undefined});
  }

  for (let i = 0; i < days; i++) {
    todaysDate.setDate(i + 1);
    const daysTasks = tasks.filter((task: any) => {
      return onlyDate(task?.duedate) == onlyDate(todaysDate);
    });
    const weekDay = weekDays[todaysDate.getDay()];
    dayList[i] = {name: weekDay, number: i + 1, id: i, tasks: daysTasks};
  }

  if (!dayList[dayList.length - 7].number) {
    dayList.splice(-7)
  }

  const onWeekDayClick = async (day: DayInterface) => {
    // const date = `${todaysDate.getMonth() + 1}/${day.number}/${todaysDate.getFullYear()}`
    // const daysTasks = await getDaysTasks(date);
    if (!mobileScreen) {
      return;
    }
    setSelectedDaysTasks(day.tasks);
    setShowDialog(true);
  }

  const onChipClick = (event: React.MouseEvent<HTMLElement>, taskNote: TaskNoteInterface) => {
    if (mobileScreen) {
      return;
    }
    event.stopPropagation();
    router.push(`/task/${taskNote.id}`);
  }

  const handlePopUpItemClick = (event: React.MouseEvent<HTMLElement>, task: TaskNoteInterface) => {
    event.stopPropagation();
    router.push(`/task/${task.id}`);
  }

  const onPopUpItemDelete = async (event: React.MouseEvent<HTMLElement>, task: TaskNoteInterface) => {
    event.stopPropagation();
    await deleteTodo(task.id);
  }

  return <div
    className={"grid grid-cols-7 gap-0.5 sm:gap-1 bg-neutral-500 border-2 sm:border-4 border-neutral-500"}>
    <PopUp show={showDialog} onClose={() => setShowDialog(false)}>
      <div>{selectedDaysTasks?.map((task) => {
        return <
          CalenderPopUpItem
          key={task.id}
          task={task}
          onClick={(event) => {
            handlePopUpItemClick(event, task)
          }}
          onDelete={async (event) => {
            await onPopUpItemDelete(event, task);
            setShowDialog(false);
          }}/>
      })}</div>
    </PopUp>
    {firstDaysOffset.map((day) => {
      return <div key={"empty-" + day.id} className={"bg-neutral-100 flex justify-between p-2 h-full"}></div>
    })}

    {dayList.map((day: DayInterface) => {
      return (<WeekDay key={day.id} day={day} onClick={() => {
        onWeekDayClick(day)
      }}
                       onChipClick={onChipClick}/>)
    })}</div>
}
