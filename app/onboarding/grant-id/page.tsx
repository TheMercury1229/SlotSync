import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VideoGif from "@/public/work-is-almost-over-happy.gif";
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function OnBoardingRouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>You are almost Done!</CardTitle>
          <CardDescription>
            We have now connect your calendar to yout account.
          </CardDescription>
          <Image
            src={VideoGif}
            alt="Almost finished gif"
            className="w-full rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href={"/api/auth"}>
              <CalendarCheck2 className="mr-2" />
              <span>Connect Calendar to your Account</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
