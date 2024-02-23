import {kv} from "@vercel/kv";

export default async function TaskPage({params}: {
  params: {
    id: string
  }
}) {
  const cart = await kv.get<{
    id: string;
    quantity: number
  }[]>(params.id);

  return <div>Task {params.id}</div>
}
