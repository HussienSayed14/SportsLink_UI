import {
  MagnifyingGlassIcon,
  StarIcon,
  HandThumbUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const features = [
  {
    nameKey: "function1Title",
    descriptionKey: "function1Description",
    icon: MagnifyingGlassIcon,
  },
  {
    nameKey: "function2Title",
    descriptionKey: "function2Description",
    icon: StarIcon,
  },
  {
    nameKey: "function3Title",
    descriptionKey: "function3Description",
    icon: HandThumbUpIcon,
  },
  {
    nameKey: "function4Title",
    descriptionKey: "function4Description",
    icon: CurrencyDollarIcon,
  },
];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { isAuthenticated } = useUser(); // Access the user context

  // If user is authenticated, navigate him to the dashboard page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
              {t("heroTitle")}
            </p>
            <p className="mt-6 text-lg/8 text-gray-600">{t("heroBody")}</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-emerald-600">
                      <feature.icon
                        aria-hidden="true"
                        className="size-6 text-white"
                      />
                    </div>
                    {t(feature.nameKey)}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">
                    {t(feature.descriptionKey)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
