import TodaysTasks from "@/app/(authenticated)/todays-tasks/TodaysTasks";
import {getAllUnDoneTask} from "@/app/(authenticated)/actions";
import {TaskNoteInterface} from "@/app/(authenticated)/todays-tasks/(interfaces)/task";
import {getCookie} from "@/serverFunctions/cookies";
import {redirect} from "next/navigation"

export default async function Home() {
  const username = await getCookie('username');
  console.log(username);

  const isLoggedIn = !!username;
  if (!isLoggedIn) {
    redirect('/login');
  }

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
