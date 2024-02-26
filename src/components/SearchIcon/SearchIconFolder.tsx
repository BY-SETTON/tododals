"use client"
import React, {useState} from "react";

const feather = require('feather-icons');

interface Props {
  onSelected: (icon: string) => void;
}

export default function SearchIconFolder({onSelected}: Props) {

  const [selectedIcon, setSelectedIcon] = useState('');
  const [searchValue, setSearchValue] = useState('');
  let icons = Object.keys(feather.icons);

  const iconSelected = (icon: string) => {
    setSelectedIcon(icon);
    onSelected(icon);
  }

  const onSearchChange = (event: any) => {
    setSearchValue(event.target.value)
  }

  const getSearchedIcons = (icons: any): any => {
    if (!searchValue) {
      return icons;
    }

    return icons.filter((icon: string) => {
      return icon.includes(searchValue);
    });
  }

  return <div>
    <div
      className="rounded-2xl border border-blue-100 bg-white px-4 pb-4 pt-2 shadow-lg sm:px-6 lg:px-8 sm:pb-6 lg:pb-8 sm:pt-2 lg:pt-4 max-h-80 overflow-auto"
      role="alert">
      <div className="mb-2">
        <label className="sr-only" htmlFor="name">Search</label>
        <input
          className="w-full rounded-lg border-gray-200 p-3 text-sm   bg-gray-200"
          placeholder="shop"
          type="text"
          id="search"
          onChange={onSearchChange}
        />
      </div>
      <div className="grid grid-cols-8">
        {getSearchedIcons(icons).map((icon: string) => {
          if (!feather.icons[icon]) {
            return
          }
          const svgIcon = feather.icons[icon].toSvg({color: 'white'});
          return (
            <div key={icon} className="p-1 cursor-pointer" onClick={() => {
              iconSelected(icon)
            }}>
              <img
                className={`bg-green-900 flex justify-center rounded-full p-2 ${icon === selectedIcon ? "bg-red-400" : ""}`}
                src={`data:image/svg+xml;utf8,${svgIcon}`} alt=""/>

            </div>
          )
        })
        }
      </div>
    </div>
  </div>
}
