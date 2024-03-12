"use server"

import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {revalidatePath} from "next/cache";
import {taskFormSchema} from "@/utils/taskFormScheme";

export async function editTodo(prevState: ResponseInterface, formData: FormData): Promise<ResponseInterface> {
  const validatedFields = taskFormSchema.safeParse({
    name: formData.get('name'),
    title: formData.get('title'),
    description: formData.get('description'),
    size: formData.get('size'),
    date: formData.get('date'),
    icon: formData.get('icon')
  })
  if (!validatedFields.success) {
    return {error: validatedFields.error.format(), type: ResponseTypes.ERROR};
  }

  const rawFormData = {
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    size: formData.get('size') as string,
    date: formData.get('date') as string,
    icon: formData.get('icon') as string,
    taskId: formData.get('taskId') as string
  }

  let resp;

  try {
    resp = await sql`UPDATE TasksV3
                     SET Name        = ${rawFormData.name},
                         Title       = ${rawFormData.title},
                         Description = ${rawFormData.description},
                         Icon        = ${rawFormData.icon},
                         Size        = ${rawFormData.size},
                         DueDate     = ${rawFormData.date}
                     WHERE id = ${rawFormData.taskId}`;
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  revalidatePath('/');
  revalidatePath(`/edit/${rawFormData.taskId}`);

  return {message: 'Success', type: ResponseTypes.SUCCESS};
}
