"use client"
import LoginForm from "@/app/(auth)/signupLogin/LoginForm";
import SignupForm from "@/app/(auth)/signupLogin/Signupform";
import {usePathname} from "next/navigation";

export default function SignupLogin() {
  const pathname = usePathname();

  const isLogin = (): boolean => {
    return !pathname.includes('/login');
  }

  return <>
    <div
      className={`absolute -z-10 left-0 bg-neutral-100  w-1/2 h-full overflow-auto`}>
      <div
        className={`absolute z-10 w-full h-96 transition-transform ease-in-out duration-700 ${isLogin() ? '-translate-y-full delay-0' : 'translate-y-[50%] delay-[750ms]'}`}>
        <div className={"flex w-full h-full justify-center items-center text-9xl"}>
          LOGIN
        </div>
      </div>
      <div
        className={`absolute mt-48 transition-transform ease-in-out duration-[2000ms] ${isLogin() ? 'translate-x-[calc(25vw-204px)]  delay-250' : 'translate-x-[calc(75vw-204px)] delay-250'}`}>
        <SignupForm/>
      </div>
    </div>
    <div
      className={`absolute -z-10 right-0 bg-primary-500 w-1/2 h-full overflow-auto`}>
      <div
        className={`absolute z-10 w-full h-96 transition-transform ease-in-out duration-700 bottom-0  ${isLogin() ? '-translate-y-[35vh] delay-[750ms]' : 'translate-y-full delay-250'}`}>
        <div className={"flex w-full h-full justify-center items-center text-9xl"}>
          SIGNUP
        </div>
      </div>
      <div
        className={`absolute mt-48 transition-transform ease-in-out delay-50 duration-[2000ms] ${isLogin() ? '-translate-x-[calc(25vw+204px)]  delay-250' : 'translate-x-[calc(25vw-204px)] delay-250'}`}>
        <LoginForm/>
      </div>
    </div>
  </>
}
