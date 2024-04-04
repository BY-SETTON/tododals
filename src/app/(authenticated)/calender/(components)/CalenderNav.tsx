"use client"
import React from "react";
import {useRouter} from "next/navigation";
import dayjs from "dayjs";

interface Props {
  currentMonth: number,
}

export default function CalenderNav({currentMonth}: Props) {
  const router = useRouter();
  let monthName = dayjs().month(Number(currentMonth - 1)).format('MMMM');

  const handlePrevMonth = () => {
    router.push(`/calender/${Number(currentMonth) - 1}`);
  }
  const handleNextMonth = () => {
    router.push(`/calender/${Number(currentMonth) + 1}`);
  }
  return <>

    <div className={"flex w-full sm:max-w-64 justify-between sm:mx-auto mb-4 text-neutral-600"}>
      {currentMonth > 1 ?
        <button onClick={handlePrevMonth} className={"bg-neutral-200 hover:bg-neutral-300 rounded px-6 h-8"}>{"<"}</button> : <div></div>}
      <div className={"bg-neutral-200 flex items-center justify-center rounded w-full mx-2 h-8"}>{monthName}</div>
      {currentMonth < 12 ?
        <button onClick={handleNextMonth} className={"bg-neutral-200 hover:bg-neutral-300 rounded px-6 h-8"}>{">"}</button> : <div></div>}
    </div>
  </>
}
