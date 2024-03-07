"use client"
import {Lock, User} from "react-feather";
import {useFormState} from "react-dom";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import {login} from "@/app/(auth)/signupLogin/actions";
import PopUp from "@/components/PopUp/PopUp";

const initialState: ResponseInterface = {
  message: '',
  type: ResponseTypes.ERROR,
}
export default function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(login, initialState);

  useEffect(() => {
    switch (state.type) {
      case ResponseTypes.SUCCESS:
        router.push('/')
        break;
      case ResponseTypes.ERROR:
      default:
        break;
    }
  }, [state, router])

  return <Card className={"bg-neutral-100"}>
    <form action={formAction} className="space-y-6">
      <div className="flex flex-row justify-center items-center">
        <label htmlFor="login-username" className="sr-only">Username</label>
        <div className={" rounded-full mr-4 bg-neutral-500"}>
          <User className="w-6 h-6 m-2 text-neutral-50"/>
        </div>
        <input
          className="rounded-lg border-gray-200 p-3 text-sm min-w-72"
          placeholder="Username"
          type="text"
          id="login-username"
          name="login-username"
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <label htmlFor="password" className="sr-only">Password</label>
        <div className={" rounded-full mr-4 bg-neutral-500"}>
          <Lock className="w-6 h-6 m-2 text-neutral-50"/>
        </div>
        <input
          className="rounded-lg border-gray-200 p-3 text-sm min-w-72"
          placeholder="login-Password"
          type="password"
          autoComplete="on"
          id="login-password"
          name="login-password"
        />
      </div>
      <p>-{state.message}-</p>
      <div className="flex flex-row justify-center">
        <button type="submit"
                className={"bg-neutral-500 min-w-36 text-neutral-50 hover:bg-neutral-400 bg-primary-500-50  rounded-full p-3 transition-colors duration-300 ease-in-out"}>Login
        </button>
      </div>
    </form>
  </Card>

}
