"use client";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  HomeIcon,
  LucideProps,
  Settings,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface iAppProps {
  id: number;
  name: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const dashBoardLinks: iAppProps[] = [
  {
    id: 0,
    name: "Event Types",
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Meetings",
    url: "/dashboard/meetings",
    icon: Users2,
  },
  {
    id: 2,
    name: "Availability",
    url: "/dashboard/availability",
    icon: CalendarCheck,
  },
  {
    id: 3,
    name: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];
export const DashboardLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {dashBoardLinks.map((link) => (
        <Link
          key={link.id}
          href={link.url}
          className={cn(
            pathname === link.url
              ? "text-primary bg-primary/15"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-md px-3 transition-all hover:text-primary py-2 text-base font-medium"
          )}
        >
          <link.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          {link.name}
        </Link>
      ))}
    </>
  );
};
