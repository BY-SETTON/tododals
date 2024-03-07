"use client"
import {Lock, User} from "react-feather";
import {useFormState} from "react-dom";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Card from "@/components/Card/Card";
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
        <label htmlFor="signup-username" className="sr-only">Username</label>
        <div className={" rounded-full mr-4 bg-primary-100"}>
          <User className="w-6 h-6 m-2 text-primary-800"/>
        </div>
        <input
          className="rounded-lg border-gray-200 p-3 text-sm min-w-72"
          placeholder="Username"
          type="text"
          id="signup-username"
          name="signup-username"
        />
      </div>
      <div className="flex flex-row justify-center items-center">
        <label htmlFor="signup-password" className="sr-only">Password</label>
        <div className={" rounded-full mr-4 bg-primary-100"}>
          <Lock className="w-6 h-6 m-2 text-primary-800"/>
        </div>
        <input
          className="rounded-lg border-gray-200 p-3 text-sm min-w-72"
          placeholder="Password"
          type="text"
          id="signup-password"
          name="signup-password"
        />
      </div>
      <p>-{state.message}-</p>
      <div className="flex flex-row justify-center">
        <button type="submit"
                className={"bg-primary-500-50  rounded-full p-3 transition-colors duration-300 ease-in-out bg-primary-100 min-w-36 text-primary-700 hover:bg-primary-50"}>Signup
        </button>
      </div>
    </form>
  </Card>;
}
