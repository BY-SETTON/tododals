"use server"

import {z} from 'zod'

import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/new/(enums)/(enums)";
import {ResponseInterface} from "@/app/new/(interfaces)/interface";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function login(prevState: ResponseInterface, formData: FormData): Promise<ResponseInterface> {

  const rawFormData = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  }
  console.log(rawFormData);
  const validatedFields = schema.safeParse(rawFormData)
  if (!validatedFields.success) {
    return {error: validatedFields.error.format(), type: ResponseTypes.ERROR};
  }

  let resp;

  try {
    resp = await sql`SELECT person_id
                     FROM auth
                     WHERE username = ${rawFormData.username}
                       AND password = ${rawFormData.password}`;
  } catch (error) {
    console.log(error);
  }
  console.log(resp);
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  if (resp.rows.length === 0) {
    console.log('>>>>>>>>>>');
    return {message: 'username or password is incorrect', type: ResponseTypes.ERROR};
  }

  return {message: 'Success', type: ResponseTypes.SUCCESS};
}
