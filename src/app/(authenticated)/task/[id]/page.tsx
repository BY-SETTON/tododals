import {getFootnotes, getTask} from "@/app/(authenticated)/task/actions";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import FootnoteForm from "@/app/(authenticated)/task/(components)/FootnoteForm";
import convertMarkDownToHTML from "@/utils/markDown";
import React from "react";

export default async function TaskPage({params}: {
  params: {
    id: string
  }
}) {

  const taskData = await getTask(params.id);
  const footnoteData: ResponseInterface = await getFootnotes(params.id);

  const getFootnote = (footnote: string) => {
    return convertMarkDownToHTML(footnote)
  }

  return <>
    <h1 className="mb-4 text-3xl font-bold">{taskData.title}</h1>
    <h2 className="mb-8">{taskData.description}</h2>
    <h3 className="mb-4 font-bold text-sl">Footnote:</h3>
    <div className="mb-4">
      {footnoteData.response.map((row: any) => {
        return row && <div key={row.id} className="mb-6">
          {'>'}<div className="text-container" dangerouslySetInnerHTML={{__html: getFootnote(row.footnote)}}/></div>
      })}
    </div>
    <FootnoteForm taskId={params.id}></FootnoteForm>
  </>
}
