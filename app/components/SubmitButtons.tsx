"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";

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
