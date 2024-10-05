import { SettingsForm } from "@/app/components/SettingsForm";
import prisma from "@/app/lib/db";
import { useRequireUser } from "@/app/lib/hooks";
import { notFound } from "next/navigation";

const getData = async (id: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
};
export default async function SettingsPage() {
  const session = await useRequireUser();
  const data = await getData(session.user?.id as string);

  return (
    <SettingsForm
      email={data?.email}
      fullName={data?.name as string}
      profilePic={data?.image as string}
    />
  );
}
