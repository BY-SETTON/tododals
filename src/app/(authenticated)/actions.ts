'use server'

import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {getCookie} from "@/serverFunctions/cookies";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";

export async function getAllTaskByPersonId(): Promise<ResponseInterface> {
  const personId = (await getCookie('person_id')).value;

  let resp;
  try {
    resp =
      (await sql`SELECT *
                 FROM Tasksv3
                 WHERE PersonId = ${personId}`);
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  return {message: 'Success', type: ResponseTypes.SUCCESS, response: resp};
}

export async function getAllUnDoneTask(personId: string) {
  let rows;
  try {
    rows =
      (await sql`SELECT *
                 FROM Tasksv3
                 WHERE done = FALSE
                   AND personid = ${personId}`).rows;
  } catch (error) {
    console.log(error);
  }

  return rows;
}

export async function getAllDoneTask(personId: string) {
  let rows;
  try {
    rows =
      (await sql`SELECT *
                 FROM Tasksv3
                 WHERE done = TRUE
                   AND personid = ${personId}`).rows;
  } catch (error) {
    console.log(error);
  }

  return rows;
}

export async function getTaskById(taskId: string) {
  let rows;
  try {
    rows =
      (await sql`SELECT *
                 FROM Tasksv3
                 WHERE id = ${taskId}`).rows;
  } catch (error) {
    console.log(error);
  }

  return rows?.[0];
}

export async function markAsDone(id: string): Promise<any> {
  let resp;
  try {
    resp = await sql`UPDATE tasksV3
                     SET done = TRUE
                     WHERE id = ${id};`;
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  revalidatePath('/');
  revalidatePath('/archive');

  return {message: 'Success', type: ResponseTypes.SUCCESS};
}

export async function markAsUnDone(id: string): Promise<any> {
  let resp;
  try {
    resp = await sql`UPDATE tasksV3
                     SET done = FALSE
                     WHERE id = ${id};`;
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  revalidatePath('/');
  revalidatePath('/archive');

  return {message: 'Success', type: ResponseTypes.SUCCESS};
}

export async function deleteTodo(id: string): Promise<any> {
  let resp;
  try {
    resp = await sql`DELETE
                     FROM TasksV3
                     WHERE id = ${id}`;
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  revalidatePath('/');

  return {message: 'Success', type: ResponseTypes.SUCCESS};
}

export async function logout() {
  cookies().delete('username')
  redirect('/login')
}
