import type {Metadata} from "next";
import PageLayout from "@/components/PageLayout/PageLayout";

export const metadata: Metadata = {
  title: "Createa a task",
  description: "Edit your tasks here",
};

export default function CalenderMonthLayout({children}: Readonly<{
  children: React.ReactNode
}>) {
  return (<PageLayout>{children}</PageLayout>);
}
