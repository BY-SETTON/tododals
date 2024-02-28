"use client"

import {usePathname, useRouter} from 'next/navigation'
import useSessionStorage from "@/hooks/useSessionStorage";
import {getCookie} from "@/serverFunctions/cookies";

export interface NavItem {
  title: string,
  route: string,
}

interface Props {
  navItem: NavItem[],
  showBackButton?: boolean,
  showAddButton?: boolean,
}

export default function Navbar({navItem, showBackButton = true, showAddButton = true}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  // const usernamev2 = getCookie('username');
  // console.log(usernamev2);
  // const username = useSessionStorage('username');
  // const isLoggedIn = !!username;
  // if (!isLoggedIn && !pathname.includes('/signup')) {
  //   router.push('/login');
  // }

  const isActive = (item: NavItem) => {
    if (item.route === '/') {
      return pathname === '/';
    } else {
      return pathname.startsWith(item.route)
    }
  }

  return (
    <div className="flex flex-row w-full mb-14">
      {showBackButton && <div className="basis-full justify-start flex">
        <button className="flex hover:underline items-center"
                onClick={() => router.back()}>Back
        </button>
      </div>}
      <div className="basis-full justify-center flex">
        <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
          {
            navItem?.map((item) => {
                const activeStyle = isActive(item) ? 'bg-white text-blue-500 shadow-sm focus:relative' : ''
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
      {showAddButton && <div className="basis-full justify-end flex">
        <button className="bg-green-500 w-28 h-14 rounded text-l text-white hover:bg-green-600"
                onClick={() => {
                  router.push('/new')
                }}>ADD
        </button>
      </div>}
    </div>
  )
}
