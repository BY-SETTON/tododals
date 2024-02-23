import {TaskNoteInterface} from "@/app/todays-tasks/TodaysTasks";
import TaskNote from "@/components/TaskNote/TaskNote";

interface TaskNotCollectionProp {
  taskNotes: TaskNoteInterface[]
}

export default function TaskNoteCollection({taskNotes}: TaskNotCollectionProp) {
  return (
    <div className={'grid grid-cols-3 '}>
      {
        taskNotes.map((note) => (

          <TaskNote key={note.id} taskNote={note}/>
        ))
      }
    </div>
  )
}
