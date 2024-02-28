import EditTaskForm from "@/app/(authenticated)/edit/(components)/EditForm";
import {getTaskById} from "@/app/(authenticated)/actions";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";

export default async function EditTaskPage({params}: {
  params: {
    id: string
  }
}) {

  const task = await getTaskById(params.id);
  const taskMapped: TaskNoteInterface = {
    id: task?.id,
    dueDate: task?.duedate,
    name: task?.name,
    title: task?.title,
    description: task?.description,
    size: task?.size,
    icon: task?.icon,
  }
  return <EditTaskForm task={taskMapped}/>
}
