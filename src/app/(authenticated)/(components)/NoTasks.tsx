"use client"

import Image from "next/image";
import AllDone from "../../../../public/all_done.svg";
import TaskNote from "@/components/TaskNote/TaskNote";
import {TaskSize} from "@/components/TodaysTasks/(enum)/task";
import {useRouter} from "next/navigation";

export default function NoTasks() {
  const router = useRouter();

  const addTask = {
    id: 'addTask',
    name: 'New task',
    title: 'Click here to add a task',
    description: "Click here to create your new task",
    size: TaskSize.SMALL,
    dueDate: new Date(),
    icon: 'plus-circle',
  }

  const onClick = () => {
    router.push('/new');
  }

  return <div
    className="flex sm:flex-row flex-col-reverse w-full h-full justify-center items-center grid-cols-2 gap-2 mt-12 px-12">
    <Image src={AllDone} alt={"all done"} width={300} height={300} className={"sm:w-[50%] sm:mb-0 mb-12"}/>
    <div className={"flex flex-col items-center sm:w-[50%]"}>
      <div className={"w-full max-w-xl"}>
        <TaskNote taskNote={addTask} onClicked={onClick}/>
      </div>
    </div>
  </div>
}
