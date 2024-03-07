import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login here",
};

export default function SignupLoginLayout({children}: Readonly<{
  children: React.ReactNode
}>) {
  return (<>{children}</>);
}
