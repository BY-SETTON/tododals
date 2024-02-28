import TodaysTasks from "@/app/(authenticated)/todays-tasks/TodaysTasks";
import {getAllUnDoneTask} from "@/app/(authenticated)/actions";
import {TaskNoteInterface} from "@/app/(authenticated)/todays-tasks/(interfaces)/task";
import useSessionStorage from "@/hooks/useSessionStorage";
import {getCookie} from "@/serverFunctions/cookies";

export default async function Home() {
  const usernamev2 = await getCookie('username');
  console.log(usernamev2);
  const data = await getAllUnDoneTask();
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
  return (<TodaysTasks tasks={taskNotes}/>);
}
