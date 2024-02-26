"use client"

import SearchIconFolder from "@/components/SearchIcon/SearchIconFolder";
import {useState} from "react";
import {useFormState} from "react-dom";
import {createTodo} from "@/app/new/actions";
import {TaskSize} from "@/app/todays-tasks/(enum)/task";

const initialState = {
  message: null
}

export default function NewTaskForm() {

  const [state, formAction] = useFormState(createTodo, initialState);

  const [selectedSize, setSelectedSize] = useState(TaskSize.SMALL);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [showBox, setShowBoxBox] = useState(false);

  const onSelectIcon = (event: any) => {
    event.preventDefault()
    setShowBoxBox(!showBox);
  }
  const onSizeClick = (index: number) => {
    setSelectedSize(index);
  }

  const onIconSelect = (icon: string) => {
    setSelectedIcon(icon);
  }

  return (
    <div className="flex justify-center w-full">
      <form action={formAction}
            className="space-y-4 max-w-2xl w-full bg-green-300 p-10 rounded-lg shadow-lg transition">
        <div>
          <label className="sr-only" htmlFor="name">Task name</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Grocery"
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="title">Task title</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Pnp Shop"
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="description">Description</label>
          <textarea
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Buy stuff for three meals. Do it before 5pm today"
            id="description"
            name="description"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <div>
            <label
              htmlFor="Option1"
              className={`${selectedSize === 0 && 'bg-yellow-300'} block w-full cursor-pointer rounded-lg border p-3 text-white font-bold`}
              tabIndex={0}
              onClick={() => {
                onSizeClick(0);
              }}
            >
              <input className="sr-only" id="small" type="radio" tabIndex={-1} name="option"/>

              <span className="text-sm">Small</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="Option2"
              className={`${selectedSize === 1 && 'bg-orange-500'} block w-full cursor-pointer rounded-lg border p-3  text-white font-bold`}
              tabIndex={0}
              onClick={() => {
                onSizeClick(1);
              }}
            >
              <input className="sr-only" id="medium" type="radio" tabIndex={-1} name="option"/>

              <span className="text-sm">Medium</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="Option3"
              className={`${selectedSize === 2 && 'bg-red-700'} block w-full cursor-pointer rounded-lg border border-gray-200 p-3  text-white font-bold`}
              tabIndex={0}
              onClick={() => {
                onSizeClick(2);
              }}
            >
              <input className="sr-only" id="large" type="radio" tabIndex={-1} name="option"/>

              <span className="text-sm">Large</span>
            </label>
          </div>
        </div>

        <label className="sr-only" htmlFor="search">Description</label>
        {showBox && <SearchIconFolder onSelected={onIconSelect}/>}
        <button className="h-14 hover:bg-green-800 text-white rounded max-w-40 w-full bg-green-900"
                onClick={onSelectIcon}>{showBox ? 'Cancel' : 'Select Icon'}
        </button>
        <input id="size" name="size" type="hidden" value={selectedSize}></input>
        <input id="icon" name="icon" type="hidden" value={selectedIcon}></input>

        <div className="mt-4">
          <button
            type="submit"
            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
          >
            Send Enquiry
          </button>
        </div>
      </form>
      <p>
        {state.message}
      </p>
    </div>);
}
