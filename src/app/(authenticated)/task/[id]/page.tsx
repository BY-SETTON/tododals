const feather = require('feather-icons');

import {getFootnotes, getTask} from "@/app/(authenticated)/task/actions";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import FootnoteForm from "@/app/(authenticated)/task/(components)/FootnoteForm";
import convertMarkDownToHTML from "@/utils/markDown";
import React from "react";
import {FootnoteInterface} from "@/app/(authenticated)/task/(components)/Footnote";
import FootnoteList from "@/app/(authenticated)/task/(components)/FootnoteList";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";

export default async function TaskPage({params}: {
  params: {
    id: string
  }
}) {

  const taskData = await getTask(params.id);
  const footnoteData: ResponseInterface = await getFootnotes(params.id);
  const footnotes = footnoteData.response.map((footnote: any): FootnoteInterface | undefined => {
    if (!footnote?.footnote) {
      return undefined;
    }
    return {body: footnote.footnote, id: footnote.id}
  })
  const taskNote: TaskNoteInterface = {
    id: taskData.id,
    name: taskData.name,
    title: taskData.title,
    description: taskData.description,
    size: taskData.size,
    dueDate: taskData.date,
    icon: taskData.icon,
  }

  const svgIcon = taskNote?.icon && feather.icons[taskNote.icon].toSvg({color: 'black', width: 30, height: 30});

  return <>
    <div className={"bg-gray-100 p-4"}>
      <div className={"flex mb-8"}>
        <img src={`data:image/svg+xml;utf8,${svgIcon}`} alt="" className={"w-16 h-16 mr-4"}/>
        <h1 className="text-4xl font-bold flex items-center">{taskNote.title}</h1>
      </div>
      <h2 className="">{taskNote.description}</h2>
    </div>
    <h3 className="mb-4 font-bold text-sl">Footnote:</h3>
    {footnotes && <div className="mb-4">
      <FootnoteList footnotes={footnotes}/>
    </div>}
    <FootnoteForm taskId={params.id}></FootnoteForm>
  </>
}
