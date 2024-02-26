import {sql} from "@vercel/postgres";

export async function getAllTask() {
  'use server'
  const {rows} =
    await sql`SELECT *
              FROM Tasksv3`;
  return rows
}
