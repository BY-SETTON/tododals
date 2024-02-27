"use client"
import {Lock, User} from "react-feather";
import {useFormState} from "react-dom";
import {login} from "@/app/(auth)/login/actions";
import {ResponseInterface} from "@/app/(authenticated)/new/(interfaces)/interface";
import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";

const initialState: ResponseInterface = {
  message: '',
  type: ResponseTypes.ERROR,
}
export default function LoginForm() {

  const [state, formAction] = useFormState(login, initialState);

  const onSubmit = (event: any) => {
    formAction(event);
    localStorage.setItem('username', 'Anisha');
  }
  return <div className="flex justify-center">
    <form action={onSubmit}
          className="space-y-6 max-w-xl w-full bg-blue-100 p-10 rounded-lg shadow-lg transition mb-20 flex justify-center flex-col">
      <h1 className="text-center text-3xl">Login</h1>
      <div className="flex flex-row justify-center items-center">
        <label htmlFor="username" className="sr-only">Username</label>
        <User className="mr-4"/>
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
        <Lock className="mr-4"/>
        <input
          className="rounded-lg border-gray-200 p-3 text-sm min-w-72"
          placeholder="Password"
          type="password"
          id="password"
          name="password"
        />
      </div>
      <p>-{state.message}-</p>
      <div className="flex flex-row justify-center">
        <button type="submit" className="bg-blue-300 hover:bg-blue-400 rounded-full min-w-36 p-4">submit</button>
      </div>
    </form>
  </div>

}
