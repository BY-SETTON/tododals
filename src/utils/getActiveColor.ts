import {TaskSize} from "@/components/TodaysTasks/(enum)/task";

const getActiveColor = (size: TaskSize, extension?: string) => {
  if (extension) {
    return size == 0 ? `${extension}-green-400` : size == 1 ? `${extension}-amber-400` : `${extension}-red-400`
  } else {
    return size == 0 ? `green-400` : size == 1 ? `amber-400` : `red-400`
  }
}

export default getActiveColor;
