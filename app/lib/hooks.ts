import { redirect } from "next/navigation";
import { auth } from "./auth";

export const useRequireUser = async () => {
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }
  return session;
};
