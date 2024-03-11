"use server"

import {sql} from "@vercel/postgres";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {getCookie} from "@/serverFunctions/cookies";

export async function getDaysTasks(date: string): Promise<ResponseInterface> {
  const personId = (await getCookie('person_id')).value;

  let resp;

  try {
    resp = await sql`SELECT *
                     FROM tasksV3
                     WHERE CAST(Duedate AS DATE) = ${date}
                       AND Personid = ${personId}`;
  } catch (error) {
    console.log(error);
  }
  if (!resp) {
    return {message: 'error', type: ResponseTypes.ERROR};
  }
  return {message: 'Success', type: ResponseTypes.SUCCESS, response: resp};
}

