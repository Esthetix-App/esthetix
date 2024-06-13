import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/server/auth";
import { SessionProvider } from "next-auth/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Esthetix",
  description: "Esthetix App",
  icons: [{ rel: "icon", url: "/images/logo.svg" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html
        lang="pt-BR"
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <body suppressHydrationWarning={true}>
          <TRPCReactProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </TRPCReactProvider>
          <Toaster
            richColors
            closeButton
            theme="light"
            duration={2000}
            visibleToasts={3}
            pauseWhenPageIsHidden={false}
            toastOptions={{
              classNames: {
                toast: "font-sans",
                title: "font-semibold",
                description: "font-normal",
              },
            }}
          />
        </body>
      </html>
    </SessionProvider>
  );
}
