"use client"

import LoginForm from "@/app/(auth)/signupLogin/(components)/LoginForm";
import SignupForm from "@/app/(auth)/signupLogin/(components)/Signupform";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

interface Props {
  path?: string,
}

export default function SignupLogin({path}: Props) {
  const pathnameUse = usePathname();
  const [pathname, setPathname] = useState<string>(path || pathnameUse);
  const [isSignup, setIsSignup] = useState<boolean>(!pathname.includes('/login'));

  useEffect(() => {
    setIsSignup(!pathname.includes('/login'));
  }, [pathname])

  useEffect(() => {
    setPathname(pathnameUse);
  }, [pathnameUse]);

  return <>
    <div className={"absolute w-full h-full hidden sm:block"}>
      <div
        className={`absolute left-0 bg-neutral-100 w-1/2 h-full overflow-auto`}>
        <div
          className={`absolute z-10 w-full h-96 transition-transform ease-in-out duration-700 ${isSignup ? '-translate-y-full delay-0' : 'translate-y-[50%] delay-[750ms]'}`}>
          <div className={"flex w-full h-full justify-center items-center flex-col"}>
            <div className={"text-9xl text-neutral-500 mb-2"}>
              LOGIN
            </div>
            <div className={"text-xl text-neutral-400"}>
              :)
            </div>
          </div>
        </div>
        <div
          className={`absolute mt-72 transition-transform ease-in-out duration-[2000ms] ${isSignup ? 'translate-x-[calc(25vw-204px)]  delay-250' : 'translate-x-[calc(75vw-204px)] delay-250'}`}>
          <SignupForm/>
          {/*<div className={"hidden"}>*/}
          {/*  {isSignup.toString()}*/}
          {/*</div>*/}
        </div>
      </div>
      <div
        className={`absolute right-0 bg-primary-500 w-1/2 h-full overflow-auto`}>
        <div
          className={`absolute z-10 w-full h-96 transition-transform ease-in-out duration-700 bottom-0  ${isSignup ? '-translate-y-[35vh] delay-[750ms]' : 'translate-y-full delay-250'}`}>
          <div className={"flex w-full h-full justify-center items-center flex-col"}>
            <div className={"text-9xl text-primary-100 mb-2"}>
              SIGNUP
            </div>
            <div className={"text-xl text-primary-300"}>
              It&apos;s free
            </div>
          </div>
        </div>
        <div
          className={`absolute mt-72 transition-transform ease-in-out delay-50 duration-[2000ms] ${!!isSignup ? '-translate-x-[calc(25vw+204px)]  delay-250' : 'translate-x-[calc(25vw-204px)] delay-250'}`}>
          <LoginForm/>
        </div>
      </div>
    </div>
    <div
      className={`flex flex-col w-full h-full z-0 sm:hidden`}>
      <div
        className={`bg-neutral-100 px-2 transition-all ${isSignup ? 'h-[100vh]' : 'h-0'} ease-in-out duration-[1900ms] overflow-auto -z-20`}>
        <div className={"mt-[20vh]"}>
          <SignupForm/>
        </div>
      </div>
      <div className={`bg-primary-500 h-[100vh] w-full overflow-auto -z-40`}>
      </div>
      <div className={"w-full fixed px-2 -z-30 top-0 h-full"}>
        <div className={"mt-[20vh]"}>
          <LoginForm/>
        </div>
      </div>
    </div>
  </>
}
