import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { useRequireUser } from "../lib/hooks";
import { EmptyState } from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ExternalLinkIcon,
  Pen,
  PlusCircleIcon,
  SettingsIcon,
  Trash,
  User2Icon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyLinkMenu } from "../components/CopyLinkMenu";

async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      eventType: {
        select: {
          id: true,
          duration: true,
          active: true,
          url: true,
          title: true,
        },
      },
    },
  });
  if (!user) {
    return notFound();
  }
  return user;
}
export default async function DashboardPage() {
  const session = await useRequireUser();
  const data = await getUser(session.user?.id as string);
  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="You have no Events Type"
          description="You can create your first event type by clicking the button below"
          buttonText="Add Event Type"
          href="/dashboard/new"
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-10 gap-y-4 px-2">
            <div className="grid gap-y-1">
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Event Types
              </h1>
              <p className="text-sm text-muted-foreground">
                Create and Manage Your Event Types Here
              </p>
            </div>
            <div className="">
              <Button asChild>
                <Link href="/dashboard/new" className="flex items-center">
                  <PlusCircleIcon className="w-4 h-4 mr-2 " />
                  Add Event Type
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.eventType.map((event) => (
              <div
                className="overflow-hidden rounded-lg border shadow relative"
                key={event.id}
              >
                <div className="bg-muted/50 absolute top-1 right-1 rounded-md">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="size-8 p-0"
                        size="icon"
                      >
                        <SettingsIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`${data.username}/${event.url}`}>
                            <ExternalLinkIcon className="size-4 mr-2" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <CopyLinkMenu
                          meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.username}/${event.url}`}
                        />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/event/${event.id}`}>
                            <Pen className="size-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link href={"/"} className="flex p-5 items-center">
                  <div className="flex-shrink-0">
                    <User2Icon className="size-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {event.duration} Minutes Meeting
                      </dt>
                      <dd className="mt-1 text-lg font-medium">
                        {event.title}
                      </dd>
                    </dl>
                  </div>
                </Link>
                <div className="bg-muted/50 px-5 py-3 flex justify-between items-center">
                  <Switch />
                  <Button asChild>
                    <Link href={`/dashboard/event/${event.id}`}>
                      Edit Event
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
