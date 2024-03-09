"use client"
import {Lock, User} from "react-feather";
import {useFormState} from "react-dom";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Card from "@/components/Card/Card";
import {login} from "@/app/(auth)/signupLogin/actions";

const initialState: ResponseInterface = {
  message: '',
  type: ResponseTypes.ERROR,
}
export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(false)

  }, [state, router])

  return <Card className={"bg-neutral-100"}>
    <form action={formAction}
          onSubmit={() => {
            setLoading(true)
          }}
          className="space-y-6">
      <div className="flex flex-row justify-center items-center">
        <label htmlFor="login-username" className="sr-only">Username</label>
        <div className={" rounded-full mr-4 bg-neutral-200"}>
          <User className="w-6 h-6 m-2 text-neutral-500"/>
        </div>
        <input
          className="rounded-lg p-3 text-sm min-w-60 outline-0"
          placeholder="Username"
          type="text"
          id="login-username"
          name="login-username"
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <label htmlFor="login-password" className="sr-only">Password</label>
        <div className={" rounded-full mr-4 bg-neutral-200"}>
          <Lock className="w-6 h-6 m-2 text-neutral-500"/>
        </div>
        <input
          className="rounded-lg  p-3 text-sm min-w-60  bg-neutral-50 outline-0"
          placeholder="Password"
          type="password"
          autoComplete="on"
          id="login-password"
          name="login-password"
        />
      </div>
      {/*<p>-{state.message}-</p>*/}
      <div className="flex flex-row justify-center">
        <button type={loading ? "button" : "submit"}
                className={"bg-neutral-200 min-w-36 text-neutral-500 hover:bg-neutral-50 rounded-full p-3 transition-colors duration-300 ease-in-out"}>
          {loading ? 'Logging in' : 'Login'}
        </button>
      </div>
    </form>
  </Card>

}
