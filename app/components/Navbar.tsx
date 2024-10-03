import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export const Navbar = () => {
  return (
    <header className="flex py-5 items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/image.png"
          alt="logo"
          className="size-10"
          width={40}
          height={40}
        />
        <h4 className="hidden sm:flex text-3xl sm:gap-1 sm:items-center font-semibold ">
          Slot
          <span className="text-blue-500">Sync</span>
        </h4>
      </Link>
      <Button>
        <Link href="/login">Login</Link>
      </Button>
    </header>
  );
};
