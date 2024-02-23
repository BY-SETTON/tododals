import {kv} from "@vercel/kv";
import {sql} from "@vercel/postgres";

async function editTask() {
  const {rows} = await sql`INSERT INTO tasks (id, Personid, Title, Description, Icon)
                           VALUES ('1', '123', 'title-test', 'description-test', 'icon-test')`;
  return rows;

}

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
