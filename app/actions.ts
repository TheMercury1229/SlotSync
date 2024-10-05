"use server";

import { parseWithZod } from "@conform-to/zod";
import prisma from "./lib/db";
import { useRequireUser } from "./lib/hooks";
import { onBoardingSchemaValidation } from "./lib/zodSchemas";
import { redirect } from "next/navigation";

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
    },
  });

  // Return the success response or other actions
  return redirect("/onboarding/grant-id");
}
