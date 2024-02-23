import type {Metadata} from "next";
import PageLayout from "@/components/PageLayout/PageLayout";

export const metadata: Metadata = {
  title: "Edit",
  description: "Edit your tasks here",
};

export default function EditLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (<PageLayout className="bg-green-100">{children}</PageLayout>);
}
