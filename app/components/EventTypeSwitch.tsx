"use client";
import { Switch } from "@/components/ui/switch";
import { useFormState } from "react-dom";
import { EditEventTypeStatusAction } from "../actions";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";

interface EventTypeSwitchProps {
  initialCheck: boolean;
  eventTypeId: string;
}
export const EventTypeSwitch = ({
  initialCheck,
  eventTypeId,
}: EventTypeSwitchProps) => {
  const [isPending, startTransition] = useTransition();
  const [state, action] = useFormState(EditEventTypeStatusAction, undefined);
  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message);
    } else if (state?.status === "error") {
      toast.error(state?.message);
    }
  }, [state]);
  return (
    <Switch
      disabled={isPending}
      onCheckedChange={(isChecked) =>
        startTransition(() => {
          action({ eventTypeId: eventTypeId as string, isChecked: isChecked }); // Fixed here
        })
      }
      defaultChecked={initialCheck}
    />
  );
};
