import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/image.png"
        alt="logo"
        className="size-8"
        width={40}
        height={40}
      />
      <h4 className="hidden sm:flex text-3xl sm:gap-1 sm:items-center font-semibold">
        Slot
        <span className="text-primary">Sync</span>
      </h4>
    </Link>
  );
};
