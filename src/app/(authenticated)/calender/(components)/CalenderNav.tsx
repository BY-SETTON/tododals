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

    <div className={"flex w-full max-w-64 justify-between  mx-auto"}>
      {currentMonth > 1 ? <button onClick={handlePrevMonth}>{"<"}</button> : <div></div>}
      <div>{monthName}</div>
      {currentMonth < 12? <button onClick={handleNextMonth}>{">"}</button> : <div></div>}
    </div>
  </>
}
