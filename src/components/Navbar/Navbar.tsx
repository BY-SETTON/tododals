"use client"
import {usePathname, useRouter} from 'next/navigation'

export interface NavItem {
  title: string,
  route: string,
}

interface Props {
  navItem: NavItem[],
}

export default function Navbar({navItem}: Props) {
  const initialRoute = '/'
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex flex-row w-full  justify-between items-center mb-14">
      <button className="flex items-start hover:underline" onClick={() => router.back()}>Back</button>
      <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1 m-auto">
        {
          navItem?.map((item, index) => {
              const activeStyle = pathname === item.route ? 'bg-white text-blue-500 shadow-sm focus:relative' : ''
              return <button
                key={item.title}
                className={`inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative ${activeStyle}`}
                onClick={() => {
                  router.push(item.route)
                }}
              >
                {item.title}
              </button>
            }
          )
        }
      </div>
    </div>
  )
}
