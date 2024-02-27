import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup here",
};

export default function SignupLayout({children}: Readonly<{
  children: React.ReactNode
}>) {
  return (<>{children}</>);
}
