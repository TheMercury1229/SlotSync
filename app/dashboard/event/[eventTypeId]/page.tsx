import { EditEventTypeForm } from "@/app/components/EditEventTypeForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

type VideoCallPlatform = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

async function getData(eventId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      videoCallSoftware: true,
      url: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
export default async function EditEventPage({
  params,
}: {
  params: { eventTypeId: string };
}) {
  const { eventTypeId } = params;
  const data = await getData(eventTypeId);
  return (
    <div>
      <EditEventTypeForm
        platform={data?.videoCallSoftware as VideoCallPlatform}
        description={data?.description}
        duration={data?.duration}
        title={data?.title}
        url={data?.url as string}
        id={eventTypeId}
      />
    </div>
  );
}
