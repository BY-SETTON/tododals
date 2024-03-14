import TodaysTasks from "@/components/TodaysTasks/TodaysTasks";
import {getAllUnDoneTask} from "@/app/(authenticated)/actions";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import {getCookie} from "@/serverFunctions/cookies";
import {redirect} from "next/navigation"
import NoTasks from "@/app/(authenticated)/(components)/NoTasks";

export default async function Home() {
  const username = await getCookie('username');
  const personId = await getCookie('person_id');
  const isLoggedIn = !!username && !!personId;
  if (!isLoggedIn) {
    redirect('/login');
  }
  const data = await getAllUnDoneTask(personId.value);
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
  return (
    <>
      {!!taskNotes.length ?
        <TodaysTasks tasks={taskNotes}/>
        :
        <NoTasks/>
      }
    </>
  );
}
