import { redirect } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { auth } from "./lib/auth";
import { Hero } from "./components/landingPage/Hero";
import { Features } from "./components/landingPage/Features";
import { Testimonial } from "./components/landingPage/Testimonial";
import { CTA } from "./components/landingPage/CTA";
import { Footer } from "./components/landingPage/Footer";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Features />
      <Testimonial />
      <CTA />
      <Footer />
    </main>
  );
}
