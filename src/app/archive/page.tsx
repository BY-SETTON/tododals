import ArchiveTasks from "@/app/archive/ArchivedTasks";
import {getAllDoneTask} from "@/app/actions";
import {TaskNoteInterface} from "@/app/todays-tasks/(interfaces)/task";

export default async function Archive() {
  const data = await getAllDoneTask();
  const taskNotes: TaskNoteInterface[] = data?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      title: item.title,
      description: item.description,
      icon: item.icon,
      size: item.size,
      dueDate: item.duedate,
    }
  }) || []
  return (<ArchiveTasks tasks={taskNotes}/>);
}
