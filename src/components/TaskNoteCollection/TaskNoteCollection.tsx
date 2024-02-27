'use client';

import TaskNote from "@/components/TaskNote/TaskNote";
import {TaskNoteInterface} from "@/app/todays-tasks/(interfaces)/task";
import {TaskSize} from "@/app/todays-tasks/(enum)/task";

interface TaskNotCollectionProp {
  taskNotes: TaskNoteInterface[],
  onClicked: (taskId: string) => void,
  showCallToAction?: boolean;
}

export default function TaskNoteCollection({taskNotes, onClicked, showCallToAction}: TaskNotCollectionProp) {
  const largeTasks = taskNotes.filter((task) => (task.size == TaskSize.LARGE))
  const mediumTasks = taskNotes.filter((task) => (task.size == TaskSize.MEDIUM))
  const smallTasks = taskNotes.filter((task) => (task.size == TaskSize.SMALL))

  return (
    <>
      {!!largeTasks.length &&
        <div className={'grid lg:grid-cols-3 lg:gap-6 sm:grid-cols-2 sm:gap-2 grid-cols-1 gap-1 mb-20'}>
          {
            largeTasks.map((note, index) => (
              <TaskNote key={note.id} taskNote={note} onClicked={onClicked} showCallToAction={showCallToAction}/>
            ))
          }
        </div>}
        {!!mediumTasks.length &&
          <div className={'grid lg:grid-cols-3 lg:gap-6 sm:grid-cols-2 sm:gap-2 grid-cols-1 gap-1 mb-20'}>

            {
              mediumTasks.map((note, index) => (
                <TaskNote key={note.id} taskNote={note} onClicked={onClicked} showCallToAction={showCallToAction}/>
              ))
            }
          </div>}
        {!!smallTasks.length &&
          <div className={'grid lg:grid-cols-3 lg:gap-6 sm:grid-cols-2 sm:gap-2 grid-cols-1 gap-1 mb-20'}>

            {
              smallTasks.map((note, index) => (
                <TaskNote key={note.id} taskNote={note} onClicked={onClicked} showCallToAction={showCallToAction}/>
              ))
            }
          </div>}
    </>
  )
}
