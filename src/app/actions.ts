'use server'

import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/new/(enums)/(enums)";
import {revalidatePath} from "next/cache";

export async function getAllTask() {
  const {rows} =
    await sql`SELECT *
              FROM Tasksv3`;
  return rows
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

