'use server'
import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import {revalidatePath} from "next/cache";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";

export async function getTask(id: string) {
  const {rows} =
    await sql`SELECT *
              FROM tasksV3
              WHERE id = ${id}`;
  return rows[0]
}

export async function getFootnotes(taskId: string) {
  let resp;

  try {
    resp = await sql`SELECT *
                     FROM task_footnotes
                     WHERE task_id = ${taskId}`;
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  revalidatePath('/');
  revalidatePath(`/edit/${taskId}`);

  return {message: 'Success', type: ResponseTypes.SUCCESS, response: resp.rows};
}

export async function addFootnote(prevState: ResponseInterface, formData: FormData): Promise<ResponseInterface> {

  const rawFormData = {
    footnote: formData.get('footnote') as string,
    taskId: formData.get('taskId') as string,
  }

  let resp;

  try {
    resp = await sql`INSERT INTO task_footnotes (Footnote, Task_id)
                     VALUES (${rawFormData.footnote}, ${rawFormData.taskId})`;
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  revalidatePath('/task/[id]');

  return {message: 'Success', type: ResponseTypes.SUCCESS};
}
