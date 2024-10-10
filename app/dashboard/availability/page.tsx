import { AvailabilityAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { useRequireUser } from "@/app/lib/hooks";
import { times } from "@/app/lib/times";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";

const getData = async (id: string) => {
  const data = await prisma.availability.findMany({
    where: {
      userId: id,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
};
export default async function AvailabilityPage() {
  const session = await useRequireUser();
  const data = await getData(session.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          In this page you can manage your availability!
        </CardDescription>
      </CardHeader>
      <form action={AvailabilityAction}>
        <CardContent className="flex flex-col gap-4">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
              >
                <input type="hidden" name={`id-${item.id}`} value={item.id} />
                <div className="flex items-center gap-x-3">
                  <Switch
                    name={`isActive-${item.id}`}
                    defaultChecked={item.isActive}
                  />
                  <p>{item.day}</p>
                </div>
                <Select
                  name={`fromTime-${item.id}`}
                  defaultValue={item.fromTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="From time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => {
                        return (
                          <SelectItem key={time.id} value={time.time}>
                            {time.time}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  name={`tillTime-${item.id}`}
                  defaultValue={item.tillTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Till time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {times.map((time) => {
                        return (
                          <SelectItem key={time.id} value={time.time}>
                            {time.time}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
