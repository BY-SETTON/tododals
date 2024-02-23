"use client"
import {useRouter} from 'next/navigation'
import {useState} from "react";

export interface NavItem {
  title: string,
  route: string,
}

interface Props {
  navItem: NavItem[],
}

export default function Navbar({navItem}: Props) {
  const router = useRouter()

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
      {
        navItem?.map((item, index) => {
            const activeStyle = activeIndex === index ? 'bg-white text-blue-500 shadow-sm focus:relative' : ''
            return <button
              key={item.title}
              className={`inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative ${activeStyle}`}
              onClick={() => {
                setActiveIndex(index);
                router.push(item.route)
              }}
            >
              {item.title}
            </button>
          }
        )
      }
    </div>
  )
}
