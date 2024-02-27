import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Create a task",
  description: "Create your tasks here",
};

export default function NewTaskLayout({children}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
