"use client";

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
import { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { SettingsAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { SettingsSchema } from "../lib/zodSchemas";
import { TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";

interface iAppProps {
  fullName: string;
  email: string;
  profilePic: string;
}
export const SettingsForm = ({ fullName, email, profilePic }: iAppProps) => {
  const [lastResult, action] = useFormState(SettingsAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SettingsSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [currentProfilePic, setCurrentProfilePic] = useState(profilePic);
  const handleDeleteProfilePic = () => {
    setCurrentProfilePic("");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <form id={form.id} action={action} onSubmit={form.onSubmit}>
        <CardContent className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-1.5">
            <Label>Full Name</Label>
            <Input
              type="text"
              name={fields.fullName.name}
              key={fields.fullName.key}
              placeholder="John Doe"
              defaultValue={fullName}
            />
            {fields.fullName.errors && (
              <p className="text-red-500 text-sm flex items-center gap-1 p-2 rounded-md bg-red-500/10">
                <TriangleAlert className="h-4 w-4" />
                <span>{fields.fullName.errors}</span>
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Label>Email</Label>
            <Input
              type="email"
              disabled
              placeholder="john.doe@me.com"
              defaultValue={email}
            />
          </div>
          <div className="grid gap-y-5">
            <Label>Profile Picture</Label>
            <input
              type="hidden"
              name={fields.profilePic.name}
              key={fields.profilePic.key}
              value={currentProfilePic}
            />
            {currentProfilePic ? (
              <div className="relative size-20">
                <img
                  src={currentProfilePic}
                  alt="profile picture"
                  className="w-20 h-20 rounded-full"
                />
                <Button
                  type="button"
                  onClick={handleDeleteProfilePic}
                  className="absolute -top-3 -right-3 rounded-full"
                  variant={"destructive"}
                  size={"icon"}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfilePic(res[0].url);
                  toast.success("Profile picture uploaded successfully");
                }}
                onUploadError={(error) => {
                  console.log("error");
                  toast.error("Profile picture upload failed");
                }}
                endpoint="imageUploader"
              />
            )}
            {fields.profilePic.errors && (
              <p className="text-red-500 text-sm flex items-center gap-1 p-2 rounded-md bg-red-500/10">
                <TriangleAlert className="h-4 w-4" />
                <span>{fields.profilePic.errors}</span>
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
};
