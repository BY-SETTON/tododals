"use client"
import {useState} from "react";

const feather = require('feather-icons');

export default function SearchIcon() {

  const [selectedIconSvg, setSelectedIconSvg] = useState('');
  const emptyIcon = "Select icon"
  let icons = Object.keys(feather.icons);

  const onChange = (event: any | null) => {
    if (!event?.target?.value || event.target.value === emptyIcon) {
      setSelectedIconSvg('');
      return;
    }
    setSelectedIconSvg(feather.icons[event.target.value].toSvg({color: 'white', height: 32, width: 32}))
  }
  return (
    <div className="flex flex-row">
      <select
        name="HeadlineAct"
        id="HeadlineAct"
        className="rounded-lg border-gray-300 text-gray-700 sm:text-sm min-h-14 p-2 min-w-52  items-center flex"
        onChange={onChange}
      >
        <option value="">{emptyIcon}</option>
        {icons.map((icon: string) => {
          return (<option key={icon} value={icon}>
            {icon}
          </option>)
        })}
      </select>
      {selectedIconSvg && <div className="ml-4 bg-green-900 p-3 rounded-full items-center flex"
                               dangerouslySetInnerHTML={{__html: selectedIconSvg}}></div>}
    </div>
  )
}
