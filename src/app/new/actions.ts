"use server"

import {sql} from "@vercel/postgres";

export async function createTodo(prevState: any, formData: FormData): Promise<any> {

  const rawFormData = {
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    size: formData.get('size') as string,
    icon: formData.get('icon') as string
  }

  const resp = await sql`INSERT INTO TasksV3 (Personid, Name, Title, Description, Icon, Size)
                         VALUES ('123', ${rawFormData.name}, ${rawFormData.title}, ${rawFormData.description},
                                 ${rawFormData.icon}, ${rawFormData.size})`;
  return resp;
}
