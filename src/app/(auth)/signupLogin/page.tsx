import SignupLogin from "@/app/(auth)/signupLogin/(components)/SignupLogin";
import {headers} from "next/headers";

export default function SignupLoginPage() {
  const headersList = headers();
  const host = headersList.get('x-forwarded-proto') + '://' + headersList.get('host');
  const referer = headersList.get('referer');
  const path = referer?.split(host)
  return (<SignupLogin/>);
}
