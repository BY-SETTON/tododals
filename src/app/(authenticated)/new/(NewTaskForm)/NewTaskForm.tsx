"use client"

import SearchIconFolder from "@/components/SearchIcon/SearchIconFolder";
import {useEffect, useState} from "react";
import {useFormState, useFormStatus} from "react-dom";
import {TaskSize} from "@/components/TodaysTasks/(enum)/task";
import {createTodo} from "@/app/(authenticated)/new/actions";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import Datepicker from "react-tailwindcss-datepicker";
import {useRouter} from "next/navigation";

const initialState: ResponseInterface = {
  message: '',
  type: ResponseTypes.DONE,
}

export default function NewTaskForm() {
  const router = useRouter();
  const onSubmitted = () => {
    router.push('/')
  }
  const [value, setValue] = useState<any>({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  }

  const [state, formAction] = useFormState(createTodo, initialState);
  const {pending} = useFormStatus()

  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  useEffect(() => {
    if (!state.type) {
      return;
    }

    if (state.type && state.type === ResponseTypes.SUCCESS) {
      onSubmitted();
    }
    setIsLoading(false);
  }, [state])

  const submit = () => {
    setIsLoading(true);
  }

  return (
    <div className="flex justify-center w-full">
      <form action={formAction}
            onSubmit={submit}
            className="space-y-2.5 max-w-2xl w-full bg-blue-100 px-5 pb-5 pt-3 sm:px-10 sm:pb-10 sm:pt-6 rounded-lg shadow-lg transition sm:mb-20">
        <h1 className="text-center text-3xl mb-6">CREATE</h1>
        <div>
          <label className="sr-only" htmlFor="name">Task name</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Grocery"
            type="text"
            id="name"
            name="name"
          />
          <p className={'min-h-6 text-red-500'}>{state?.error?.name?._errors[0]}</p>
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
          <p className={'min-h-6 text-red-500'}>{state?.error?.title?._errors[0]}</p>
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
          <p className={'min-h-6 text-red-500'}>{state?.error?.description?._errors[0]}</p>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 mb-6">
            <div>
              <label
                htmlFor="Option1"
                className={`${selectedSize === 0 && 'bg-green-500 text-white border-green-500'} block w-full cursor-pointer rounded-lg border p-3 border-blue-500 text-blue-500 font-bold`}
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
                className={`${selectedSize === 1 && 'bg-orange-500 text-white border-orange-500'} block w-full cursor-pointer rounded-lg border p-3 border-blue-500 text-blue-500 font-bold`}
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
                className={`${selectedSize === 2 && 'bg-red-700 text-white border-red-700'} block w-full cursor-pointer rounded-lg border p-3 border-blue-500 text-blue-500 font-bold`}
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
        </div>
        <div>
          <Datepicker
            inputClassName="bg-white p-4 w-full rounded  rounded-xl h-12"
            primaryColor={"green"}
            asSingle={true}
            useRange={false}
            popoverDirection={"up"}
            minDate={new Date()}
            showShortcuts={true}
            value={value}
            onChange={handleValueChange}
            inputName="date"
            inputId="date"
          />
        </div>
        <label className="sr-only" htmlFor="search">Description</label>

        <div className="flex">
          <button className="bg-blue-300 hover:bg-blue-400 text-white rounded-lg h-10 mr-4 w-1/6 sm:hidden"
                  onClick={onSelectIcon}>{'Select Icon'}
          </button>

          <div className={`w-full mb-4 ${showBox ? 'block' : 'hidden'}`}>
            <SearchIconFolder onSelected={onIconSelect} onClose={onSelectIcon}/>
          </div>

        </div>
        <input id="size" name="size" type="hidden" value={selectedSize}></input>
        <input id="icon" name="icon" type="hidden" value={selectedIcon}></input>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="inline-block max-w-64 h-14 w-full rounded-lg bg-blue-300 hover:bg-blue-400 px-5 py-3 font-medium text-white"
            aria-disabled={isLoading}
            disabled={isLoading}>
            {isLoading ? 'LOADING' : 'CREATE'}
          </button>
        </div>
      </form>
    </div>
  );
}
