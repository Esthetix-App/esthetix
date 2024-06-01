import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Esthetix",
  description: "Esthetix App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
      )}
    >
      <body>
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
  );
}
