'use server'

import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/new/(enums)/(enums)";
import {revalidatePath} from "next/cache";

export async function getAllTask() {
  let rows;
  try {
    rows =
      (await sql`SELECT *
                 FROM Tasksv3`).rows;
  } catch (error) {
    console.log(error);
  }
  return rows
}

export async function getAllUnDoneTask() {
  let rows;
  try {
    rows =
      (await sql`SELECT *
                 FROM Tasksv3
                 WHERE done = FALSE`).rows;
  } catch (error) {
    console.log(error);
  }

  return rows;
}

export async function getAllDoneTask() {
  let rows;
  try {
    rows =
      (await sql`SELECT *
                 FROM Tasksv3
                 WHERE done = TRUE`).rows;
  } catch (error) {
    console.log(error);
  }

  return rows;
}

export async function markAsDone(id: string): Promise<any> {
  let resp;
  try {
    resp = await sql`UPDATE tasksV3
                     SET done = TRUE,
                         WHERE id = ${id};`;
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  revalidatePath('/');
  revalidatePath('/tasks');

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

