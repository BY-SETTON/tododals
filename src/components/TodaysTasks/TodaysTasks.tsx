"use client"

import TaskNoteCollection from "@/components/TaskNoteCollection/TaskNoteCollection";
import {useRouter} from "next/navigation";

interface Props {
  tasks: any
}

export default function TodaysTasks({tasks}: Props) {
  const router = useRouter();
  const onClicked = (taskId: string) => {
    router.push(`/task/${taskId}`)
  }

  return <TaskNoteCollection taskNotes={tasks} onClicked={onClicked}/>
}
