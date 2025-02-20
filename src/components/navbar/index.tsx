import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavBarItems } from "./navbar-items";

export const NavBar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
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
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <NavBarItems />
        </div>
      </div>
    </div>
  );
};
