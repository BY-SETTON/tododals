"use server"

import {z} from 'zod'

import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {createCookie} from "@/serverFunctions/cookies";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function login(prevState: ResponseInterface, formData: FormData): Promise<ResponseInterface> {

  const rawFormData = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  }
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
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  if (resp.rows.length === 0) {
    return {message: 'username or password is incorrect', type: ResponseTypes.ERROR};
  }
  await createCookie({name: 'username', value: rawFormData.username})

  return {message: 'Success', type: ResponseTypes.SUCCESS, response: {username: rawFormData.username}};
}
