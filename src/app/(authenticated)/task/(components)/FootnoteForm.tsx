"use client"

import {useFormState} from "react-dom";
import {addFootnote} from "@/app/(authenticated)/task/actions";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";

const initialState: ResponseInterface = {
  message: '',
  type: ResponseTypes.ERROR,
}

interface Prop {
  taskId: string,
}

export default function FootnoteForm({taskId}: Prop) {
  const [state, formAction] = useFormState(addFootnote, initialState);

  return <form action={formAction}
               className="max-w-xl w-full transition flex flex-row">
    <div className="flex flex-row justify-center">
      <button type="submit" className="bg-blue-300 hover:bg-blue-400 rounded-full p-4 mr-4">ADD</button>
    </div>
    <label htmlFor="footnote" className="sr-only">Add footnote</label>
    <textarea
      className="rounded-lg border-gray-200 p-3 text-sm w-full bg-blue-100"
      placeholder="footnote"
      id="footnote"
      name="footnote"
    />
    <input id="taskId" name="taskId" type="hidden" value={taskId}></input>

  </form>
}
