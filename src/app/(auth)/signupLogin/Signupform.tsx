"use client"
import {Lock, User} from "react-feather";
import {useFormState} from "react-dom";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import {signup} from "@/app/(auth)/signupLogin/actions";

const initialState: ResponseInterface = {
  message: '',
  type: ResponseTypes.ERROR,
}
export default function SignupForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(signup, initialState);

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

  return <Card className={"bg-primary-500"}>
    <form action={formAction}
          className="space-y-6">
      <div className="flex flex-row justify-center items-center">
        <label htmlFor="username" className="sr-only">Username</label>
        <div className={" rounded-full mr-4 bg-primary-100"}>
          <User className="w-6 h-6 m-2 text-primary-800"/>
        </div>
        <input
          className="rounded-lg border-gray-200 p-3 text-sm min-w-72"
          placeholder="Username"
          type="text"
          id="username"
          name="username"
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <label htmlFor="password" className="sr-only">Password</label>
        <div className={" rounded-full mr-4 bg-primary-100"}>
          <Lock className="w-6 h-6 m-2 text-primary-800"/>
        </div>
        <input
          className="rounded-lg border-gray-200 p-3 text-sm min-w-72"
          placeholder="Password"
          type="text"
          id="password"
          name="password"
        />
      </div>
      <p>-{state.message}-</p>
      <div className="flex flex-row justify-center">
        <Button type="submit" className={"bg-primary-100 min-w-36 text-primary-700"}>Signup</Button>
      </div>
    </form>
  </Card>;
}
