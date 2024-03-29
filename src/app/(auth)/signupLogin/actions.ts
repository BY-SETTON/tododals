"use server"

import {z} from 'zod'

import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {createCookie} from "@/serverFunctions/cookies";

const schemaLogin = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function login(prevState: ResponseInterface, formData: FormData): Promise<ResponseInterface> {

  const rawFormData = {
    username: formData.get('login-username') as string,
    password: formData.get('login-password') as string,
  }
  const validatedFields = schemaLogin.safeParse(rawFormData)
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
  await createCookie({name: 'person_id', value: resp.rows[0].person_id})

  return {message: 'Success', type: ResponseTypes.SUCCESS};
}

const schemaSignup = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function signup(prevState: ResponseInterface, formData: FormData): Promise<ResponseInterface> {
  const rawFormData = {
    username: formData.get('signup-username') as string,
    password: formData.get('signup-password') as string,
  }
  const validatedFields = schemaSignup.safeParse({
    username: formData.get('signup-username') as string,
    password: formData.get('signup-password') as string,
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
        VALUES (${rawFormData.username}, ${rawFormData.password}) RETURNING person_id;`
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }

  await createCookie({name: 'username', value: rawFormData.username})
  await createCookie({name: 'person_id', value: resp.rows[0].person_id})

  return {message: 'Success', type: ResponseTypes.SUCCESS, response: {username: rawFormData.username}};
}
