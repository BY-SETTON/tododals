"use server"

import {z} from 'zod'
import {ResponseTypes} from "@/app/new/(enums)/(enums)";
import {ResponseInterface} from "@/app/new/(interfaces)/interface";
import {sql} from "@vercel/postgres";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function signup(prevState: ResponseInterface, formData: FormData): Promise<ResponseInterface> {

  const rawFormData = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  }
  const validatedFields = schema.safeParse({
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  })
  if (!validatedFields.success) {
    return {error: validatedFields.error.format(), type: ResponseTypes.ERROR};
  }

  let resp;

  try {
    resp = await sql`SELECT person_id
                     FROM auth
                     WHERE username = ${rawFormData.username}`
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  if (resp.rows.length != 0 && resp.rows[0].person_id) {
    return {message: 'User already exists', type: ResponseTypes.ERROR};
  }

  try {
    resp = await sql`
        INSERT INTO auth(username, password)
        VALUES (${rawFormData.username}, ${rawFormData.password});`
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }

  return {message: 'Success', type: ResponseTypes.SUCCESS};
}
