import TaskNoteCollection from "@/components/TaskNoteCollection/TaskNoteCollection";
import {getAllTask} from "@/app/actions";
import {TaskNoteInterface} from "@/app/todays-tasks/(interfaces)/task";

export default async function TodaysTasks() {
  const data = await getAllTask();
  const taskNotes: TaskNoteInterface[] = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      title: item.title,
      description: item.description,
      icon: item.icon,
      size: item.size,
    }
  })

  return <TaskNoteCollection taskNotes={taskNotes}/>
}
