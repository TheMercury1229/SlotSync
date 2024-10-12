import { RenderCalendar } from "@/app/components/BookingForm/RenderCalendar";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
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
  searchParams: { date?: string };
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
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-5xl mx-auto w-full">
        <CardContent className="p-5 grid gap-5  md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="">
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
        </CardContent>
      </Card>
    </div>
  );
}
