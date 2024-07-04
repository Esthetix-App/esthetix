"use client";

import Link from "next/link";
import { Fragment, useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadcrumbs } from "@/config/breadcrumbs";

export const HeaderBreadcrumb = () => {
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    return breadcrumbs[pathname];
  }, [pathname]);

  return (
    <div className="w-full flex-1">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumbItems?.map((item, index) => (
            <Fragment key={item.name}>
              <BreadcrumbItem>
                {item.isCurrentPage ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href ?? ""}>{item.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index !== breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
