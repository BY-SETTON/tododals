interface Props {
  children: React.ReactNode,
  className: string,
}

export default function PageLayout({children, className}: Readonly<Props>) {
  return (
    <div className={`w-full h-full  flex flex-auto items-stretch content-center justify-center`}>
      <div className={`w-full max-w-6xl  p-6 ${className}`}>{children}</div>
    </div>
  );
}
