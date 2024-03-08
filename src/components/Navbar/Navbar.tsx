"use client"

import {usePathname, useRouter} from 'next/navigation'
import React, {ReactElement} from "react";

export interface NavItem {
  title?: string,
  route: string,
  svgIcon?: ReactElement,
  className?: string,
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
    <>
      <div
        className="fixed bottom-0 left-0 z-20 flex flex-row justify-between w-full h-16 sm:h-16 items-center p-0 sm:px-24 sm:top-4">
        {loggedInState && <div className="basis-full sm:w- justify-start hidden sm:flex">
          <button className="flex hover:underline items-center"
                  onClick={() => router.back()}>Back
          </button>
        </div>}
        <div className="basis-full justify-center flex h-full">
          <div
            className="inline-flex bg-neutral-600 justify-around sm:justify-between min-w-full sm:mt-2 sm:min-w-52 sm:rounded-lg p-2">
            {
              navItem?.map((item) => {
                  const activeStyle = isActive(item) ? 'bg-neutral-400 text-neutral-50 shadow-sm focus:relative' : ''
                  return <button
                    key={item.title}
                    className={`flex w-full justify-center sm:inline-block rounded-md px-4 py-2 text-sm text-neutral-50 hover:text-primary-50 focus:relative items-center ${activeStyle} ${item.className}`}
                    onClick={() => {
                      router.push(item.route)
                    }}
                  >
                    <div className="sm:block hidden">
                      {item.title}
                    </div>

                    <div className="sm:hidden block">
                      {item.svgIcon}
                    </div>
                  </button>
                }
              )
            }
          </div>
        </div>
        {loggedInState &&
          <>
            <div className="basis-full justify-end hidden sm:flex">
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
      <div className={"sm:mb-24 mb-0"}></div>
    </>
  )
}
