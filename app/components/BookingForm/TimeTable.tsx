import { calculateAvailableTimeSlots } from "@/app/lib/calculateAvailableTimeSlots";
import prisma from "@/app/lib/db";
import { nylas } from "@/app/lib/nylas";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(userName: string, selectedDate: Date) {
  const currentDay = format(selectedDate, "EEEE"); // Get the current day of the week
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);
  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Prisma.EnumDayFilter,
      User: {
        username: userName,
      },
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
      User: {
        select: {
          grantEmail: true,
          grantId: true,
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.User?.grantId as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data?.User?.grantEmail as string],
    },
  });

  return { data, nylasCalendarData };
}
interface TimeTableProps {
  selectedDate: Date;
  username: string;
  duration: number;
}

export default async function TimeTable({
  selectedDate,
  username,
  duration,
}: TimeTableProps) {
  const { data, nylasCalendarData } = await getData(username, selectedDate);
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const dbAvailablity = {
    fromTime: data?.fromTime,
    tillTime: data?.tillTime,
  };
  const availableSlots = calculateAvailableTimeSlots(
    formattedDate,
    dbAvailablity,
    nylasCalendarData,
    duration
  );

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}{" "}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM d")}
        </span>
      </p>
      <div className="mt-3 max-h-[350px] overflow-y-auto">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <Link
              href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}
              key={index}
            >
              <Button className="w-full mb-2" variant={"outline"} type="button">
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <p>No AvailableTimeSlote</p>
        )}
      </div>
    </div>
  );
}
