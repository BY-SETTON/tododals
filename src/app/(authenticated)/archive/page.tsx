import ArchiveTasks from "@/app/(authenticated)/archive/ArchivedTasks";
import {getAllDoneTask} from "@/app/(authenticated)/actions";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import {getCookie} from "@/serverFunctions/cookies";

export default async function Archive() {
  const personId = (await getCookie('person_id')).value;
  const data = await getAllDoneTask(personId);
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
