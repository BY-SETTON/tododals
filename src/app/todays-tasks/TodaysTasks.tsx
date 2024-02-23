import TaskNoteCollection from "@/components/TaskNoteCollection/TaskNoteCollection";

export enum TaskSize {
  SMALL = 0,
  MEDIUM = 1,
  LARGE = 2,
}

export interface TaskNoteInterface {
  id: string,
  header: string,
  title: string,
  description: string,
  size: TaskSize
  icon?: string,
  primaryAction?: string,
}

const mockData: TaskNoteInterface[] = [
  {
    id: '1',
    header: 'Do laundry',
    title: 'White and color',
    description: "Hang it up before the sun comes up",
    size: TaskSize.LARGE,
  },
  {
    id: '2',
    header: 'Make dinner',
    title: 'Pasta creamy',
    description: "Buy stuff from store at 5",
    size: TaskSize.MEDIUM,
  },
  {
    id: '2',
    header: 'Make dinner',
    title: 'Pasta creamy',
    description: "Buy stuff from store at 5",
    size: TaskSize.MEDIUM,
  },
  {
    id: '2',
    header: 'Make dinner',
    title: 'Pasta creamy',
    description: "Buy stuff from store at 5",
    size: TaskSize.MEDIUM,
  },
  {
    id: '2',
    header: 'Make dinner',
    title: 'Pasta creamy',
    description: "Buy stuff from store at 5",
    size: TaskSize.MEDIUM,
  },
  {
    id: '2',
    header: 'Make dinner',
    title: 'Pasta creamy',
    description: "Buy stuff from store at 5",
    size: TaskSize.MEDIUM,
  },
  {
    id: '2',
    header: 'Make dinner',
    title: 'Pasta creamy',
    description: "Buy stuff from store at 5",
    size: TaskSize.MEDIUM,
  },
]

export default function TodaysTasks() {
  return <TaskNoteCollection taskNotes={mockData}/>
}
