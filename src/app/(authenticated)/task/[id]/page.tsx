import {getTask} from "@/app/(authenticated)/task/actions";

export default async function TaskPage({params}: {
  params: {
    id: string
  }
}) {

  const data = await getTask(params.id);

  return <>
    <div>Task id - {data.id}</div>
    <div>title id - {data.title}</div>
    <div>description id - {data.description}</div>
    <div>Task icon - {data.icon}</div>
  </>
}
