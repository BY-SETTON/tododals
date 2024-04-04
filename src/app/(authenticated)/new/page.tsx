import NewTaskForm from "@/app/(authenticated)/new/(NewTaskForm)/NewTaskForm";

export default function NewTaskPage({params}: any) {
  console.log(params);
  return (<NewTaskForm date={params.date}/>)
}
