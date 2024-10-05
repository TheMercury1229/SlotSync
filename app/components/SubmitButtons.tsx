"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "secondary"
    | "destructive"
    | null
    | undefined;
  className?: string;
}
export const GoogleAuthButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className="w-full flex items-center justify-center gap-2"
          variant={"outline"}
        >
          <Loader2 className="animate-spin size-4 mr-2" />
          Please Wait
        </Button>
      ) : (
        <Button
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
        >
          <Image src="/google.svg" alt="Google Icon" width={20} height={20} />
          Sign In with Google
        </Button>
      )}
    </>
  );
};

export const GithubAuthButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
        >
          <Loader2 className="animate-spin size-4 mr-2" />
          Please Wait
        </Button>
      ) : (
        <Button
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
        >
          <Image src="/github.svg" alt="Github Icon" width={20} height={20} />
          Sign In with Github
        </Button>
      )}
    </>
  );
};

export const SubmitButton = ({ text, variant, className }: iAppProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={"outline"} className={cn("w-fit", className)}>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant}
          className={cn("w-fit", className)}
        >
          {text}
        </Button>
      )}
    </>
  );
};
