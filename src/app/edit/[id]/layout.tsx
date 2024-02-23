import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Edit task",
  description: "Edit your tasks here",
};

export default function TaskLayout({children}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
