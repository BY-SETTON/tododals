import {TaskNoteInterface} from "@/app/todays-tasks/TodaysTasks";
import TaskNote from "@/components/TaskNote/TaskNote";
import {PopDirection} from "@/components/TaskNote/enums/Popdirection";

interface TaskNotCollectionProp {
  taskNotes: TaskNoteInterface[]
}

export default function TaskNoteCollection({taskNotes}: TaskNotCollectionProp) {

  const getPopDirection = (index: number) => {
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

  const orderTasks = () => {
    return taskNotes.sort((task) => (task.size))
  }

  return (
    <div className={'grid grid-cols-3'}>
      {
        orderTasks().map((note, index) => (
          <TaskNote key={note.id} taskNote={note} popDirection={getPopDirection(index)} className={"m-4"}/>
        ))
      }
    </div>
  )
}
