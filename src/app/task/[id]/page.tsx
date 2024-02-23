import {sql} from "@vercel/postgres";

export default async function TaskPage({params}: {
  params: {
    id: string
  }
}) {

  async function getTask() {
    'use server'
    const {rows} =
      await sql`SELECT *
                FROM tasks
                WHERE id = '1'`;
    return rows[0]
  }

  const data = await getTask();

  return <>
    <div>Task id - {data.id}</div>
    <div>title id - {data.title}</div>
    <div>description id - {data.description}</div>
    <div>Task icon - {data.icon}</div>
  </>
}
