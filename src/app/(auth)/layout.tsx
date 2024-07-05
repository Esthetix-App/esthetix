import { Header } from "@/components/header";
import { NavBar } from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen max-h-screen w-full overflow-hidden md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavBar />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
