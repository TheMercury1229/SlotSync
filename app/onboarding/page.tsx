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
import { useFormState } from "react-dom"; // Correct import
import { OnBoardingAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onBoardingSchema } from "../lib/zodSchemas";
import { TriangleAlert } from "lucide-react";
import { SubmitButton } from "../components/SubmitButtons";

export default function OnboardingPage() {
  const [lastResult, action] = useFormState(OnBoardingAction, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onBoardingSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to Slot<span className="text-primary inline">Sync</span>
          </CardTitle>
          <CardDescription>
            We need the following information to set up your account
          </CardDescription>
        </CardHeader>

        {/* Removed `action={action}` */}
        <form id={form.id} action={action}>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="John Doe"
                type="text"
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue || ""}
                key={fields.fullName.key}
              />
              {fields.fullName.errors && (
                <p className="text-red-500 text-sm flex items-center gap-1 p-2 rounded-md bg-red-500/10">
                  <TriangleAlert className="h-4 w-4" />
                  <span>{fields.fullName.errors}</span>
                </p>
              )}
            </div>
            <div className="grid gap-y-2">
              <Label>Username</Label>
              <div className="flex rounded-md">
                <span className="inline-flex px-3 items-center rounded-l-md border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  SlotSync.com/
                </span>
                <Input
                  type="text"
                  placeholder="johndoe"
                  className="rounded-l-none"
                  name={fields.username.name}
                  defaultValue={fields.username.initialValue || ""}
                  key={fields.username.key}
                />
              </div>
              {fields.username.errors && (
                <p className="text-red-500 text-sm flex items-center gap-1 p-2 rounded-md bg-red-500/10">
                  <TriangleAlert className="h-4 w-4" />
                  <span>{fields.username.errors}</span>
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            {/* Ensure the button is inside the form and submits the form */}
            <SubmitButton
              text="Continue"
              variant="default"
              className="w-full"
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
