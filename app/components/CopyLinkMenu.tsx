"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

export const CopyLinkMenu = ({ meetingUrl }: { meetingUrl: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.log("Error in the copy function", error);
      toast.error("Error in the copying the url");
    }
  };
  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="size-4 mr-2" />
      Copy{" "}
    </DropdownMenuItem>
  );
};
