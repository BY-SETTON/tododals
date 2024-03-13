import React from "react";
import {getMonthTasksByPersonId} from "@/app/(authenticated)/actions";
import Calender from "@/app/(authenticated)/calender/(components)/Calender";

export default async function CalenderMonthPage({params}: {
  params: {
    month: number,
  }
}) {
  const calenderTaskData = await getMonthTasksByPersonId(params.month);
  return (<Calender tasks={calenderTaskData.response.rows} month={params.month}/>);
}
