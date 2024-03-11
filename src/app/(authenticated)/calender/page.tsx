import Calender from "@/app/(authenticated)/calender/(components)/Calender";
import {getAllTaskByPersonId} from "@/app/(authenticated)/actions";

export default async function CalenderPage() {
  const calenderTaskData = await getAllTaskByPersonId();
  return (<Calender tasks={calenderTaskData.response.rows}/>);
}
