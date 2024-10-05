import prisma from "@/app/lib/db";
import { useRequireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await useRequireUser();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return Response.json("Hey we did not get a code from nylas", {
      status: 400,
    });
  }
  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      redirectUri: nylasConfig.redirectUri,
      code,
    });

    const { grantId, email } = response;
    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        grantId: grantId,
        grantEmail: email,
      },
    });
  } catch (error) {
    console.log("Error exchanging code for token", error);
  }
  redirect("/dashboard");
};
