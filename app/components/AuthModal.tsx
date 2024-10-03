import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { signIn } from "../lib/auth";
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButtons";

export default function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try For Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex flex-row items-center justify-center gap-2">
          <Image
            src="/image.png"
            alt="logo"
            className="size-10"
            width={40}
            height={40}
          />
          <h4 className="text-3xl font-semibold">
            Slot <span className="text-blue-500">Sync</span>
          </h4>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-4">
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <GoogleAuthButton />
          </form>

          <div className="flex items-center justify-center">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="px-4 text-black/40 text-center uppercase text-lg">
              Or
            </span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>

          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <GithubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
