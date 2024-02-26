"use server"

import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/new/(enums)/(enums)";
import {ResponseInterface} from "@/app/new/(interfaces)/interface";
import {revalidatePath} from "next/cache";

async function createTodo(prevState: ResponseInterface, formData: FormData): Promise<ResponseInterface> {

  const rawFormData = {
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    size: formData.get('size') as string,
    icon: formData.get('icon') as string
  }

  let resp;

  try {
    resp = await sql`INSERT INTO TasksV3 (Personid, Name, Title, Description, Icon, Size)
                     VALUES ('123', ${rawFormData.name}, ${rawFormData.title}, ${rawFormData.description},
                             ${rawFormData.icon}, ${rawFormData.size})`;
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  revalidatePath('/');

  return {message: 'Success', type: ResponseTypes.SUCCESS};
}

export default createTodo;
