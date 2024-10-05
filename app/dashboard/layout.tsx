import { ReactNode } from "react";
import { Logo } from "../components/Logo";
import { DashboardLinks } from "../components/DashboardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogOutIcon, Menu, Settings, Settings2 } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRequireUser } from "../lib/hooks";
import Link from "next/link";
import { signOut } from "../lib/auth";
import prisma from "../lib/db";
import { redirect } from "next/navigation";

const fetchUser = async (userId: string) => {
  const session = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });
  if (!session?.username) {
    return redirect("/onboarding");
  }
  return session;
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await useRequireUser();
  const data = await fetchUser(session.user?.id as string);
  return (
    <>
      <main className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border-r bg-muted/20">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Logo />
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="h-14 flex items-center gap-4 border-b bg-muted/20 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="md:hidden shrink-0"
                  size={"icon"}
                  variant={"outline"}
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"} className="flex flex-col">
                <nav className="grid gap-2 mt-6">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>
            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"secondary"}
                    size={"icon"}
                    className="rounded-full"
                  >
                    <img
                      src={session?.user?.image as string}
                      className="w-full h-full rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2"
                    >
                      <Settings className=" h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button className="w-full flex items-center gap-2">
                        <LogOutIcon className=" h-4 w-4" />
                        Logout
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <section className="flex flex-1 flex-col gap-4 p-4 lg:p-6 lg:gap-6">
            {children}
          </section>
        </div>
      </main>
    </>
  );
}
