import {kv} from "@vercel/kv";

export default async function EditTaskPage({params}: {
  params: {
    id: string
  }
}) {
  const cart = await kv.get<{
    id: string;
    quantity: number
  }[]>(params.id);

  return <div>Edit Task {params.id}</div>
}
