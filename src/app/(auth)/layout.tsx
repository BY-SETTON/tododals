import type {Metadata} from "next";
import "../globals.css";
import Navbar, {NavItem} from "@/components/Navbar/Navbar";

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
    {title: 'Signup', route: '/signup', svgIcon: <div>Signup</div>},
    {title: 'Login', route: '/login', svgIcon: <div>Login</div>},
  ]

  return (
    <html lang="en" className="h-full">
    <body className=" pb-14 h-full bg-base-100">
    <div id="modal-root"></div>
    <div className="flex flex-col min-h-full">
      <div className={"flex justify-center items-center mb-3 z-10"}>
        <Navbar navItem={navItem} loggedInState={false}/>
      </div>
      {children}
    </div>
    </body>
    </html>
  );
}
