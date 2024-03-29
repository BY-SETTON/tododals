import {TaskSize} from "@/components/TodaysTasks/(enum)/task";

export interface TaskNoteInterface {
  id: string,
  name: string,
  title: string,
  description: string,
  size: TaskSize,
  dueDate?: Date,
  icon?: string,
  primaryAction?: string,
}
