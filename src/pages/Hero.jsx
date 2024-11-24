import {
  FingerPrintIcon,
  MagnifyingGlassIcon,
  StarIcon,
  HandThumbUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Search Nearby Fields",
    description:
      "Find football fields near your location with advanced search filters.",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Rate Football Fields",
    description:
      "Share your experience and help others choose the best fields.",
    icon: StarIcon,
  },
  {
    name: "Follow Favorites",
    description:
      "Stay updated with schedules and events of your favorite fields.",
    icon: HandThumbUpIcon,
  },
  {
    name: "Score Big with Exclusive Offers!",
    description:
      "Enjoy your football experience while saving money with exclusive field discounts!",
    icon: CurrencyDollarIcon,
  },
];

export default function Hero() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
            Your Gateway to the Best Football Fields
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Whether you're looking for nearby fields, exclusive deals, or a way
            to rate and follow your favorites, Sa’a Khomasy is your all-in-one
            solution for a better football experience.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
