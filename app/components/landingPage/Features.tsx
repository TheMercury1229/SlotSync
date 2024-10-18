import { Bolt, CloudRain, Lock, Check } from "lucide-react";

const features = [
  {
    name: "Sign up for free",
    description:
      "Sign up for free and start scheduling meetings in minutes. No credit card required.",
    icon: CloudRain,
  },
  {
    name: "Blazing Fast",
    description:
      "Our platform is designed to be blazingly fast. We use the latest technology to ensure that your meetings are scheduled in minutes.",
    icon: Bolt,
  },
  {
    name: "Easy to use",
    description:
      "Our platform is designed to be easy to use. We use the latest technology to ensure that your meetings are scheduled in minutes.",
    icon: Check,
  },
  {
    name: "Super secure with Nylas",
    description:
      "We use Nylas to ensure that your meetings are super secure. We do not store any of your data.",
    icon: Lock,
  },
];
export const Features = () => {
  return (
    <div className="py-20">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold text-primary leading-7">Schedule Faster</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
          Schedule meetings in minutes!
        </h2>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With SlotSync you can schedule meetings in minutes. We make it easy
          for you schedule meetings in minutes.The meetings are very fast and
          easy to schedule.
        </p>
      </div>
      <div className="mx-auto max-w-2xl mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="max-w-xl  grid grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
