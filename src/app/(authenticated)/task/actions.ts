'use server'
import {sql} from "@vercel/postgres";

export async function getTask(id: string) {
  const {rows} =
    await sql`SELECT *
              FROM tasksV3
              WHERE id = ${id}`;
  return rows[0]
}
