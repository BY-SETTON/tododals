import {getTaskById} from "@/app/(authenticated)/actions";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import EditTaskLayout from "@/app/(authenticated)/edit/(components)/EditTaskLayout";

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
  return <EditTaskLayout task={taskMapped}></EditTaskLayout>
}
