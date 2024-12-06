"use client";
import { CreateEventTypeAction, EditEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { eventTypeSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/buttongroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
type VideoCallPlatform = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";
interface EditEventTypeFormProps {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: VideoCallPlatform;
  duration: number;
}
export const EditEventTypeForm = ({
  id,
  title,
  description,
  url,
  platform,
  duration,
}: EditEventTypeFormProps) => {
  const [activePlatform, setActivePlatform] = useState<VideoCallPlatform>(
    platform as VideoCallPlatform
  );
  const [lastResult, action] = useFormState(EditEventTypeAction, null);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventTypeSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Edit appointment type</CardTitle>
          <CardDescription>
            Edit appointment type to start accepting appointments from people.
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <input
            type="hidden"
            name="id"
            value={id}
            readOnly={true}
            aria-hidden="true"
          />
          <CardContent className="grid gap-y-5">
            <div className="gap-y-2 flex flex-col">
              <Label>Title</Label>
              <Input
                placeholder="30 Minute Meeting"
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={title}
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>
            <div className="gap-y-2 flex flex-col">
              <Label>URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center justify-center px-3 rounded-l-md text-sm font-medium text-muted-foreground bg-muted border border-r-0">
                  SlotSync.com/
                </span>
                <Input
                  placeholder="example-url-slug"
                  className="border-l-0 rounded-l-none"
                  name={fields.url.name}
                  key={fields.url.key}
                  defaultValue={url}
                />
              </div>
              <p className="text-red-500 text-sm">{fields.url.errors}</p>
            </div>
            <div className="gap-y-2 flex flex-col">
              <Label>Description</Label>
              <Textarea
                placeholder="Short description of the appointment type"
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={description}
              />
              <p className="text-red-500 text-sm">
                {fields.description.errors}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={duration.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.duration.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                key={fields.videoCallSoftware.key}
                defaultValue={platform}
                value={activePlatform}
              />
              {/* <Button
                  type="button"
                  onClick={() => setActivePlatform("Zoom Meeting")}
                  className="w-full"
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                  }
                >
                  Zoom
                </Button> */}
              <Button
                type="button"
                onClick={() => setActivePlatform("Google Meet")}
                className="w-full"
                variant={
                  activePlatform === "Google Meet" ? "secondary" : "outline"
                }
              >
                Google Meet
              </Button>
              {/* <Button
                  type="button"
                  onClick={() => setActivePlatform("Microsoft Teams")}
                  className="w-full"
                  variant={
                    activePlatform === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }
                >
                  Microsoft Teams
                </Button> */}
              <p className="text-red-500 text-sm">
                {fields.videoCallSoftware.errors}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button variant="outline" type="button">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <SubmitButton text="Create Event Type" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
