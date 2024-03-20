'use client';

import daysInMonth from "@/utils/daysInMonth";
import WeekDay from "@/app/(authenticated)/calender/(components)/WeekDay";
import React, {useState} from "react";
import {onlyDate} from "@/utils/formatDate";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
import {useRouter} from "next/navigation";
import {markAsDone} from "@/app/(authenticated)/actions";
import WeekDayModal from "@/app/(authenticated)/calender/(components)/WeekDayModal";

interface Props {
  tasks: TaskNoteInterface[],
  month?: number,
}

export interface DayInterface {
  id: number | undefined,
  number: number | undefined,
  name: string | undefined,
  tasks?: TaskNoteInterface[],
}

const weekDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

export default function Calender({tasks, month}: Props) {
  const mobileScreen = useCheckMobileScreen();
  const router = useRouter();

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedDaysTasks, setSelectedDaysTasks] = useState<TaskNoteInterface[] | undefined>([]);
  const [selectedDay, setSelectedDay] = useState<DayInterface | undefined>(undefined);

  const todaysDate = new Date();
  todaysDate.setMonth(month ? month - 1 : todaysDate.getMonth());

  const days = daysInMonth(todaysDate.getMonth() + 1, todaysDate.getFullYear());
  const dayList: DayInterface[] = [];
  const firstDaysOffset = [];
  todaysDate.setDate(1);
  const firstDayOfMonthIndex = todaysDate.getDay() ? todaysDate.getDay() : 7;

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

  const onWeekDayClick = (day: DayInterface) => {
    setSelectedDay(day);
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

  const onTaskDone = async (task: TaskNoteInterface) => {
    await markAsDone(task.id);
  }

  const onPopUpItemDone = async (event: React.MouseEvent<HTMLElement>, task: TaskNoteInterface) => {
    event.stopPropagation();
    await onTaskDone(task);
  }

  const onNewTaskClicked = () => {
    console.log(selectedDay);
  }

  return <>
    <WeekDayModal
      show={showDialog}
      setShowDialog={() => setShowDialog(false)}
      selectedDaysTasks={selectedDaysTasks}
      handlePopUpItemClick={handlePopUpItemClick}
      onPopUpItemDone={onPopUpItemDone}
      onNewTaskClicked={onNewTaskClicked}/>

    <div
      className={"grid grid-cols-7 gap-0.5 sm:gap-1 bg-neutral-500 border-2 sm:border-4 border-neutral-500"}>
      {weekDays.map((day) => {
        return <div key={day} className={"flex justify-center bg-neutral-200 text-neutral-600"}>{day}</div>
      })}
      {firstDaysOffset.map((day) => {
        return <div key={"empty-" + day.id} className={"bg-neutral-100 flex justify-between p-2 h-full"}></div>
      })}
      {dayList.map((day: DayInterface, index: number) => {
        return (<
          WeekDay
          tabindex={index}
          key={day.id}
          day={day}
          onClick={() => {
            onWeekDayClick(day)
          }}
          onChipClick={onChipClick}
          onTaskDone={onTaskDone}
        />)
      })}
    </div>
  </>
}
