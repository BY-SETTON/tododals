import {TaskSize} from "@/components/TodaysTasks/(enum)/task";

const getActiveColor = (size: TaskSize, extension?: string, number?: number) => {
  const front = `${extension ? `${extension}-` : ''}`;
  const back = `${number ? `-${number}` : ''}`;
  return size == 0 ? `${front}green${back}` : size == 1 ? `${front}amber${back}` : `${front}red${back}`
}

export default getActiveColor;
