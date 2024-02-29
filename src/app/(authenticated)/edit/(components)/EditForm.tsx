"use client"

import SearchIconFolder from "@/components/SearchIcon/SearchIconFolder";
import {useEffect, useState} from "react";
import {useFormState} from "react-dom";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import Datepicker from "react-tailwindcss-datepicker";
import {useRouter} from "next/navigation";
import {editTodo} from "@/app/(authenticated)/edit/actions";
import {TaskNoteInterface} from "@/components/TodaysTasks/(interfaces)/task";
import {TaskSize} from "@/components/TodaysTasks/(enum)/task";

const initialState: ResponseInterface = {
  message: '',
  type: ResponseTypes.ERROR,
}

interface Props {
  task: TaskNoteInterface,
  onTaskChange: (task: TaskNoteInterface) => void
}

export default function EditTaskForm({task, onTaskChange}: Props) {
  const [editedTask, setEditedTask] = useState<TaskNoteInterface>(task);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const onSubmitted = () => {
    router.push('/');
  }

  const date = (new Date(task?.dueDate || ''))
  date.setDate(date.getDate() + 1);
  const isoDate = date.toISOString().split('T')[0];
  const [value, setValue] = useState<any>({
    startDate: isoDate,
    endDate: isoDate,
  });

  const handleValueChange = (newValue: any) => {
    handleTaskChange(newValue.startDate, 'dueDate')
    setValue(newValue);
  }

  const [state, formAction] = useFormState(editTodo, initialState);

  const [selectedSize, setSelectedSize] = useState<TaskSize>(task.size);
  const [selectedIcon, setSelectedIcon] = useState<string>(task.icon || '');
  const [showBox, setShowBoxBox] = useState<boolean>(!!task.icon);

  const onSelectIcon = (event: any) => {
    event.preventDefault()
    setShowBoxBox(!showBox);
  }
  const onSizeClick = (index: number) => {
    handleTaskChange(index, 'size')
    setSelectedSize(index);
  }

  const onIconSelect = (icon: string) => {
    handleTaskChange(icon, 'icon')
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
  }, [onSubmitted, state])

  const submit = () => {
    setIsLoading(true);
  }

  const handleTaskChange = (value: string | Date | TaskSize, name: keyof TaskNoteInterface,) => {
    if (value || value === 0 || value === '') {
      const editedTaskNew: TaskNoteInterface = {...editedTask};
      (editedTaskNew[name] as (string | Date | TaskSize)) = value;

      setEditedTask(editedTaskNew);
      onTaskChange(editedTaskNew);
    }
  }

  return (
    <div className="flex justify-center w-full">
      <form action={formAction}
            onSubmit={submit}
            className="space-y-2.5 max-w-2xl w-full bg-blue-100 px-10 pb-10 pt-6 rounded-lg shadow-lg transition mb-20">
        <h1 className="text-center text-3xl mb-6">UPDATE</h1>
        <div>
          <label className="sr-only" htmlFor="name">Task name</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Grocery"
            defaultValue={task.name}
            type="text"
            id="name"
            name="name"
            onChange={(value) => {
              handleTaskChange(value.target.value, 'name')
            }}
          />
          <p className={'min-h-6 text-red-500'}>{state?.error?.name?._errors[0]}</p>
        </div>
        <div>
          <label className="sr-only" htmlFor="title">Task title</label>
          <input
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Pnp Shop"
            defaultValue={task.title}
            type="text"
            id="title"
            name="title"
            onChange={(value) => {
              handleTaskChange(value.target.value, 'title')
            }}
          />
          <p className={'min-h-6 text-red-500'}>{state?.error?.title?._errors[0]}</p>
        </div>
        <div>
          <label className="sr-only" htmlFor="description">Description</label>
          <textarea
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Buy stuff for three meals. Do it before 5pm today"
            defaultValue={task.description}
            id="description"
            name="description"
            onChange={(value) => {
              handleTaskChange(value.target.value, 'description')
            }}
            rows={4}
          />
          <div className="flex flex-row justify-between">
            <p className={'min-h-6 text-red-500'}>{state?.error?.description?._errors[0]}</p>
            <div className={editedTask.description.length > 255 ? 'text-red-500' : ''}>
              count {editedTask.description.length}
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 mb-6">
            <div>
              <label
                htmlFor="Option1"
                className={`${selectedSize == TaskSize.SMALL && 'bg-green-500 text-white border-green-500'} block w-full cursor-pointer rounded-lg border p-3 text-blue-500 border-blue-500 font-bold`}
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
                className={`${selectedSize == TaskSize.MEDIUM && 'bg-orange-500 text-white border-orange-500'} block w-full cursor-pointer rounded-lg border p-3 text-blue-500 border-blue-500 font-bold`}
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
                className={`${selectedSize == TaskSize.LARGE && 'bg-red-700 text-white border-red-700'} block w-full cursor-pointer rounded-lg border p-3 text-blue-500 border-blue-500 font-bold`}
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
            inputClassName="bg-white p-4 w-full rounded  rounded-xl"
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
        {showBox && <SearchIconFolder onSelected={onIconSelect} onClose={onSelectIcon} defaultValue={task.icon}/>}
        {!showBox && <button className="h-14 bg-blue-300 hover:bg-blue-400 text-white rounded max-w-40 w-full"
                             onClick={onSelectIcon}>{'Select Icon'}
        </button>}
        <input id="size" name="size" type="hidden" value={selectedSize}></input>
        <input id="icon" name="icon" type="hidden" value={selectedIcon}></input>
        <input id="taskId" name="taskId" type="hidden" value={task.id}></input>
        <div className="mt-4">
          <button
            type="submit"
            className="inline-block w-full rounded-lg bg-blue-300 hover:bg-blue-400 px-5 py-3 font-medium text-white sm:w-auto"
            disabled={isLoading}>
            {isLoading ? 'LOADING' : 'UPDATE'}
          </button>
        </div>

        <p>
          {state.message}
        </p>
      </form>
    </div>
  );
}
