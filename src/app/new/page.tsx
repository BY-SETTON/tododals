"use client"
import NewTaskForm from "@/app/new/(NewTaskForm)/NewTaskForm";
import {useRouter} from "next/navigation";

export default function NewTaskPage() {
  const router = useRouter();
  const onSubmitted = () => {

    router.push('/')
  }

  return (<NewTaskForm onSubmitted={onSubmitted}/>)
}
