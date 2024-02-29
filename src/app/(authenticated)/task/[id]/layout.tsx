import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Createa a task",
  description: "Edit your tasks here",
};

export default function TaskLayout({children}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="mt-8">{children}</div>
}
