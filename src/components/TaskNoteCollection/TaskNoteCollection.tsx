import TaskNote, {TaskNoteButtonInterface} from "@/components/TaskNote/TaskNote";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import {TaskSize} from "@/components/TodaysTasks/(enum)/task";

interface TaskNotCollectionProp {
  taskNotes: TaskNoteInterface[];
  onClicked: (taskId: string) => void;
  className?: string;
  primaryButton?: TaskNoteButtonInterface;
  secondaryButton?: TaskNoteButtonInterface;
}

export default function TaskNoteCollection({
                                             taskNotes,
                                             onClicked,
                                             className,
                                             primaryButton,
                                             secondaryButton,
                                           }: TaskNotCollectionProp) {
  const largeTasks = taskNotes.filter((task) => (task.size == TaskSize.LARGE))
  const mediumTasks = taskNotes.filter((task) => (task.size == TaskSize.MEDIUM))
  const smallTasks = taskNotes.filter((task) => (task.size == TaskSize.SMALL))
  return (
    <>
      {!!largeTasks.length &&
        <div
          className={`grid lg:grid-cols-3 lg:gap-6 sm:grid-cols-2 sm:gap-2 grid-cols-1 gap-1 mb-4 sm:mb-20 ${className}`}>
          {
            largeTasks.map((note, index) => (
              <TaskNote key={note.id} taskNote={note} onClicked={onClicked} primaryButton={primaryButton}
                        secondaryButton={secondaryButton}/>
            ))
          }
        </div>}
      {!!mediumTasks.length &&
        <div className={'grid lg:grid-cols-3 lg:gap-6 sm:grid-cols-2 sm:gap-2 grid-cols-1 gap-1 mb-4 sm:mb-20'}>

          {
            mediumTasks.map((note, index) => (
              <TaskNote key={note.id} taskNote={note} onClicked={onClicked} primaryButton={primaryButton}
                        secondaryButton={secondaryButton}/>
            ))
          }
        </div>}
      {!!smallTasks.length &&
        <div className={'grid lg:grid-cols-3 lg:gap-6 sm:grid-cols-2 sm:gap-2 grid-cols-1 gap-1 mb-4 sm:mb-20'}>

          {
            smallTasks.map((note, index) => (
              <TaskNote key={note.id} taskNote={note} onClicked={onClicked} primaryButton={primaryButton}
                        secondaryButton={secondaryButton}/>
            ))
          }
        </div>}
    </>
  )
}
