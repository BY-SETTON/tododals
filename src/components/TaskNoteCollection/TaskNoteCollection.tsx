"use client"

import {TaskNoteInterface} from "@/app/todays-tasks/TodaysTasks";
import TaskNote from "@/components/TaskNote/TaskNote";
import {PopDirection} from "@/components/TaskNote/enums/Popdirection";
import {useEffect, useState} from "react";

interface TaskNotCollectionProp {
  taskNotes: TaskNoteInterface[]
}

export default function TaskNoteCollection({taskNotes}: TaskNotCollectionProp) {

  const [windowWidth, setWindowWidth] = useState(0);

  const getPopDirection = (index: number) => {
    const isMobile = windowWidth < 640
    if (isMobile) {
      return PopDirection.LEFT;
    } else {
      switch (index % 3) {
        case 0:
          return PopDirection.LEFT;
        case 1:
          return PopDirection.UP;
        case 2:
          return PopDirection.RIGHT;
        default:
          return PopDirection.LEFT;
      }
    }
  }

  const orderTasks = () => {
    return taskNotes.sort((task) => (task.size))
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [])

  return (
    <div className={'grid lg:grid-cols-3 lg:gap-6 sm:grid-cols-2 sm:gap-2 grid-cols-1 gap-1 '}>
      {
        orderTasks().map((note, index) => (
          <TaskNote key={note.id} taskNote={note} popDirection={getPopDirection(index)}/>
        ))
      }
    </div>
  )
}
