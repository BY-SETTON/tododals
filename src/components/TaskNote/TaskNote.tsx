'use client';

import {TaskNoteInterface} from "@/app/todays-tasks/TodaysTasks";
import {PopDirection} from "@/components/TaskNote/enums/Popdirection";
import TaskNoteButton from "@/components/TaskNote/TaskNoteButton/TaskNoteButton";
import {useRouter} from "next/navigation";

interface TaskNotProp {
  taskNote: TaskNoteInterface
  popDirection: PopDirection
  className?: string,
}

function TaskNote({taskNote, popDirection = PopDirection.LEFT, className}: TaskNotProp) {
  const router = useRouter();
  const transformDirection = (): string => {
    let direction = 'group-hover:-translate-x-4 group-hover:-translate-y-4'
    switch (popDirection) {
      case PopDirection.DOWN:
        return 'group-hover:-translate-x-4';
      case PopDirection.UP:
        return 'group-hover:-translate-y-4';
      case PopDirection.RIGHT:
        return 'group-hover:translate-x-2 group-hover:-translate-y-2'
      case PopDirection.LEFT:
        return 'group-hover:-translate-x-2 group-hover:-translate-y-2'
      default:
    }
    return direction;
  }

  const onDelete = (event) => {
    event.stopPropagation();
    console.log('----------DELETE');
  }

  const onEdit = (event) => {
    event.stopPropagation();

    console.log('----------EDIT');
  }

  return (
    <a onClick={() => {
      router.push(`/task/${taskNote.id}`)
    }}
       className={`hover:cursor-pointer group relative block h-64 sm:h-80 lg:h-96 ${className}`}>
      <span className="absolute inset-0 border-2 border-dashed border-black"></span>

      <div
        className={`relative flex h-full transform flex-col justify-between border-2 border-black bg-white transition-transform ${transformDirection()}`}
      >
        <div className="flex w-full justify-end pr-4 pt-4 invisible group-hover:visible">
          <TaskNoteButton
            hoverColor="bg-red-400"
            onClick={onDelete}>Done</TaskNoteButton>
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <div
              className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-10 sm:size-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <h2 className="mt-4 text-xl font-medium sm:text-2xl">{taskNote.header}
              </h2>
            </div>

            <div
              className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"
            >
              <h3 className="mt-4 text-xl font-medium sm:text-2xl">{taskNote.title || taskNote.header}</h3>
              <p className="mt-4 text-sm sm:text-base">{taskNote.description}</p>
            </div>
          </div>
          <div className="mt-auto mb-auto mr-4 invisible group-hover:visible">
            <TaskNoteButton
              hoverColor="bg-blue-400"
              onClick={onEdit}>EDIT</TaskNoteButton>
          </div>
        </div>
      </div>

    </a>)
}

export default TaskNote;
