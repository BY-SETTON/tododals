import Calender from "@/app/(authenticated)/calender/(components)/Calender";
import {getAllDoneTaskByPersonId} from "@/app/(authenticated)/actions";

export default async function CalenderPage() {
  const calenderTaskData = await getAllDoneTaskByPersonId();
  return (<Calender tasks={calenderTaskData.response.rows}/>);
}
