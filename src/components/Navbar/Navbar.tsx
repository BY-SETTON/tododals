"use client"

import {usePathname, useRouter} from 'next/navigation'

export interface NavItem {
  title: string,
  route: string,
}

interface Props {
  navItem: NavItem[],
  onLogOut?: () => void,
  loggedInState?: boolean,
}

export default function Navbar({navItem, onLogOut, loggedInState = false}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.route === '/') {
      return pathname === '/';
    } else {
      return pathname.startsWith(item.route)
    }
  }

  return (
    <div className="flex flex-row w-full">
      {loggedInState && <div className="basis-full justify-start flex">
        <button className="flex hover:underline items-center"
                onClick={() => router.back()}>Back
        </button>
      </div>}
      <div className="basis-full justify-center flex">
        <div className="inline-flex rounded-lg bg-primary-900 p-1">
          {
            navItem?.map((item) => {
                const activeStyle = isActive(item) ? 'bg-primary-700 text-neutral-50 shadow-sm focus:relative' : ''
                return <button
                  key={item.title}
                  className={`inline-block rounded-md px-4 py-2 text-sm text-neutral-50 hover:text-primary-50 focus:relative ${activeStyle}`}
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
      {loggedInState &&
        <>
          <div className="basis-full justify-end flex">
            <button className="bg-green-500 w-28 h-14 rounded text-l text-white hover:bg-green-600 mr-10"
                    onClick={() => {
                      router.push('/new')
                    }}>ADD
            </button>
            <button className="flex hover:underline items-center"
                    onClick={() => {
                      onLogOut?.();
                    }}>
              Logout
            </button>
          </div>
        </>
      }
    </div>
  )
}
