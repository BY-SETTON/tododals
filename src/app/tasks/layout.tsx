import type {Metadata} from "next";
import PageLayout from "@/components/PageLayout/PageLayout";

export const metadata: Metadata = {
  title: "Tasks",
  description: "View your tasks here",
};

export default function TasksLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (<PageLayout className="bg-red-100">{children}</PageLayout>);
}
