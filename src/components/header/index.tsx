import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavBarItems } from "@/components/navbar/navbar-items";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HeaderUserMenu } from "@/components/header/header-user-menu";
import { HeaderBreadcrumb } from "@/components/header/header-breadcrumb";

export const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <Link href="/" className="ml-2 flex items-center gap-2 font-semibold">
            <Image
              width={40}
              height={40}
              quality={100}
              priority
              alt="Logo"
              src="/images/logo.svg"
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <span className="">Esthetix</span>
          </Link>
          <NavBarItems className="grid gap-2 text-lg font-medium" />
        </SheetContent>
      </Sheet>
      <HeaderBreadcrumb />
      <HeaderUserMenu />
    </header>
  );
};
