import {useEffect, useState} from "react";

const useSessionStorage = (name: string) => {
  const [value, setValue] = useState<any>(undefined)

  useEffect(() => {
    setValue(sessionStorage.getItem(name))
  }, [])

  return value
}

export default useSessionStorage
