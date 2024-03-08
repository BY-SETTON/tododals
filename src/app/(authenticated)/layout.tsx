import type {Metadata} from "next";
import "../globals.css";
import Navbar, {NavItem} from "@/components/Navbar/Navbar";
import {logout} from "@/app/(authenticated)/actions";
import {Archive, Calendar, CheckSquare, Plus} from "react-feather";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode,
}>) {
  const navItem: NavItem[] = [
    {title: 'Tasks', svgIcon: <CheckSquare/>, route: '/'},
    {svgIcon: <Plus/>, route: '/new', className: 'sm:hidden'},
    {title: 'Archive', svgIcon: <Archive/>, route: '/archive'},
    {title: 'Calender', svgIcon: <Calendar/>, route: '/calender'}
  ]

  return (
    <html lang="en" className="h-full">
    <body className="sm:pt-12 sm:pb-14 sm:px-14 px-4 pt-4 h-full">
    <div id="modal-root"></div>
    <Navbar navItem={navItem} onLogOut={logout} loggedInState={true}/>
    <div className="flex flex-col min-h-full mb-24 sm:16">
      {children}
    </div>
    </body>
    </html>
  );
}
