"use server";

import { parseWithZod } from "@conform-to/zod";
import prisma from "./lib/db";
import { useRequireUser } from "./lib/hooks";
import {
  eventTypeSchema,
  onBoardingSchemaValidation,
  SettingsSchema,
} from "./lib/zodSchemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { nylas } from "./lib/nylas";

export async function OnBoardingAction(prevState: any, formData: FormData) {
  // Getting the user from the session
  const session = await useRequireUser();

  // Extracting the username from formData

  const submission = await parseWithZod(formData, {
    schema: onBoardingSchemaValidation({
      async isUsernameUnique() {
        const exisitngSubDirectory = await prisma.user.findUnique({
          where: {
            username: formData.get("username") as string,
          },
        });
        return !exisitngSubDirectory;
      },
    }),

    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  // If validation is successful, update the user
  const data = await prisma.user.update({
    where: { id: session.user?.id },
    data: {
      username: submission.value.username,
      name: submission.value.fullName,
      availability: {
        createMany: {
          data: [
            {
              day: "Monday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Tuesday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Wednesday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Thursday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Friday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Saturday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Sunday",
              fromTime: "08:00",
              tillTime: "18:00",
            },
          ],
        },
      },
    },
  });

  // Return the success response or other actions
  return redirect("/onboarding/grant-id");
}

export async function SettingsAction(prevState: any, formData: FormData) {
  const session = await useRequireUser();
  const submission = await parseWithZod(formData, {
    schema: SettingsSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const data = await prisma.user.update({
    where: { id: session.user?.id },
    data: {
      name: submission.value.fullName,
      image: submission.value.profilePic,
    },
  });
  return redirect("/dashboard");
}

export async function AvailabilityAction(formData: FormData) {
  const session = await useRequireUser();
  if (!session.user) {
    return redirect("/login");
  }
  const rawData = Object.fromEntries(formData.entries());
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");
      return {
        id: id,
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
        isActive: rawData[`isActive-${id}`] === "on",
      };
    });
  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );

    revalidatePath("/dashboard/availability");
  } catch (error) {
    console.log("Error in availability action");
    console.log(error);
  }
}

export async function CreateEventTypeAction(
  prevState: any,
  formData: FormData
) {
  const session = await useRequireUser();
  if (!session.user) {
    return redirect("/login");
  }
  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.eventType.create({
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallSoftware,
      userId: session.user?.id,
    },
  });
  return redirect("/dashboard");
}

export async function CreateMeetingAction(formData: FormData) {
  const getUserData = await prisma.user.findUnique({
    where: {
      username: formData.get("username") as string,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!getUserData) {
    throw new Error("User not found");
  }

  const eventTypeData = await prisma.eventType.findUnique({
    where: {
      id: formData.get("eventTypeId") as string,
    },
    select: {
      title: true,
      description: true,
    },
  });
  const provider = formData.get("provider") as string;
  const fromTime = formData.get("fromTime") as string;
  const eventDate = formData.get("eventDate") as string;
  const startDateTime = new Date(`${eventDate}T${fromTime}:00`);
  const meetLen = Number(formData.get("meetLen"));
  const endDateTime = new Date(startDateTime.getTime() + meetLen * 60 * 1000);
  await nylas.events.create({
    identifier: getUserData.grantId as string,
    requestBody: {
      // Creating a event in the calendar of the user
      title: eventTypeData?.title as string,
      description: eventTypeData?.description as string,
      when: {
        startTime: Math.floor(startDateTime.getTime() / 1000),
        endTime: Math.floor(endDateTime.getTime() / 1000),
      },
      conferencing: {
        autocreate: {},
        provider: provider as any,
      },
      participants: [
        {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: getUserData.grantEmail as string,
      notifyParticipants: true,
    },
  });
  return redirect("/success");
}

export async function DeleteEventAction(formData: FormData) {
  const session = await useRequireUser();
  if (!session.user) {
    return redirect("/login");
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }
  const data = await nylas.events.destroy({
    eventId: formData.get("eventId") as string,
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });
  redirect("/dashboard/meetings");
}

export async function EditEventTypeAction(prevState: any, formData: FormData) {
  const session = await useRequireUser();
  if (!session.user) {
    return redirect("/login");
  }
  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.eventType.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      title: submission.value.title,
      description: submission.value.description,
      duration: submission.value.duration,
      url: submission.value.url,
      videoCallSoftware: submission.value.videoCallSoftware,
    },
  });
  redirect("/dashboard");
}
