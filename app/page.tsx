import { redirect } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { auth } from "./lib/auth";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
    </main>
  );
}
