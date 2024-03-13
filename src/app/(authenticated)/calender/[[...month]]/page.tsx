import React from "react";
import {getMonthTasksByPersonId} from "@/app/(authenticated)/actions";
import Calender from "@/app/(authenticated)/calender/(components)/Calender";
import CalenderNav from "@/app/(authenticated)/calender/(components)/CalenderNav";

export default async function CalenderMonthPage({params}: {
  params: {
    month: string,
  }
}) {
  let month = (new Date().getMonth()) + 1;
  const paramMonth = Number(params.month)
  if (paramMonth && (!(paramMonth < 1) && !(paramMonth > 12))) {
    month = paramMonth
  }
  const calenderTaskData = await getMonthTasksByPersonId(month);

  return (
    <>
      <CalenderNav currentMonth={month}/>
      <Calender tasks={calenderTaskData.response.rows} month={month}/>
    </>
  );
}
