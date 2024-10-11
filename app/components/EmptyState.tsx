import { Button } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description?: string;
  buttonText: string;
  href: string;
}

export const EmptyState = ({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center h-full rounded-md border-dashed border p-8 text-center animate-in fade-in-50">
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        <Ban className="w-10 h-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground mb-8 mt-1 max-w-xs mx-auto">
          {description}
        </p>
      )}
      <Button asChild>
        <Link href={href}>
          <div className="flex items-center justify-center">
            <PlusCircle className="w-4 h-4 mr-2" />
            {buttonText}
          </div>
        </Link>
      </Button>
    </div>
  );
};
