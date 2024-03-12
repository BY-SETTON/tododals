import type {Metadata} from "next";
import PageLayout from "@/components/PageLayout/PageLayout";

export const metadata: Metadata = {
  title: "Tasks",
  description: "View your tasks here",
};

export default function CalenderLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (<PageLayout>{children}</PageLayout>);
}
