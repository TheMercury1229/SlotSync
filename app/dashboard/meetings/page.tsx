import { DeleteEventAction } from "@/app/actions";
import { EmptyState } from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { useRequireUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });
  if (!userData) {
    throw new Error("User not found");
  }
  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });
  return data;
}

export default async function MeetingsPage() {
  const session = await useRequireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.data?.length < 1 ? (
        <EmptyState
          title="No Meetings Found"
          description="You dont have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See the upcoming events which where booked with you and see the
              event type link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data?.map((event) => (
              <form action={DeleteEventAction} key={event.id}>
                <input type="hidden" name="eventId" value={event.id} />
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3 justify-between items-center p-2 bg-primary/10 rounded-md">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {/* @ts-ignore */}
                      {format(
                        fromUnixTime(event?.when.startTime),
                        "EEE, dd MMM"
                      )}
                    </p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {/* @ts-ignore */}
                      {format(
                        fromUnixTime(event?.when.startTime),
                        "hh:mm a"
                      )} - {/* @ts-ignore */}
                      {format(fromUnixTime(event?.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-primary" />
                      <a
                        target="_blank"
                        // @ts-ignore
                        href={event.conferencing?.details?.url}
                        className="text-xs text-primary underline-offset-4 underline"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-lg font-medium">{event.title}</h2>
                    <p className="text-muted-foreground text-sm">
                      You and{" "}
                      <span className="text-primary">
                        {event.participants[0].name}
                      </span>
                    </p>
                  </div>

                  <SubmitButton
                    text="Cancel Event"
                    variant={"secondary"}
                    className="md:w-fit w-full ml-auto"
                  />
                </div>
                <Separator className="my-4" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
