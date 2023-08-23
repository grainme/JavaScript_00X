import { LockIcon, Server, UploadCloud } from "lucide-react";
import kai from "../assets/screenshot_PomodorKai.png";

const features = [
  {
    name: "Kanban Board",
    description:
      "Stay organized with our intuitive Kanban board style. Easily visualize your workflow and track your progress.",
    icon: UploadCloud,
  },
  {
    name: "Pomodoro Timer",
    description:
      "Boost your focus and productivity using the Pomodoro technique. Manage your time effectively for maximum efficiency.",
    icon: LockIcon,
  },
  {
    name: "Real-time Messaging",
    description:
      "Collaborate seamlessly with your team through real-time messaging. Communicate and coordinate effortlessly.",
    icon: Server,
  },
];

export default function FeatureSection() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32 font-Raleway">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base leading-7 text-gray-600">Work Faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                A better workflow
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                PomodoroKai ポモドロ会 is a web application designed to embrace
                the Kanban methodology, providing users with a comprehensive
                platform for efficient task creation, organization, and
                management.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src={kai}
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
