import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";

export const GET = async () => {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientId,
    redirectUri: nylasConfig.redirectUri,
  });

  return redirect(authUrl);
};
