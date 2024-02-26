import {TaskSize} from "@/app/todays-tasks/(enum)/task";

export interface TaskNoteInterface {
  id: string,
  name: string,
  title: string,
  description: string,
  size: TaskSize
  icon?: string,
  primaryAction?: string,
}
