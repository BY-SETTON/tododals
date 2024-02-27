"use server"

import {z} from 'zod'

import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/new/(enums)/(enums)";
import {ResponseInterface} from "@/app/new/(interfaces)/interface";
import {revalidatePath} from "next/cache";

const schema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export async function createTodo(prevState: ResponseInterface, formData: FormData): Promise<ResponseInterface> {
  const validatedFields = schema.safeParse({
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
    icon: formData.get('icon') as string
  }

  let resp;

  try {
    resp = await sql`INSERT INTO TasksV3 (Personid, Name, Title, Description, Icon, Size, DueDate)
                     VALUES ('123', ${rawFormData.name}, ${rawFormData.title}, ${rawFormData.description},
                             ${rawFormData.icon}, ${rawFormData.size}, ${rawFormData.date})`;
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  revalidatePath('/');

  return {message: 'Success', type: ResponseTypes.SUCCESS};
}