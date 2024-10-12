import { CreateMeetingAction } from "@/app/actions";
import { RenderCalendar } from "@/app/components/BookingForm/RenderCalendar";
import TimeTable from "@/app/components/BookingForm/TimeTable";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(username: string, eventUrl: string) {
  const event = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        username: username,
      },
      active: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          username: true,
          name: true,
          image: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });
  if (!event) notFound();
  return event;
}
export default async function BookingPage({
  params,
  searchParams,
}: {
  params: { username: string; eventUrl: string };
  searchParams: { date?: string; time?: string };
}) {
  const data = await getData(params.username, params.eventUrl);
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();
  // Formatting the date properly
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(selectedDate);

  const showForm = !!searchParams.date && !!searchParams.time;
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px] mx-auto w-full">
          <CardContent className="p-5 grid gap-5  md:grid-cols-[1fr_auto_1fr]">
            <div className="">
              <Link href="/" className="flex items-center gap-2 mb-3">
                <Image
                  src="/image.png"
                  alt="logo"
                  className="size-8"
                  width={40}
                  height={40}
                />
                <h4 className="flex text-3xl sm:gap-1 sm:items-center font-semibold">
                  Slot
                  <span className="text-primary">Sync</span>
                </h4>
              </Link>
              <img
                src={data.User?.image as string}
                alt="User profile image"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.User?.name}
              </p>
              <h1 className="text-2xl font-bold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.description}
              </p>
              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center gap-x-1">
                  <CalendarX2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center gap-x-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} minutes
                  </span>
                </p>
                <p className="flex items-center gap-x-1">
                  <VideoIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="h-full w-[1px] hidden md:block"
            />
            <Separator
              orientation="horizontal"
              className="w-full h-[1px] md:hidden"
            />
            <form
              className="flex flex-col gap-y-4"
              action={CreateMeetingAction}
            >
              {/* Taking some hidden inputs to store the selected date and time and send to the action */}
              <input type="hidden" name="fromTime" value={searchParams.time} />
              <input type="hidden" name="eventDate" value={searchParams.date} />
              <input type="hidden" name="meetLen" value={data.duration} />
              <input
                type="hidden"
                name="provider"
                value={data.videoCallSoftware}
              />
              <input type="hidden" name="username" value={params.username} />
              <input type="hidden" name="eventTypeId" value={data.id} />
              {/* Inputs for user to enter their name and email */}
              <div className="flex flex-col gap-y-2">
                <Label>Your Name</Label>
                <Input placeholder="John Doe" name="name" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Your Email</Label>
                <Input placeholder="johndoe@example.com" name="email" />
              </div>
              <SubmitButton text="Book Meeting" className="w-full" />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-5xl mx-auto w-full">
          <CardContent className="p-5 grid gap-5  md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="">
              <Link href="/" className="flex items-center gap-2 mb-3">
                <Image
                  src="/image.png"
                  alt="logo"
                  className="size-8"
                  width={40}
                  height={40}
                />
                <h4 className="flex text-3xl sm:gap-1 sm:items-center font-semibold">
                  Slot
                  <span className="text-primary">Sync</span>
                </h4>
              </Link>
              <img
                src={data.User?.image as string}
                alt="User profile image"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.User?.name}
              </p>
              <h1 className="text-2xl font-bold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.description}
              </p>
              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center gap-x-1">
                  <CalendarX2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>
                <p className="flex items-center gap-x-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} minutes
                  </span>
                </p>
                <p className="flex items-center gap-x-1">
                  <VideoIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>
            <Separator
              orientation="vertical"
              className="h-full w-[1px] hidden md:block"
            />
            <Separator
              orientation="horizontal"
              className="w-full h-[1px] md:hidden"
            />

            <RenderCalendar availability={data.User?.availability as any} />
            <Separator
              orientation="vertical"
              className="h-full w-[1px] hidden md:block"
            />
            <Separator
              orientation="horizontal"
              className="w-full h-[1px] md:hidden"
            />
            <TimeTable
              selectedDate={selectedDate}
              username={params.username}
              duration={data.duration}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
